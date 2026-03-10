export function CtaSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
          Stwórzmy coś razem
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Masz pomysł na aplikację webową lub mobilną? Napisz – chętnie
          porozmawiam o projekcie i możliwościach współpracy.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Skontaktuj się
          </a>
          <a
            href="/projects"
            className="inline-flex items-center rounded-full border-2 border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-900"
          >
            Zobacz projekty
          </a>
        </div>
      </div>
    </section>
  );
}
