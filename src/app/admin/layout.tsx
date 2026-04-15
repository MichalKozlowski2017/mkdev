import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-zinc-100 dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
