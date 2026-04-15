import { createClient, type SanityClient } from "@sanity/client";
import {
  blogPostSchema,
  pageSchema,
  type BlogPost,
  type MobileApp,
  type Page,
} from "../contract";

function getSanity(): SanityClient {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET ?? "production";
  const apiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01";
  if (!projectId) {
    throw new Error("Sanity: ustaw SANITY_PROJECT_ID (i opcjonalnie SANITY_DATASET).");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.SANITY_USE_CDN !== "false",
  });
}

function mapSanityPage(doc: unknown): Page {
  const d = doc as {
    title?: string;
    slug?: string;
    description?: string;
    publishedAt?: string;
    blocks?: unknown;
  };
  return pageSchema.parse({
    slug: d.slug,
    title: d.title,
    description: d.description,
    publishedAt: d.publishedAt,
    blocks: d.blocks ?? [],
  });
}

function mapSanityPost(doc: unknown): BlogPost {
  const d = doc as {
    title?: string;
    slug?: string;
    excerpt?: string;
    publishedAt?: string;
    bodyMdx?: string;
  };
  return blogPostSchema.parse({
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    publishedAt: d.publishedAt ?? "",
    bodyMdx: d.bodyMdx ?? "",
  });
}

const pageBySlugQuery = `*[_type == "starterPage" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  description,
  publishedAt,
  blocks
}`;

const pageSlugsQuery = `*[_type == "starterPage"].slug.current`;

const postBySlugQuery = `*[_type == "starterPost" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  bodyMdx
}`;

const postsQuery = `*[_type == "starterPost"] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  bodyMdx
}`;

export async function getPageFromSanity(slug: string): Promise<Page | null> {
  const client = getSanity();
  const doc = await client.fetch(pageBySlugQuery, { slug });
  if (!doc) return null;
  return mapSanityPage(doc);
}

export async function listPageSlugsFromSanity(): Promise<string[]> {
  const client = getSanity();
  const slugs = await client.fetch<string[]>(pageSlugsQuery);
  return slugs ?? [];
}

export async function getPostFromSanity(slug: string): Promise<BlogPost | null> {
  const client = getSanity();
  const doc = await client.fetch(postBySlugQuery, { slug });
  if (!doc) return null;
  return mapSanityPost(doc);
}

export async function listPostsFromSanity(): Promise<BlogPost[]> {
  const client = getSanity();
  const docs = await client.fetch<unknown[]>(postsQuery);
  return (docs ?? []).map((d) => mapSanityPost(d));
}

export async function listPostSlugsFromSanity(): Promise<string[]> {
  const posts = await listPostsFromSanity();
  return posts.map((p) => p.slug);
}

/** Aplikacje mobilne — dodaj typ dokumentu w Sanity, gdy będzie potrzebny CMS. */
export async function getAppFromSanity(slug: string): Promise<MobileApp | null> {
  void slug;
  return null;
}

export async function listAppsFromSanity(): Promise<MobileApp[]> {
  return [];
}

export async function listAppSlugsFromSanity(): Promise<string[]> {
  return [];
}
