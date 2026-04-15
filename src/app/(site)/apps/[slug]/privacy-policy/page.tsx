import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppBySlug, getContentSource, getPageBySlug, listApps } from "@/lib/content";
import { PageBlocks } from "@/components/blocks/page-blocks";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (getContentSource() !== "files") return [];
  const apps = await listApps();
  return apps
    .filter((app) => Boolean(app.privacyPolicySlug))
    .map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app?.privacyPolicySlug) return { title: "Not found" };
  const policyPage = await getPageBySlug(app.privacyPolicySlug);
  return {
    title: policyPage?.title ?? `Privacy Policy — ${app.title}`,
    description: policyPage?.description ?? `${app.title} app privacy policy.`,
  };
}

export default async function AppPrivacyPolicyPage({ params }: Props) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app?.privacyPolicySlug) notFound();

  const policyPage = await getPageBySlug(app.privacyPolicySlug);
  if (!policyPage) notFound();

  return (
    <article className="space-y-10">
      <nav className="flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-medium text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          <span aria-hidden>←</span> Home
        </Link>
        <span className="text-zinc-400 dark:text-zinc-600">/</span>
        <Link
          href={`/apps/${slug}`}
          className="font-medium text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          {app.title}
        </Link>
      </nav>
      <PageBlocks blocks={policyPage.blocks} />
    </article>
  );
}
