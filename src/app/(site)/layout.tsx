import Link from "next/link";
import { getContentSource } from "@/lib/content";
import { siteContentClassName } from "@/lib/site-layout";
import { SiteBackdrop } from "@/components/site/site-backdrop";
import { SiteHeader } from "@/components/site/site-header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const source = getContentSource();

  return (
    <div className="relative flex min-h-full min-w-0 flex-col">
      <SiteBackdrop />
      <SiteHeader source={source} />
      <main
        className={`${siteContentClassName} min-w-0 flex-1 pb-12 pt-8 sm:pb-16 sm:pt-10`}
      >
        {children}
      </main>
      <footer className={`${siteContentClassName} pb-14`}>
        <div
          aria-hidden
          className="mb-8 h-px bg-gradient-to-r from-transparent via-zinc-300/90 to-transparent dark:via-zinc-600/60"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-2">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} mkdev
          </p>
          <p className="text-sm">
            <Link
              href="/privacy"
              className="font-medium text-violet-700 underline decoration-violet-500/35 underline-offset-4 transition hover:decoration-violet-600/60 dark:text-violet-400"
            >
              Privacy policy (website)
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
