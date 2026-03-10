export function HeroSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        Cześć, jestem
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl md:text-6xl">
        Michał
      </h1>
      <p className="mt-3 text-xl font-medium text-zinc-700 dark:text-zinc-300 sm:text-2xl">
        Web & Mobile Developer
      </p>
      <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        Tworzę aplikacje webowe i mobilne – przejrzyste interfejsy, dobry kod i
        sensowny proces. Tu znajdziesz moje projekty oraz strony z politykami
        prywatności dla aplikacji w App Store i Google Play.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/projects"
          className="inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Zobacz projekty
        </a>
        <a
          href="/contact"
          className="inline-flex items-center rounded-full border-2 border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:bg-zinc-900"
        >
          Skontaktuj się
        </a>
      </div>
    </section>
  );
}
