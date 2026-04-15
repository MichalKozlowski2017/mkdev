import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  blogFrontmatterSchema,
  blogPostSchema,
  mobileAppFrontmatterSchema,
  mobileAppSchema,
  pageFrontmatterSchema,
  pageSchema,
  type BlogPost,
  type MobileApp,
  type Page,
} from "../contract";

const PAGES_DIR = path.join(process.cwd(), "content", "pages");
const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const APPS_DIR = path.join(process.cwd(), "content", "apps");
const APP_SCREEN_EXT = /\.(png|jpe?g|webp)$/i;

async function readMdxFile(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  return matter(raw);
}

function buildBlocksFromPageFrontmatter(
  fm: ReturnType<typeof pageFrontmatterSchema.parse>,
  body: string,
) {
  const blocks: Page["blocks"] = [];
  if (fm.heroHeadline) {
    blocks.push({
      type: "hero",
      headline: fm.heroHeadline,
      subheadline: fm.heroSubheadline,
    });
  }
  blocks.push({ type: "prose", body });
  return blocks;
}

export async function listPageSlugsFromFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(PAGES_DIR);
    return entries
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => f.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}

export async function getPageFromFiles(slug: string): Promise<Page | null> {
  const base = path.join(PAGES_DIR, slug);
  let filePath = `${base}.mdx`;
  try {
    await fs.access(filePath);
  } catch {
    filePath = `${base}.md`;
    try {
      await fs.access(filePath);
    } catch {
      return null;
    }
  }

  const { data, content } = await readMdxFile(filePath);
  const fm = pageFrontmatterSchema.safeParse(data);
  if (!fm.success) return null;
  if (fm.data.slug !== slug) return null;

  const parsed = pageSchema.safeParse({
    slug: fm.data.slug,
    title: fm.data.title,
    description: fm.data.description,
    publishedAt: fm.data.publishedAt,
    blocks: buildBlocksFromPageFrontmatter(fm.data, content.trim()),
  });
  return parsed.success ? parsed.data : null;
}

export async function listPostSlugsFromFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(POSTS_DIR);
    return entries
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => f.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}

export async function getPostFromFiles(slug: string): Promise<BlogPost | null> {
  const base = path.join(POSTS_DIR, slug);
  let filePath = `${base}.mdx`;
  try {
    await fs.access(filePath);
  } catch {
    filePath = `${base}.md`;
    try {
      await fs.access(filePath);
    } catch {
      return null;
    }
  }

  const { data, content } = await readMdxFile(filePath);
  const fm = blogFrontmatterSchema.safeParse(data);
  if (!fm.success) return null;
  if (fm.data.slug !== slug) return null;

  const parsed = blogPostSchema.safeParse({
    slug: fm.data.slug,
    title: fm.data.title,
    excerpt: fm.data.excerpt,
    publishedAt: fm.data.publishedAt,
    bodyMdx: content.trim(),
  });
  return parsed.success ? parsed.data : null;
}

export async function listPostsFromFiles(): Promise<BlogPost[]> {
  const slugs = await listPostSlugsFromFiles();
  const posts: BlogPost[] = [];
  for (const slug of slugs) {
    const post = await getPostFromFiles(slug);
    if (post) posts.push(post);
  }
  return posts.sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export async function listAppSlugsFromFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(APPS_DIR, { withFileTypes: true });
    const slugs: string[] = [];
    for (const entry of entries) {
      if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".md"))) {
        slugs.push(entry.name.replace(/\.mdx?$/, ""));
        continue;
      }
      if (!entry.isDirectory()) continue;
      const dir = path.join(APPS_DIR, entry.name);
      const candidates = ["app.mdx", "app.md", "index.mdx", "index.md"];
      for (const fileName of candidates) {
        try {
          await fs.access(path.join(dir, fileName));
          slugs.push(entry.name);
          break;
        } catch {
          // ignore missing candidate
        }
      }
    }
    return slugs;
  } catch {
    return [];
  }
}

async function resolveAppFilePath(slug: string): Promise<string | null> {
  const rootBase = path.join(APPS_DIR, slug);
  const rootCandidates = [`${rootBase}.mdx`, `${rootBase}.md`];
  for (const candidate of rootCandidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next path
    }
  }

  const dir = path.join(APPS_DIR, slug);
  const dirCandidates = ["app.mdx", "app.md", "index.mdx", "index.md"];
  for (const fileName of dirCandidates) {
    const candidate = path.join(dir, fileName);
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next path
    }
  }
  return null;
}

async function collectAppMedia(slug: string) {
  const dir = path.join(APPS_DIR, slug);
  const media = { iconSrc: undefined as string | undefined, galleryImages: [] as string[] };
  try {
    await fs.access(dir);
  } catch {
    return media;
  }

  const iconCandidates = ["icon/512.png", "icon.png", "icon/1024.png"];
  for (const relPath of iconCandidates) {
    try {
      await fs.access(path.join(dir, relPath));
      media.iconSrc = `/app-assets/${slug}/${relPath}`;
      break;
    } catch {
      // try next icon candidate
    }
  }

  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    media.galleryImages = files
      .filter((entry) => entry.isFile() && APP_SCREEN_EXT.test(entry.name))
      .map((entry) => `/app-assets/${slug}/${entry.name}`)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    media.galleryImages = [];
  }

  return media;
}

export async function getAppFromFiles(slug: string): Promise<MobileApp | null> {
  const filePath = await resolveAppFilePath(slug);
  if (!filePath) return null;

  const { data, content } = await readMdxFile(filePath);
  const fm = mobileAppFrontmatterSchema.safeParse(data);
  if (!fm.success) return null;
  if (fm.data.slug !== slug) return null;
  const media = await collectAppMedia(slug);

  const parsed = mobileAppSchema.safeParse({
    ...fm.data,
    bodyMdx: content.trim(),
    iconSrc: media.iconSrc,
    galleryImages: media.galleryImages,
  });
  return parsed.success ? parsed.data : null;
}

export async function listAppsFromFiles(): Promise<MobileApp[]> {
  const slugs = await listAppSlugsFromFiles();
  const apps: MobileApp[] = [];
  for (const s of slugs) {
    const app = await getAppFromFiles(s);
    if (app) apps.push(app);
  }
  return apps.sort((a, b) => {
    const ao = a.sortOrder ?? 9999;
    const bo = b.sortOrder ?? 9999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
}
