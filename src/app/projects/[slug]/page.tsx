import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projekt – nie znaleziono",
    };
  }

  return {
    title: `${project.name} – projekt`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
          Projekt
        </p>
        {project.logoSrc && (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.logoSrc}
                alt={`${project.name} logo`}
                className="max-h-7 max-w-full"
              />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
              {project.name}
            </h1>
          </div>
        )}
        {!project.logoSrc && (
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
            {project.name}
          </h1>
        )}
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.shortDescription}
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Technologia
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {project.screenshots && project.screenshots.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Zrzuty ekranu
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible md:grid-cols-4">
            {project.screenshots.map((src) => (
              <div
                key={src}
                className="relative aspect-square w-40 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/60 shadow-sm ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/40 dark:ring-white/5 sm:w-auto"
              >
                <Image
                  src={src}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(max-width: 640px) 10rem, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

