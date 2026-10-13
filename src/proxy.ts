import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  STUDIO_SESSION_COOKIE,
  isValidStudioSessionToken,
} from "@/lib/studio/auth";

/**
 * Ochrona /studio i /api/studio/* gdy STUDIO_PASSWORD jest ustawione.
 * Login i endpoint auth są wyłączone z bramki.
 */
export function proxy(request: NextRequest) {
  const password = process.env.STUDIO_PASSWORD?.trim();
  if (!password) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const isStudioPage = pathname === "/studio" || pathname.startsWith("/studio/");
  const isStudioApi =
    pathname === "/api/studio" || pathname.startsWith("/api/studio/");

  if (!isStudioPage && !isStudioApi) {
    return NextResponse.next();
  }

  if (
    pathname === "/studio/login" ||
    pathname === "/api/studio/auth/login" ||
    pathname === "/api/studio/auth/logout"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(STUDIO_SESSION_COOKIE)?.value;
  if (isValidStudioSessionToken(token)) {
    return NextResponse.next();
  }

  if (isStudioApi) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const login = new URL("/studio/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/studio", "/studio/:path*", "/api/studio", "/api/studio/:path*"],
};
