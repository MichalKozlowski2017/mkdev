"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/studio", label: "Pulpit", exact: true },
  { href: "/studio/generate", label: "Generuj" },
  { href: "/studio/video", label: "Wideo" },
  { href: "/studio/gallery", label: "Galeria" },
  { href: "/studio/models", label: "Modele" },
  { href: "/studio/settings", label: "Ustawienia" },
];

export function StudioNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-wrap items-center gap-1 sm:gap-1.5"
      aria-label="Nawigacja Studio"
    >
      {LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200",
              active
                ? "bg-teal-400/15 text-teal-100"
                : "text-stone-400 hover:bg-white/[0.04] hover:text-stone-100",
            ].join(" ")}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
