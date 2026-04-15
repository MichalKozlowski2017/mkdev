import Link from "next/link";
import { siteContentClassName } from "@/lib/site-layout";

function Monogram() {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 shadow-md shadow-violet-600/25 ring-1 ring-white/25 sm:h-10 sm:w-10 dark:shadow-violet-500/20 dark:ring-white/15">
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" aria-hidden />
      <span className="relative text-sm font-bold tracking-tight text-white sm:text-base">m</span>
    </span>
  );
}

const navItemClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 outline-none transition-colors duration-200 hover:bg-zinc-900/[0.05] hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-violet-500/40 dark:text-zinc-300 dark:hover:bg-white/[0.06] dark:hover:text-white dark:focus-visible:ring-violet-400/35";

type SiteHeaderProps = {
  /** `CONTENT_SOURCE` — link Admin tylko przy Supabase. */
  source: string;
};

export function SiteHeader({ source }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full min-w-0 border-b border-zinc-200/50 bg-background py-4 dark:border-zinc-800/50">
      <div
        className={`${siteContentClassName} flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}
      >
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Monogram />
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            mkdev
          </span>
        </Link>

        <nav
          className="flex flex-wrap items-center gap-1 sm:justify-end"
          aria-label="Główna nawigacja"
        >
          <Link href="/about" className={navItemClass}>
            O mnie
          </Link>
          {source === "supabase" ? (
            <Link href="/admin" className={navItemClass}>
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
