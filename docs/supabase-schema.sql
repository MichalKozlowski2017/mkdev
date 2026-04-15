-- Minimalny schemat dla trybu CONTENT_SOURCE=supabase
-- Uruchom w projekcie Supabase (SQL Editor). Dostosuj RLS do multi-tenant i ról.

create table if not exists cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  published_at timestamptz,
  blocks jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

create table if not exists cms_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  published_at timestamptz not null,
  body_mdx text not null default '',
  created_at timestamptz default now()
);

-- Przykład: publiczny odczyt opublikowanych stron (anon) — dopasuj do własnych reguł.
-- alter table cms_pages enable row level security;
-- create policy "Public read pages" on cms_pages for select using (true);
