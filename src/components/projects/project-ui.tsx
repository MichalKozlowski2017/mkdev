import type { Project, ProjectPlatform, ProjectStatus } from "@/lib/content";

const PLATFORM_LABEL: Record<ProjectPlatform, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  tool: "Tool",
};

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};

const STATUS_DOT: Record<ProjectStatus, string> = {
  live: "bg-emerald-500",
  "in-progress": "bg-amber-500",
  archived: "bg-zinc-400 dark:bg-zinc-500",
};

export function PlatformBadge({ platform }: { platform: ProjectPlatform }) {
  return (
    <span className="inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-700 ring-1 ring-inset ring-violet-500/20 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-400/20">
      {PLATFORM_LABEL[platform]}
    </span>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-2.5 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/15 dark:text-zinc-300">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function TechTags({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <li
          key={item}
          className="rounded-md bg-zinc-900/[0.04] px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-white/[0.06] dark:text-zinc-300"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const linkBase =
  "inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500";

export function ProjectLinks({
  liveUrl,
  repoUrl,
}: Pick<Project, "liveUrl" | "repoUrl">) {
  if (!liveUrl && !repoUrl) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkBase} bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-md shadow-violet-600/25 hover:brightness-110 dark:shadow-violet-500/20`}
        >
          Live demo
        </a>
      ) : null}
      {repoUrl ? (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkBase} border border-zinc-300/90 bg-white/90 text-zinc-900 hover:border-violet-400/60 hover:bg-white dark:border-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-violet-500/50`}
        >
          Source code
        </a>
      ) : null}
    </div>
  );
}
