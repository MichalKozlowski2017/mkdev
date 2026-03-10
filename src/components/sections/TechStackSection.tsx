const CORE_TECH = [
  { name: "TypeScript / JavaScript", level: 95, context: "Full‑stack" },
  { name: "React & Next.js", level: 90, context: "Web" },
  { name: "React Native / Expo", level: 85, context: "Mobile" },
  { name: "Node.js", level: 80, context: "Backend" },
];

const SKILLS = [
  { name: "Tailwind CSS", level: 90 },
  { name: "Firebase / Supabase", level: 75 },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
      <div
        className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function TechStackSection() {
  return (
    <section className="py-12 sm:py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
        Technical Expertise
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Technologie, w których pracuję na co dzień – od frontendu po mobilne i
        backend.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
            Główne technologie
          </h3>
          <ul className="mt-4 space-y-4">
            {CORE_TECH.map(({ name, level, context }) => (
              <li key={name}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {name}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {context} · {level}%
                  </span>
                </div>
                <ProgressBar value={level} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
            Dodatkowe umiejętności
          </h3>
          <ul className="mt-4 space-y-4">
            {SKILLS.map(({ name, level }) => (
              <li key={name}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {name}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {level}%
                  </span>
                </div>
                <ProgressBar value={level} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
