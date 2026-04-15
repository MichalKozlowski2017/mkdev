import { createClient } from "@supabase/supabase-js";
import {
  blogPostSchema,
  pageSchema,
  type BlogPost,
  type MobileApp,
  type Page,
} from "../contract";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase: ustaw NEXT_PUBLIC_SUPABASE_URL oraz SUPABASE_SERVICE_ROLE_KEY (zalecane dla builda) lub NEXT_PUBLIC_SUPABASE_ANON_KEY z RLS dla publicznego odczytu.",
    );
  }
  return createClient(url, key);
}

type PageRow = {
  slug: string;
  title: string;
  description: string | null;
  published_at: string | null;
  blocks: unknown;
};

type PostRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string;
  body_mdx: string;
};

export async function getPageFromSupabase(slug: string): Promise<Page | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("cms_pages")
    .select("slug,title,description,published_at,blocks")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as PageRow;
  return pageSchema.parse({
    slug: row.slug,
    title: row.title,
    description: row.description ?? undefined,
    publishedAt: row.published_at ?? undefined,
    blocks: row.blocks,
  });
}

export async function listPageSlugsFromSupabase(): Promise<string[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("cms_pages").select("slug");
  if (error) throw error;
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

export async function getPostFromSupabase(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("cms_posts")
    .select("slug,title,excerpt,published_at,body_mdx")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as PostRow;
  return blogPostSchema.parse({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? undefined,
    publishedAt: row.published_at,
    bodyMdx: row.body_mdx,
  });
}

export async function listPostsFromSupabase(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("cms_posts")
    .select("slug,title,excerpt,published_at,body_mdx")
    .order("published_at", { ascending: false });

  if (error) throw error;
  const rows = (data ?? []) as PostRow[];
  return rows.map((row) =>
    blogPostSchema.parse({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt ?? undefined,
      publishedAt: row.published_at,
      bodyMdx: row.body_mdx,
    }),
  );
}

export async function listPostSlugsFromSupabase(): Promise<string[]> {
  const posts = await listPostsFromSupabase();
  return posts.map((p) => p.slug);
}

/** Aplikacje mobilne — rozszerz schemat i UI, gdy zechcesz trzymać je w bazie. */
export async function getAppFromSupabase(slug: string): Promise<MobileApp | null> {
  void slug;
  return null;
}

export async function listAppsFromSupabase(): Promise<MobileApp[]> {
  return [];
}

export async function listAppSlugsFromSupabase(): Promise<string[]> {
  return [];
}
