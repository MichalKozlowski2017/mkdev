# Sanity — typy dokumentów (starter)

Adapter oczekuje dokumentów GROQ o następujących kształtach (dopasuj schemat w Sanity Studio).

## `starterPage`

- `slug` — typ `slug`
- `title` — `string`
- `description` — `string` (opcjonalnie)
- `publishedAt` — `datetime` (opcjonalnie; mapowane jako ISO string)
- `blocks` — tablica obiektów zgodna z kontraktem Zod w `src/lib/content/contract.ts`:
  - `{ _type: "hero", headline: string, subheadline?: string }` z `type: "hero"` po stronie aplikacji **lub** użyj mapowania w adapterze.
  - `{ _type: "prose", body: string }` — treść MDX jako string.

**Uwaga:** W `sanity.ts` zapytania zakładają pole `blocks` już zgodne z `contentBlockSchema`. Najprościej: pole **JSON** lub niestandardowe pole z tablicą obiektów o polach `type`, `headline`, `subheadline`, `body` zgodnych z discriminated union w kodzie.

## `starterPost`

- `slug` — `slug`
- `title` — `string`
- `excerpt` — `string` (opcjonalnie)
- `publishedAt` — `datetime`
- `bodyMdx` — `text` (treść MDX)

Po publikacji w Sanity wywołaj webhook na `/api/revalidate` z nagłówkiem `x-revalidate-secret` i ciałem JSON, np. `{ "paths": ["/blog"] }`.
