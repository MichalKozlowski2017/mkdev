import Link from "next/link";
import { projects } from "@/data/projects";

export function FeaturedProjectsSection() {
  const featured = projects.filter((p) => p.featured);

  if (!featured.length) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
          Wybrane projekty
        </h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Zobacz wszystkie →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {featured.map((project) => {
          const typeLabel =
            project.type === "web"
              ? "Web"
              : project.type === "mobile"
                ? "iOS & Android"
                : "Projekt";
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm ring-1 ring-black/5 transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/80 dark:ring-white/5 dark:hover:border-zinc-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {project.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {typeLabel}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
