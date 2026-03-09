import { projects } from "@/data/projects";

export function FeaturedProjectsSection() {
  const featured = projects.filter((project) => project.featured);

  if (!featured.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Wybrane projekty
        </h2>
        <a
          href="/projects"
          className="text-xs font-medium text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Zobacz wszystkie
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((project) => (
          <article
            key={project.slug}
            className="group rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-sm ring-1 ring-black/2 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:ring-white/3 dark:hover:border-zinc-600"
          >
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {project.name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
              {project.type === "web"
                ? "Projekt webowy"
                : project.type === "mobile"
                ? "Aplikacja mobilna"
                : "Inny projekt"}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.shortDescription}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

