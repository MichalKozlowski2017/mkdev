import type { Metadata } from "next";
import { listApps } from "@/lib/content";
import { AppsList } from "@/components/apps/apps-list";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "mkdev",
  description: "Prosta strona dewelopera mobilnego z listą aplikacji i dokumentami.",
};

export default async function HomePage() {
  const apps = await listApps();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="mkdev"
          title="Aplikacje"
          description="Prosta lista aplikacji mobilnych z linkami do sklepów i dokumentów."
        />
      </div>
      <AppsList apps={apps} />
    </section>
  );
}
