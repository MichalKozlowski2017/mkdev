import type { Metadata } from "next";
import { listApps } from "@/lib/content";
import { AppsList } from "@/components/apps/apps-list";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "mkdev",
  description: "Simple mobile developer website with app pages and docs.",
};

export default async function HomePage() {
  const apps = await listApps();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title="Apps"
          description="Mobile app list with store links and privacy pages."
        />
      </div>
      <AppsList apps={apps} />
    </section>
  );
}
