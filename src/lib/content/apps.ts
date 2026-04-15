import { getContentSource } from "./source";
import {
  getAppFromFiles,
  listAppSlugsFromFiles,
  listAppsFromFiles,
} from "./adapters/files";
import {
  getAppFromSupabase,
  listAppSlugsFromSupabase,
  listAppsFromSupabase,
} from "./adapters/supabase";
import {
  getAppFromSanity,
  listAppSlugsFromSanity,
  listAppsFromSanity,
} from "./adapters/sanity";
import type { MobileApp } from "./contract";

export async function getAppBySlug(slug: string): Promise<MobileApp | null> {
  switch (getContentSource()) {
    case "files":
      return getAppFromFiles(slug);
    case "supabase":
      return getAppFromSupabase(slug);
    case "sanity":
      return getAppFromSanity(slug);
    default:
      return getAppFromFiles(slug);
  }
}

export async function listApps(): Promise<MobileApp[]> {
  switch (getContentSource()) {
    case "files":
      return listAppsFromFiles();
    case "supabase":
      return listAppsFromSupabase();
    case "sanity":
      return listAppsFromSanity();
    default:
      return listAppsFromFiles();
  }
}

export async function listAppSlugs(): Promise<string[]> {
  switch (getContentSource()) {
    case "files":
      return listAppSlugsFromFiles();
    case "supabase":
      return listAppSlugsFromSupabase();
    case "sanity":
      return listAppSlugsFromSanity();
    default:
      return listAppSlugsFromFiles();
  }
}
