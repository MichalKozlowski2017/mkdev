import Image from "next/image";
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

export function ProjectIcon({
  title,
  iconSrc,
  size = 48,
}: {
  title: string;
  iconSrc?: string;
  size?: number;
}) {
  const boxClass = size >= 56 ? "h-14 w-14" : "h-12 w-12";
  const iconClass = size >= 56 ? "h-7 w-7" : "h-6 w-6";
  if (iconSrc) {
    return (
      <div
        className={`${boxClass} shrink-0 overflow-hidden rounded-2xl ring-1 ring-inset ring-zinc-200/80 dark:ring-white/10`}
      >
        <Image
          src={iconSrc}
          alt={`${title} icon`}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={`${boxClass} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 ring-1 ring-inset ring-violet-500/10 dark:from-violet-500/25 dark:to-cyan-500/20 dark:ring-white/10`}
    >
      <svg
        className={`${iconClass} text-violet-600 dark:text-violet-300`}
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
