# Starter site (`starter-site`)

Uniwersalny szablon **Next.js (App Router) + TypeScript + Tailwind** do klonowania przed każdym nowym projektem. Treść trafia do UI wyłącznie przez **jeden kontrakt** (`Page`, `BlogPost`, bloki) i **adapter** wybrany zmienną `CONTENT_SOURCE`.

## Tryby treści

| Wartość `CONTENT_SOURCE` | Źródło | Kiedy |
|--------------------------|--------|--------|
| `files` (domyślnie) | `content/pages/*.mdx`, `content/posts/*.mdx` | Proste strony, landingi, brak CMS |
| `supabase` | Tabele `cms_pages`, `cms_posts` | `docs/supabase-schema.sql` + własny panel (`/admin` — placeholder) |
| `sanity` | Zapytania GROQ | `docs/sanity-studio.md` |

Skopiuj [`.env.example`](.env.example) do `.env.local` i ustaw tryb.

## Skrypty

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Frontmatter (tryb `files`)

**Strony** (`content/pages/{slug}.mdx`):

- `slug`, `title`, opcjonalnie `description`, `publishedAt`
- opcjonalnie `heroHeadline`, `heroSubheadline` → blok hero + treść MDX jako `prose`

**Blog** (`content/posts/{slug}.mdx`):

- `slug`, `title`, `publishedAt`, opcjonalnie `excerpt`
- treść pliku = MDX wpisu

## Rewalidacja (ISR / cache)

`POST /api/revalidate` — nagłówek `x-revalidate-secret: <REVALIDATE_SECRET>` (lub query `?secret=`), ciało opcjonalnie:

```json
{ "paths": ["/", "/blog", "/about"] }
```

Podłącz jako webhook z Sanity lub po zapisie w Supabase (Edge Function / trigger).

## Struktura (ważne pliki)

- [`src/lib/content/contract.ts`](src/lib/content/contract.ts) — Zod i typy
- [`src/lib/content/adapters/`](src/lib/content/adapters/) — implementacje źródeł
- [`src/components/blocks/page-blocks.tsx`](src/components/blocks/page-blocks.tsx) — render bloków + MDX
- [`docs/`](docs/) — SQL i notatki Sanity

## Zasady dla Cursor / agentów

Zobacz [`.cursor/rules/starter.mdc`](.cursor/rules/starter.mdc) oraz [`AGENTS.md`](AGENTS.md).

## Nazwa npm

Folder może nazywać się `starterSite`; w `package.json` pole `name` musi być zgodne z ograniczeniami npm (np. `starter-site`).
