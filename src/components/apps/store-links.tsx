import type { MobileApp } from "@/lib/content";

const btnBase =
  "inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500";

export function StoreLinks({
  googlePlayUrl,
  appStoreUrl,
}: Pick<MobileApp, "googlePlayUrl" | "appStoreUrl">) {
  if (!googlePlayUrl && !appStoreUrl) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {googlePlayUrl ? (
        <a
          href={googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md shadow-violet-600/25 hover:brightness-110 dark:shadow-violet-500/20`}
        >
          Google Play
        </a>
      ) : null}
      {appStoreUrl ? (
        <a
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} border border-zinc-300/90 bg-white/90 text-zinc-900 hover:border-violet-400/60 hover:bg-white dark:border-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-violet-500/50`}
        >
          App Store
        </a>
      ) : null}
    </div>
  );
}
