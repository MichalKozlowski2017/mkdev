import { projects } from "@/data/projects";

const typeLabel: Record<string, string> = {
  web: "Projekt webowy",
  mobile: "Aplikacja mobilna",
  other: "Inny projekt",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Projekty
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Wybrane projekty webowe, mobilne i poboczne. Lista będzie rozwijana w
          miarę dodawania kolejnych rzeczy&nbsp;– zarówno komercyjnych, jak i
          prywatnych.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block rounded-2xl border border-zinc-200 bg-white/70 p-4 text-left shadow-sm ring-1 ring-black/2 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60 dark:ring-white/3 dark:hover:border-zinc-600"
          >
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {project.name}
            </h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              {typeLabel[project.type] ?? "Projekt"}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
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
          </a>
        ))}
      </div>
    </div>
  );
}

