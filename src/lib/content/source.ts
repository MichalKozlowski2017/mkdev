export type ContentSource = "files" | "supabase" | "sanity";

export function getContentSource(): ContentSource {
  const raw = process.env.CONTENT_SOURCE?.toLowerCase();
  if (raw === "supabase" || raw === "sanity") return raw;
  return "files";
}
