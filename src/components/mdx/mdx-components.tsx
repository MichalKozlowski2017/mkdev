import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-10 text-3xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2
      className="mt-10 border-l-2 border-violet-500/70 pl-4 text-2xl font-semibold tracking-tight first:mt-8 dark:border-violet-400/60"
      {...props}
    />
  ),
  h3: (props) => <h3 className="mt-6 text-xl font-semibold" {...props} />,
  p: (props) => (
    <p className="mt-4 leading-7 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  a: (props) => (
    <a
      className="font-medium text-violet-700 underline decoration-violet-500/35 underline-offset-4 transition hover:text-violet-900 hover:decoration-violet-600/55 dark:text-violet-400 dark:hover:text-violet-300"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  code: (props) => (
    <code
      className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm text-zinc-50"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 border-l-4 border-zinc-300 pl-4 italic text-zinc-600 dark:border-zinc-600 dark:text-zinc-400"
      {...props}
    />
  ),
};
