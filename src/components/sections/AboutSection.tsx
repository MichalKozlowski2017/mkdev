export function AboutSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
        O mnie
      </h2>
      <p className="max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
        Jestem developerem skupionym na tworzeniu aplikacji, które są proste w
        użyciu, łatwe w utrzymaniu i dobrze udokumentowane. W pracy stawiam na
        czytelny kod, dobre praktyki (testy, linting, sensowna architektura) i
        spokojny, przewidywalny proces developmentu.
      </p>
      <p className="max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
        Na tej stronie znajdziesz zarówno moje projekty komercyjne i
        poboczne&nbsp;– głównie webowe i mobilne&nbsp;– jak i techniczne
        zaplecze w postaci podstron z politykami prywatności dla aplikacji.
      </p>
    </section>
  );
}

