export function HeroSection() {
  return (
    <section className="space-y-6">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
        Portfolio developera
      </p>
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
        Cześć, jestem Michał. Buduję{" "}
        <span className="underline decoration-zinc-300 decoration-2 underline-offset-[6px] dark:decoration-zinc-600">
          aplikacje webowe i mobilne
        </span>
        , a tutaj znajdziesz moje projekty i strony z politykami prywatności
        dla aplikacji w App Store i Google Play.
      </h1>
      <p className="max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
        Skupiam się na prostych, przejrzystych interfejsach, wysokiej jakości
        kodu i sensownym procesie developmentu. Ta strona pełni rolę mojego
        portfolio oraz miejsca, w którym hostuję dokumenty prawne dla aplikacji
        mobilnych.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="/projects"
          className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-zinc-50 shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Zobacz projekty
        </a>
        <a
          href="/contact"
          className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300 dark:hover:bg-zinc-900"
        >
          Skontaktuj się
        </a>
      </div>
    </section>
  );
}

