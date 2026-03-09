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
      title: "Privacy Policy – not found",
    };
  }

  return {
    title: `${app.name} – Privacy Policy`,
    description: `Privacy Policy for the mobile application ${app.name}.`,
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { slug } = await params;
  const app = getMobileAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const { privacyPolicy } = app;

  return (
    <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:scroll-mt-20">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
        Privacy Policy
      </p>
      <h1>{app.name}</h1>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Last updated:{" "}
        <time dateTime={privacyPolicy.lastUpdated}>
          {privacyPolicy.lastUpdated}
        </time>
      </p>

      {privacyPolicy.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </section>
      ))}
    </article>
  );
}

