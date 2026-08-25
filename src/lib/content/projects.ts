import { getContentSource } from "./source";
import {
  getProjectFromFiles,
  listProjectSlugsFromFiles,
  listProjectsFromFiles,
} from "./adapters/files";
import {
  getProjectFromSupabase,
  listProjectSlugsFromSupabase,
  listProjectsFromSupabase,
} from "./adapters/supabase";
import {
  getProjectFromSanity,
  listProjectSlugsFromSanity,
  listProjectsFromSanity,
} from "./adapters/sanity";
import type { Project } from "./contract";

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  switch (getContentSource()) {
    case "files":
      return getProjectFromFiles(slug);
    case "supabase":
      return getProjectFromSupabase(slug);
    case "sanity":
      return getProjectFromSanity(slug);
    default:
      return getProjectFromFiles(slug);
  }
}

export async function listProjects(): Promise<Project[]> {
  switch (getContentSource()) {
    case "files":
      return listProjectsFromFiles();
    case "supabase":
      return listProjectsFromSupabase();
    case "sanity":
      return listProjectsFromSanity();
    default:
      return listProjectsFromFiles();
  }
}

export async function listProjectSlugs(): Promise<string[]> {
  switch (getContentSource()) {
    case "files":
      return listProjectSlugsFromFiles();
    case "supabase":
      return listProjectSlugsFromSupabase();
    case "sanity":
      return listProjectSlugsFromSanity();
    default:
      return listProjectSlugsFromFiles();
  }
}
