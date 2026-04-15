<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Ten repozytorium (starter WWW)

- **Treść**: zawsze przez `src/lib/content/` — `getPageBySlug`, `getPostBySlug`, `listPosts`. UI nie importuje plików z `content/` bezpośrednio (wyjątek: tylko kod adaptera `files`).
- **Tryb**: `CONTENT_SOURCE` w `.env.local`; patrz `README.md` i `.cursor/rules/starter.mdc`.
- **Nowe strony (files)**: `content/pages/{slug}.mdx` z frontmatter (`slug` = nazwa pliku). Strona główna: `home.mdx`.
- **Supabase / Sanity**: przed pierwszym buildem uzupełnij ENV i tabele / studio; nie commituj sekretów.
