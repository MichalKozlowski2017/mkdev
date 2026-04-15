import type { Metadata } from "next";
import { listApps } from "@/lib/content";
import { AppsList } from "@/components/apps/apps-list";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Aplikacje",
  description: "Opublikowane aplikacje mobilne mkdev — Google Play i App Store.",
};

export default async function AppsIndexPage() {
  const apps = await listApps();

  return (
    <div className="space-y-12">
      <SectionHeading
        eyebrow="Portfolio"
        title="Aplikacje"
        description="Produkty dostępne w sklepach mobilnych — z linkami dystrybucyjnymi i, w razie potrzeby, polityką prywatności danej aplikacji."
      />
      <AppsList apps={apps} />
    </div>
  );
}
