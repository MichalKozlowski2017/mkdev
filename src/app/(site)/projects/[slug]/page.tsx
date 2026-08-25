import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getContentSource,
  getProjectBySlug,
  listProjectSlugs,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  PlatformBadge,
  ProjectLinks,
  StatusBadge,
  TechTags,
} from "@/components/projects/project-ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (getContentSource() !== "files") return [];
  const slugs = await listProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="space-y-12">
      <nav>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          <span aria-hidden>←</span> Projects
        </Link>
      </nav>

      <header className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white/70 p-8 shadow-lg shadow-zinc-900/[0.06] ring-1 ring-black/[0.02] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/55 dark:shadow-black/40 dark:ring-white/[0.05] sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-3xl"
        />
        <div className="relative space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <PlatformBadge platform={project.platform} />
            {project.status ? <StatusBadge status={project.status} /> : null}
            {project.year ? (
              <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
                {project.year}
              </span>
            ) : null}
          </div>
          <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
              {project.title}
            </span>
          </h1>
          {project.tagline ? (
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.tagline}
            </p>
          ) : null}
          <TechTags tech={project.tech} />
          <ProjectLinks liveUrl={project.liveUrl} repoUrl={project.repoUrl} />
        </div>
      </header>

      {project.bodyMdx ? (
        <div className="prose-layout">
          <MDXRemote source={project.bodyMdx} components={mdxComponents} />
        </div>
      ) : null}
    </article>
  );
}
