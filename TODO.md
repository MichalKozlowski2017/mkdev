## Plan projektu: strona portfolio developera

### 1. Fundamenty projektu
- [x] Zainicjować projekt `Next.js` (App Router, TypeScript, Tailwind, ESLint).
- [x] Skonfigurować `tsconfig.json` i aliasy importów (`@/*`) pod strukturę projektu.
- [x] Ustalić podstawową strukturę katalogów (`app`, komponenty UI, sekcja contentu, np. `content/` lub `data/`).

### 2. Layout, nawigacja i responsywność
- [x] Stworzyć główny layout (`app/layout.tsx`) z:
  - [x] prostą, responsywną siatką i maksymalną czytelnością,
  - [x] nawigacją (strona główna, projekty, aplikacje mobilne, kontakt),
  - [x] domyślnym motywem (np. dark + możliwość dodania light w przyszłości).
- [x] Dodać podstawową typografię i spacing (Tailwind + ewentualnie `@tailwindcss/typography`).

### 3. Strona główna (landing)
- [x] Sekcja hero: krótki opis kim jesteś, czym się zajmujesz, CTA do kontaktu / portfolio.
- [x] Sekcja "O mnie" z naciskiem na doświadczenie jako developer.
- [x] Sekcja "Tech stack" (ikony / lista technologii).
- [x] Sekcja "Wybrane projekty" z odnośnikami do pełnej listy projektów.

### 4. Podstrona projektów (web)
- [x] Zaprojektować model danych projektu (nazwa, opis, link, stack, typ: web/mobile/inna).
- [x] Dodać stronę listy projektów (np. `/projects`) z filtrowaniem po typie / technologii (opcjonalnie na później).
- [x] Dodać strony szczegółów projektu (np. `/projects/[slug]`) – opcjonalnie, jeśli będzie potrzeba szerszego opisu.

### 5. Aplikacje mobilne i podstrony prawne
- [x] Zaplanować strukturę URL dla aplikacji mobilnych, np.:
  - [x] `/apps` – lista aplikacji mobilnych,
  - [x] `/apps/[slug]` – opis aplikacji,
  - [x] `/apps/[slug]/privacy-policy` – privacy policy,
  - [ ] `/apps/[slug]/terms` – (opcjonalnie) terms & conditions.
- [x] Wybrać sposób trzymania treści (na start statyczne pliki/obiekty w repo – np. `data/apps.ts` lub MDX).
- [x] Zaimplementować generowanie statyczne (SSG) dla stron polityk prywatności i regulaminów.

### 6. Kontakt i sekcja usług
- [ ] Dodać stronę / sekcję "Usługi" z jasnym opisem, co oferujesz.
- [ ] Dodać sekcję "Kontakt" (prosty formularz lub `mailto:` + link do LinkedIna / GitHuba).
- [ ] Opcjonalnie: prosty endpoint API `/api/contact` z wysyłką na e-mail lub integracją z zewnętrznym serwisem (do rozważenia później).

### 7. SEO, metadane i wydajność
- [ ] Skonfigurować metadane w `app/layout.tsx` (tytuł, opis, favicony, `open graph`).
- [ ] Dodać podstawowe tagi SEO dla kluczowych podstron (projekty, aplikacje).
- [ ] Zweryfikować Lighthouse (performance / accessibility / SEO) i poprawić najważniejsze uwagi.

### 8. Deploy i utrzymanie
- [ ] Przygotować konfigurację pod deploy (np. Vercel).
- [ ] Dodać krótką sekcję w `README.md` opisującą strukturę projektu i sposób dodawania nowych aplikacji/projektów.
- [ ] (Opcjonalnie) Skonfigurować prosty workflow CI (np. testy/lint przed deployem).

---

Na start skupimy się na:
1. **Doprecyzowaniu struktury URL i contentu dla aplikacji mobilnych**.
2. **Przerobieniu domyślnego layoutu Next.js na prostą stronę portfolio** (landing + podstawowa nawigacja).
3. **Dodaniu pierwszych przykładowych wpisów: 1–2 projekty web + 1 aplikacja mobilna z privacy policy.**
