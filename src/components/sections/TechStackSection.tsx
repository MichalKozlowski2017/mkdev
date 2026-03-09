const STACK = [
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "Node.js",
  "React Native / Expo",
];

export function TechStackSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Tech stack
      </h2>
      <p className="max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
        Pracuję głównie w ekosystemie JavaScript/TypeScript z naciskiem na
        nowoczesne frameworki frontendowe oraz narzędzia, które przyspieszają
        development bez poświęcania jakości.
      </p>
      <div className="flex flex-wrap gap-2">
        {STACK.map((item) => (
          <span
            key={item}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

