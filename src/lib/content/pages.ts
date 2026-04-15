import { getContentSource } from "./source";
import { getPageFromFiles, listPageSlugsFromFiles } from "./adapters/files";
import {
  getPageFromSupabase,
  listPageSlugsFromSupabase,
} from "./adapters/supabase";
import { getPageFromSanity, listPageSlugsFromSanity } from "./adapters/sanity";
import type { Page } from "./contract";

export async function getPageBySlug(slug: string): Promise<Page | null> {
  switch (getContentSource()) {
    case "files":
      return getPageFromFiles(slug);
    case "supabase":
      return getPageFromSupabase(slug);
    case "sanity":
      return getPageFromSanity(slug);
    default:
      return getPageFromFiles(slug);
  }
}

export async function listPageSlugs(): Promise<string[]> {
  switch (getContentSource()) {
    case "files":
      return listPageSlugsFromFiles();
    case "supabase":
      return listPageSlugsFromSupabase();
    case "sanity":
      return listPageSlugsFromSanity();
    default:
      return listPageSlugsFromFiles();
  }
}
