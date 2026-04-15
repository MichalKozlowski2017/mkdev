import { MDXRemote } from "next-mdx-remote/rsc";
import type { ContentBlock } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/mdx-components";

function HeroBlock({
  headline,
  subheadline,
}: {
  headline: string;
  subheadline?: string;
}) {
  return (
    <header className="relative space-y-6 pb-14">
      <div className="relative space-y-5">
        <h1 className="text-pretty text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.08] dark:text-zinc-50">
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:via-zinc-100 dark:to-zinc-400">
            {headline}
          </span>
        </h1>
        {subheadline ? (
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
            {subheadline}
          </p>
        ) : null}
      </div>
    </header>
  );
}

export function PageBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-14">
      {blocks.map((block, i) => {
        if (block.type === "hero") {
          return (
            <HeroBlock
              key={`hero-${i}`}
              headline={block.headline}
              subheadline={block.subheadline}
            />
          );
        }
        return (
          <div key={`prose-${i}`} className="prose-layout">
            <MDXRemote source={block.body} components={mdxComponents} />
          </div>
        );
      })}
    </div>
  );
}
