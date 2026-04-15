/** Tło strony publicznej — gradienty + delikatna siatka (bez treści, tylko dekoracja). */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-[20%] -top-32 h-[420px] w-[520px] rounded-full bg-violet-500/15 blur-[100px] dark:bg-violet-500/20" />
      <div className="absolute -right-[15%] top-24 h-[380px] w-[480px] rounded-full bg-cyan-500/12 blur-[90px] dark:bg-cyan-500/18" />
      <div className="absolute bottom-0 left-1/3 h-[280px] w-[400px] rounded-full bg-fuchsia-500/8 blur-[100px] dark:bg-fuchsia-500/12" />
      <div
        className="absolute inset-0 opacity-[0.65] dark:opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(24 24 27 / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(24 24 27 / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 85% 55% at 50% -5%, black 25%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 hidden opacity-40 dark:block dark:opacity-55"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 85% 55% at 50% -5%, black 25%, transparent 65%)",
        }}
      />
    </div>
  );
}
