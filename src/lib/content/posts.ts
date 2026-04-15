import { getContentSource } from "./source";
import {
  getPostFromFiles,
  listPostSlugsFromFiles,
  listPostsFromFiles,
} from "./adapters/files";
import {
  getPostFromSupabase,
  listPostSlugsFromSupabase,
  listPostsFromSupabase,
} from "./adapters/supabase";
import {
  getPostFromSanity,
  listPostSlugsFromSanity,
  listPostsFromSanity,
} from "./adapters/sanity";
import type { BlogPost } from "./contract";

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  switch (getContentSource()) {
    case "files":
      return getPostFromFiles(slug);
    case "supabase":
      return getPostFromSupabase(slug);
    case "sanity":
      return getPostFromSanity(slug);
    default:
      return getPostFromFiles(slug);
  }
}

export async function listPosts(): Promise<BlogPost[]> {
  switch (getContentSource()) {
    case "files":
      return listPostsFromFiles();
    case "supabase":
      return listPostsFromSupabase();
    case "sanity":
      return listPostsFromSanity();
    default:
      return listPostsFromFiles();
  }
}

export async function listPostSlugs(): Promise<string[]> {
  switch (getContentSource()) {
    case "files":
      return listPostSlugsFromFiles();
    case "supabase":
      return listPostSlugsFromSupabase();
    case "sanity":
      return listPostSlugsFromSanity();
    default:
      return listPostSlugsFromFiles();
  }
}
