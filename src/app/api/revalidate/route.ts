import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const headerSecret = request.headers.get("x-revalidate-secret");
  const url = new URL(request.url);
  const secretParam = url.searchParams.get("secret");

  const provided = headerSecret ?? secretParam;
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const paths: string[] = Array.isArray(body.paths) ? body.paths : ["/", "/blog"];

  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
