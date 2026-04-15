import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-700 dark:bg-zinc-950">
      <h1 className="text-2xl font-semibold">Panel CMS (placeholder)</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Ten szkielet pojawia się w nawigacji tylko przy{" "}
        <code className="rounded bg-zinc-100 px-1 font-mono dark:bg-zinc-800">
          CONTENT_SOURCE=supabase
        </code>
        . Zaimplementuj logowanie (Supabase Auth), CRUD na tabelach{" "}
        <code className="font-mono">cms_pages</code> /{" "}
        <code className="font-mono">cms_posts</code> i polityki RLS zgodnie z{" "}
        <Link href="https://supabase.com/docs/guides/auth" className="underline">
          dokumentacją
        </Link>
        .
      </p>
    </div>
  );
}
