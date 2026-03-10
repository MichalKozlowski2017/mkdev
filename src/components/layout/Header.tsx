import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Start" },
  { href: "/projects", label: "Projekty" },
  { href: "/contact", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">mkdev</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
