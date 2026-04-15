import fs from "node:fs/promises";
import path from "node:path";

const APPS_DIR = path.join(process.cwd(), "content", "apps");

const MIME_BY_EXT: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function isSafeSegment(segment: string) {
  return segment.length > 0 && !segment.includes("..") && !segment.includes("\\");
}

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string; assetPath: string[] }>;
  },
) {
  const { slug, assetPath } = await params;
  if (!isSafeSegment(slug) || assetPath.some((p) => !isSafeSegment(p))) {
    return new Response("Not found", { status: 404 });
  }

  const appDir = path.join(APPS_DIR, slug);
  const absolutePath = path.join(appDir, ...assetPath);
  const normalizedAppDir = `${path.resolve(appDir)}${path.sep}`;
  const normalizedFilePath = path.resolve(absolutePath);
  if (!normalizedFilePath.startsWith(normalizedAppDir)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const [file, stat] = await Promise.all([
      fs.readFile(normalizedFilePath),
      fs.stat(normalizedFilePath),
    ]);
    if (!stat.isFile()) return new Response("Not found", { status: 404 });

    const ext = path.extname(normalizedFilePath).toLowerCase();
    const contentType = MIME_BY_EXT[ext] ?? "application/octet-stream";
    return new Response(new Uint8Array(file), {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
