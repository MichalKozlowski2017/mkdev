<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Ten repozytorium (starter WWW)

- **Treść**: zawsze przez `src/lib/content/` — `getPageBySlug`, `getPostBySlug`, `listPosts`. UI nie importuje plików z `content/` bezpośrednio (wyjątek: tylko kod adaptera `files`).
- **Tryb**: `CONTENT_SOURCE` w `.env.local`; patrz `README.md` i `.cursor/rules/starter.mdc`.
- **Nowe strony (files)**: `content/pages/{slug}.mdx` z frontmatter (`slug` = nazwa pliku). Strona główna: `home.mdx`.
- **Supabase / Sanity**: przed pierwszym buildem uzupełnij ENV i tabele / studio; nie commituj sekretów.

## Cursor Cloud specific instructions

- Single product: a Next.js 16 (App Router) + TypeScript + Tailwind website. Package manager is **npm** (`package-lock.json`). The startup update script already runs `npm ci`.
- Standard commands live in `package.json` / `README.md`: dev `npm run dev` (webpack, serves on port 3000), lint `npm run lint`, build `npm run build`. Prefer `npm run dev` over `npm run build`/`npm start` for development.
- No automated test suite is configured; "tests" here means lint + build. There is no `npm test` script.
- Default `CONTENT_SOURCE=files` needs **no** env vars or secrets — the site runs and renders `content/**/*.mdx` out of the box. Only `supabase`/`sanity` modes require env vars (and `/api/revalidate` needs `REVALIDATE_SECRET`). Note: `README.md` references a `.env.example` that is not committed.
