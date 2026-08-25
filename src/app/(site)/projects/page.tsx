import type { Metadata } from "next";
import { listProjects } from "@/lib/content";
import { ProjectsList } from "@/components/projects/projects-list";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected web, mobile, and desktop projects built by mkdev.",
};

export default async function ProjectsIndexPage() {
  const projects = await listProjects();

  return (
    <section className="space-y-8">
      <SectionHeading
        title="Projects"
        description="Selected web, mobile, and desktop work — with live demos and source code."
      />
      <ProjectsList projects={projects} />
    </section>
  );
}
