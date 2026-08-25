import type { Metadata } from "next";
import { listApps } from "@/lib/content";
import { AppsList } from "@/components/apps/apps-list";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Apps",
  description: "Mobile app list with store links and privacy pages.",
};

export default async function AppsIndexPage() {
  const apps = await listApps();

  return (
    <section className="space-y-8">
      <SectionHeading
        title="Apps"
        description="Mobile app list with store links and privacy pages."
      />
      <AppsList apps={apps} />
    </section>
  );
}
