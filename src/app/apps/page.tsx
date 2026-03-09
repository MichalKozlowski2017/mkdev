import { mobileApps } from "@/data/apps";

export default function AppsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Aplikacje mobilne
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Lista aplikacji mobilnych, dla których ta strona hostuje dokumenty
          prawne (takie jak polityka prywatności czy regulaminy) wymagane przez
          App Store i Google Play.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {mobileApps.map((app) => (
          <a
            key={app.slug}
            href={`/apps/${app.slug}`}
            className="group block rounded-2xl border border-zinc-200 bg-white/70 p-4 text-left shadow-sm ring-1 ring-black/2 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:ring-white/3 dark:hover:border-zinc-600"
          >
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {app.name}
            </h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              {app.platforms.join(" / ").toUpperCase()}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {app.shortDescription}
            </p>
            <p className="mt-3 text-xs font-medium text-zinc-700 underline-offset-4 group-hover:underline dark:text-zinc-300">
              Zobacz szczegóły i politykę prywatności
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

