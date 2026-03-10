export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-zinc-500 sm:px-6 lg:px-8">
        <span>© {year} Michał – portfolio developera.</span>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            GitHub
          </a>
          <a
            href="#"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
