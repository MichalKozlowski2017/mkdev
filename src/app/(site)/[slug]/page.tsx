import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getContentSource, listPageSlugs } from "@/lib/content";
import { PageBlocks } from "@/components/blocks/page-blocks";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (getContentSource() !== "files") return [];
  const slugs = await listPageSlugs();
  return slugs.filter((s) => s !== "home").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Not found" };
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") notFound();
  const page = await getPageBySlug(slug);
  if (!page) notFound();
  return <PageBlocks blocks={page.blocks} />;
}
