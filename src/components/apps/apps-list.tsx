import Link from "next/link";
import Image from "next/image";
import type { MobileApp } from "@/lib/content";

function AppTileIcon({ title, iconSrc }: { title: string; iconSrc?: string }) {
  if (iconSrc) {
    return (
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-200/80 dark:ring-white/10">
        <Image
          src={iconSrc}
          alt={`Ikona ${title}`}
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 ring-1 ring-inset ring-violet-500/10 dark:from-violet-500/25 dark:to-cyan-500/20 dark:ring-white/10">
      <svg
        className="h-6 w-6 text-violet-600 dark:text-violet-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75A2.25 2.25 0 0115.75 18H18a2.25 2.25 0 002.25-2.25V15.75A2.25 2.25 0 0018 13.5h-2.25a2.25 2.25 0 00-2.25 2.25V15.75zM13.5 3.75A2.25 2.25 0 0115.75 6V8.25A2.25 2.25 0 0113.5 10.5H11.25A2.25 2.25 0 019 8.25V6a2.25 2.25 0 012.25-2.25H13.5zM6 13.5a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25h2.25A2.25 2.25 0 0010.5 18v-2.25A2.25 2.25 0 008.25 13.5H6z"
        />
      </svg>
    </div>
  );
}

export function AppsList({ apps }: { apps: MobileApp[] }) {
  if (apps.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Obecnie trwa przygotowanie pierwszej publikacji. Lista produktów w sklepach mobilnych oraz powiązane dokumenty zostaną tu udostępnione wraz z uruchomieniem aplikacji.
      </p>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {apps.map((app) => (
        <li key={app.slug}>
          <Link
            href={`/apps/${app.slug}`}
            className="group relative flex gap-4 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/60 p-5 shadow-sm shadow-zinc-900/[0.03] ring-1 ring-black/[0.02] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/50 hover:shadow-lg hover:shadow-violet-500/[0.07] dark:border-zinc-800 dark:bg-zinc-950/50 dark:ring-white/[0.04] dark:hover:border-violet-500/35 dark:hover:shadow-violet-500/10"
          >
            <AppTileIcon title={app.title} iconSrc={app.iconSrc} />
            <div className="min-w-0 flex-1 pt-0.5">
              <span className="block text-base font-semibold tracking-tight text-zinc-900 transition group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
                {app.title}
              </span>
              {app.tagline ? (
                <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {app.tagline}
                </span>
              ) : null}
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-600 opacity-0 transition group-hover:opacity-100 dark:text-violet-400">
                Szczegóły
                <span aria-hidden className="translate-x-0 transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
