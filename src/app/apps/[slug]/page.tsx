import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMobileAppBySlug, mobileApps } from "@/data/apps";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return mobileApps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getMobileAppBySlug(slug);

  if (!app) {
    return {
      title: "Aplikacja – nie znaleziono",
    };
  }

  return {
    title: `${app.name} – aplikacja mobilna`,
    description: app.shortDescription,
  };
}

export default async function AppDetailsPage({ params }: Props) {
  const { slug } = await params;
  const app = getMobileAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <article className="space-y-4">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
          Aplikacja mobilna
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {app.name}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {app.shortDescription}
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Platformy
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {app.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {platform === "ios" ? "iOS" : "Android"}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Dokumenty
        </h2>
        <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <a
              href={`/apps/${app.slug}/privacy-policy`}
              className="underline underline-offset-4 hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              Polityka prywatności
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}

