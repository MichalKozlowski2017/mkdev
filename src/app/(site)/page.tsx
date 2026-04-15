import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageBySlug, listApps } from "@/lib/content";
import { PageBlocks } from "@/components/blocks/page-blocks";
import { AppsList } from "@/components/apps/apps-list";
import { SectionHeading } from "@/components/site/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  if (!page) return { title: "mkdev" };
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function HomePage() {
  const [page, apps] = await Promise.all([getPageBySlug("home"), listApps()]);
  if (!page) notFound();

  return (
    <>
      <PageBlocks blocks={page.blocks} />
      <section className="relative mt-20 space-y-8 pt-16">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600/80"
        />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Opublikowane aplikacje"
            description="Lista produktów dystrybuowanych w Google Play i App Store — ze stałymi odnośnikami do sklepów oraz do dokumentów dla użytkowników."
          />
          <Link
            href="/apps"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-zinc-300/90 bg-white/80 px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-violet-400/50 hover:text-violet-700 dark:border-zinc-600 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:border-violet-500/40 dark:hover:text-violet-300"
          >
            Wszystkie aplikacje →
          </Link>
        </div>
        <AppsList apps={apps} />
      </section>
    </>
  );
}
