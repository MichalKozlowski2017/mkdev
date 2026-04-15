import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAppBySlug,
  getContentSource,
  listAppSlugs,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { StoreLinks } from "@/components/apps/store-links";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (getContentSource() !== "files") return [];
  const slugs = await listAppSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return { title: "Not found" };
  return {
    title: app.title,
    description: app.tagline,
  };
}

export default async function AppDetailPage({ params }: Props) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) notFound();

  return (
    <article className="space-y-12">
      <nav>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          <span aria-hidden>←</span> Home
        </Link>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/70 p-8 shadow-lg shadow-zinc-900/[0.06] ring-1 ring-black/[0.02] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/55 dark:shadow-black/40 dark:ring-white/[0.05] sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-3xl"
        />
        <div className="relative space-y-5">
          <div className="flex items-center gap-4">
            {app.iconSrc ? (
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-200/80 dark:ring-white/10">
                <Image
                  src={app.iconSrc}
                  alt={`${app.title} icon`}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
                {app.title}
              </span>
            </h1>
          </div>
          {app.tagline ? (
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {app.tagline}
            </p>
          ) : null}
          <StoreLinks googlePlayUrl={app.googlePlayUrl} appStoreUrl={app.appStoreUrl} />
          {app.privacyPolicySlug ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link
                href={`/apps/${app.slug}/privacy-policy`}
                className="font-semibold text-violet-600 underline decoration-violet-500/30 underline-offset-4 transition hover:decoration-violet-500/60 dark:text-violet-400"
              >
                Privacy policy
              </Link>
            </p>
          ) : null}
        </div>
      </header>

      {app.bodyMdx ? (
        <div className="prose-layout">
          <MDXRemote source={app.bodyMdx} components={mdxComponents} />
        </div>
      ) : null}
      {app.galleryImages.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Screenshots
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {app.galleryImages.map((src, index) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/70 shadow-sm transition hover:border-violet-400/45 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/55"
              >
                <Image
                  src={src}
                  alt={`${app.title} screenshot ${index + 1}`}
                  width={900}
                  height={1950}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
