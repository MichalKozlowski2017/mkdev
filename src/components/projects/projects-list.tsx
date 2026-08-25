import Link from "next/link";
import type { Project } from "@/lib/content";
import { PlatformBadge, StatusBadge, TechTags } from "./project-ui";

export function ProjectsList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Projects will appear here soon.
      </p>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/60 p-5 shadow-sm shadow-zinc-900/[0.03] ring-1 ring-black/[0.02] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/50 hover:shadow-lg hover:shadow-violet-500/[0.07] dark:border-zinc-800 dark:bg-zinc-950/50 dark:ring-white/[0.04] dark:hover:border-violet-500/35 dark:hover:shadow-violet-500/10"
          >
            <div className="flex flex-wrap items-center gap-2">
              <PlatformBadge platform={project.platform} />
              {project.status ? <StatusBadge status={project.status} /> : null}
              {project.year ? (
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {project.year}
                </span>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-base font-semibold tracking-tight text-zinc-900 transition group-hover:text-violet-700 dark:text-zinc-50 dark:group-hover:text-violet-300">
                {project.title}
              </span>
              {project.tagline ? (
                <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.tagline}
                </span>
              ) : null}
            </div>
            <TechTags tech={project.tech} />
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-violet-600 opacity-0 transition group-hover:opacity-100 dark:text-violet-400">
              Details
              <span aria-hidden className="translate-x-0 transition group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
