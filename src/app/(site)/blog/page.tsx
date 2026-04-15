import Link from "next/link";
import type { Metadata } from "next";
import { listPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts sourced from the current CONTENT_SOURCE adapter.",
};

export default async function BlogIndexPage() {
  const posts = await listPosts();

  if (posts.length === 0) {
    return (
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">Blog</h1>
        <p className="text-zinc-600 dark:text-zinc-400">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-medium text-zinc-950 hover:underline dark:text-zinc-50"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-zinc-500">{post.publishedAt}</p>
            {post.excerpt ? (
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
