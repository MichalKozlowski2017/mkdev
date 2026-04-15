import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getContentSource, listPostSlugs } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  if (getContentSource() !== "files") return [];
  const slugs = await listPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-2 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
        <time className="text-sm text-zinc-500" dateTime={post.publishedAt}>
          {post.publishedAt}
        </time>
      </header>
      <MDXRemote source={post.bodyMdx} components={mdxComponents} />
    </article>
  );
}
