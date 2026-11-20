import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppBySlug, getContentSource, listApps } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

/** Strona odświeża dane co 15 minut (ISR), tyle samo trzyma cache API statystyk. */
export const revalidate = 900;

export async function generateStaticParams() {
  if (getContentSource() !== "files") return [];
  const apps = await listApps();
  return apps.filter((app) => Boolean(app.statsUrl)).map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app?.statsUrl) return { title: "Not found" };
  return {
    title: `${app.title}: behind the scenes`,
    description: `Live, anonymous gameplay statistics of ${app.title}.`,
  };
}

/* ---------- dane ---------- */

type Num = number | string | null;

interface Summary {
  generatedAt: string;
  windowDays: number;
  labels?: { worlds?: string[]; causes?: Record<string, string>; items?: Record<string, string>; achievements?: Record<string, string> };
  totals: { installs: Num; runs: Num; daily_runs: Num; daily_players: Num; hours: Num; best: Num };
  daily: { day: string; new: number; active: number; runs: number }[];
  retention: {
    d1: { rate: number | null; cohort: number | null };
    d3: { rate: number | null; cohort: number | null };
    d7: { rate: number | null; cohort: number | null };
    byBuild: { build: string | null; installs: number; d1: number | null; cohort: number }[];
  };
  heights: { runs: Num; p10: Num; p25: Num; p50: Num; p75: Num; p90: Num; median_time: Num; candies_per_run: Num; median_fps: Num };
  histogram: { from: number; runs: number }[];
  deaths: { world: number; cause: string; runs: number }[];
  funnel: Record<string, Num>;
  tutorial: { step: string; installs: number }[];
  economy: { candies_per_hour: Num; purchases: Num; buyers: Num; top: { item: string; count: number }[] };
  achievements: { id: string; installs: number }[];
  platforms: { platform: string; installs: number; medianFps: number | null }[];
  builds: { build: string | null; installs: number; runs: number; medianM: number | null; medianTime: number | null }[];
  sessions: { sessions: Num; runs_per_session: Num; minutes_per_session: Num };
}

async function load(url: string): Promise<Summary | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) return null;
    return (await res.json()) as Summary;
  } catch {
    return null;
  }
}

const num = (v: Num | undefined): number => (v === null || v === undefined ? 0 : Number(v));
const fmt = (v: Num | undefined, digits = 0): string =>
  v === null || v === undefined ? "–" : Number(v).toLocaleString("en-US", { maximumFractionDigits: digits });
const pct = (part: Num | undefined, whole: Num | undefined): string => (num(whole) > 0 ? `${Math.round((100 * num(part)) / num(whole))}%` : "–");
const humanize = (id: string) => id.replace(/[_-]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
const minutes = (s: Num | undefined) => (s === null || s === undefined ? "–" : `${Math.floor(num(s) / 60)}:${String(Math.round(num(s) % 60)).padStart(2, "0")}`);

/** Histogram bez długiego ogona: przedziały po ostatnim z co najmniej 1% biegów łączymy w jeden „N+ m”. */
function histogramRows(s: Summary): { label: string; runs: number }[] {
  const total = Math.max(1, num(s.heights.runs));
  const rows = [...s.histogram].sort((a, b) => a.from - b.from);
  let last = rows.length - 1;
  while (last > 0 && rows[last]!.runs / total < 0.01) last--;
  const head = rows.slice(0, last + 1).map((h) => ({ label: `${h.from}–${h.from + 24} m`, runs: h.runs }));
  const tail = rows.slice(last + 1);
  if (tail.length) head.push({ label: `${tail[0]!.from}+ m`, runs: tail.reduce((a, h) => a + h.runs, 0) });
  return head;
}

/* ---------- elementy ---------- */

const card =
  "rounded-3xl border border-zinc-200/90 bg-white/70 p-6 shadow-sm ring-1 ring-black/[0.02] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/55 dark:ring-white/[0.05] sm:p-8";

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${card} min-w-0 space-y-5`}>
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
        {note ? <p className="text-sm text-zinc-500 dark:text-zinc-400">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{sub}</p> : null}
    </div>
  );
}

/** Poziomy pasek z etykietą i wartością (wykresy słupkowe bez bibliotek). */
function Bar({ label, value, max, text, tone = "violet" }: { label: string; value: number; max: number; text: string; tone?: "violet" | "cyan" | "rose" | "amber" }) {
  const colors = { violet: "bg-violet-500/80", cyan: "bg-cyan-500/80", rose: "bg-rose-500/80", amber: "bg-amber-500/80" };
  const w = max > 0 ? Math.max(1.5, (100 * value) / max) : 0;
  return (
    <div className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 text-sm">
      <span className="truncate text-zinc-600 dark:text-zinc-400">{label}</span>
      <div className="h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className={`h-full rounded-full ${colors[tone]}`} style={{ width: `${w}%` }} />
      </div>
      <span className="w-16 text-right tabular-nums text-zinc-700 dark:text-zinc-300">{text}</span>
    </div>
  );
}

/** Kolumny dzienne (nowi i aktywni gracze). */
function DailyChart({ days }: { days: Summary["daily"] }) {
  const max = Math.max(1, ...days.map((d) => d.active));
  return (
    <div className="space-y-2">
      <div className="flex h-40 items-end gap-[3px]">
        {days.map((d) => (
          <div key={d.day} className="group relative flex h-full flex-1 flex-col justify-end" title={`${d.day.slice(0, 10)}: ${d.active} active, ${d.new} new, ${d.runs} runs`}>
            <div className="rounded-t bg-violet-500/30" style={{ height: `${(100 * (d.active - d.new)) / max}%` }} />
            <div className="bg-violet-500/90" style={{ height: `${(100 * d.new) / max}%` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>{days[0]?.day.slice(0, 10)}</span>
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-violet-500/90" /> new</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-violet-500/30" /> returning</span>
        </span>
        <span>{days.at(-1)?.day.slice(0, 10)}</span>
      </div>
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {head.map((h, i) => (
              <th key={h} className={`py-2 pr-4 font-medium ${i > 0 ? "text-right" : ""}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/60">
              {r.map((c, j) => (
                <td key={j} className={`py-2 pr-4 tabular-nums text-zinc-700 dark:text-zinc-300 ${j > 0 ? "text-right" : ""}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- strona ---------- */

export default async function AppStatsPage({ params }: Props) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app?.statsUrl) notFound();
  const s = await load(app.statsUrl);
  const players = num(s?.totals.installs);

  return (
    <article className="space-y-8">
      <nav className="flex flex-wrap items-center gap-3 text-sm">
        <Link href={`/apps/${app.slug}`} className="inline-flex items-center gap-1 font-medium text-zinc-500 transition hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400">
          <span aria-hidden>←</span> {app.title}
        </Link>
      </nav>

      <header className="space-y-3">
        <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">{app.title}: behind the scenes</span>
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Live numbers from players who agreed to anonymous statistics: how far they climb, where runs end, who comes back.
          Last {s?.windowDays ?? 90} days, refreshed every 15 minutes, no personal data.
        </p>
        {s ? <p className="text-xs text-zinc-500 dark:text-zinc-500">Updated {new Date(s.generatedAt).toUTCString()}</p> : null}
      </header>

      {!s || players === 0 ? (
        <section className={card}>
          <p className="text-zinc-600 dark:text-zinc-400">No data yet. Statistics will appear here once players start climbing.</p>
        </section>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Tile label="Players" value={fmt(s.totals.installs)} />
            <Tile label="Runs" value={fmt(s.totals.runs)} sub={`${fmt(s.totals.hours, 1)} h played`} />
            <Tile label="Best height" value={`${fmt(s.totals.best)} m`} />
            <Tile label="Day 1 return" value={s.retention.d1.rate === null ? "–" : `${s.retention.d1.rate}%`} sub={`of ${fmt(s.retention.d1.cohort)} players`} />
            <Tile label="Day 3 return" value={s.retention.d3.rate === null ? "–" : `${s.retention.d3.rate}%`} sub={`of ${fmt(s.retention.d3.cohort)} players`} />
            <Tile label="Day 7 return" value={s.retention.d7.rate === null ? "–" : `${s.retention.d7.rate}%`} sub={`of ${fmt(s.retention.d7.cohort)} players`} />
          </div>

          <Section id="players" title="Players per day" note="Last 30 days. New players on top of returning ones.">
            <DailyChart days={s.daily} />
          </Section>

          <Section id="heights" title="How high players climb" note={`Regular runs. Half of them end below ${fmt(s.heights.p50)} m; a typical run lasts ${minutes(s.heights.median_time)}.`}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <Tile label="10% below" value={`${fmt(s.heights.p10)} m`} />
              <Tile label="25% below" value={`${fmt(s.heights.p25)} m`} />
              <Tile label="Median" value={`${fmt(s.heights.p50)} m`} />
              <Tile label="75% below" value={`${fmt(s.heights.p75)} m`} />
              <Tile label="90% below" value={`${fmt(s.heights.p90)} m`} />
            </div>
            <div className="space-y-1.5">
              {histogramRows(s).map((h) => (
                <Bar key={h.label} label={h.label} value={h.runs} max={Math.max(...s.histogram.map((x) => x.runs))} text={pct(h.runs, s.heights.runs)} />
              ))}
            </div>
          </Section>

          <Section id="funnel" title="How far players get" note="Share of all players whose best run reached a height (each world starts every 100 m).">
            <div className="space-y-1.5">
              {(
                [
                  ["Played a run", "played"],
                  ["30 m", "m30"],
                  ["50 m", "m50"],
                  ["100 m", "m100"],
                  ["200 m", "m200"],
                  ["300 m", "m300"],
                  ["500 m", "m500"],
                  ["700 m", "m700"],
                ] as const
              ).map(([label, key]) => (
                <Bar key={key} label={label} value={num(s.funnel[key])} max={num(s.funnel.installs)} text={pct(s.funnel[key], s.funnel.installs)} tone="cyan" />
              ))}
            </div>
            {s.tutorial.length > 0 ? (
              <div className="space-y-1.5 pt-2">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First steps</p>
                {s.tutorial.map((t) => (
                  <Bar key={t.step} label={humanize(t.step.replace(/^tip_/, ""))} value={t.installs} max={players} text={pct(t.installs, players)} tone="cyan" />
                ))}
              </div>
            ) : null}
          </Section>

          <Section id="deaths" title="Where runs end" note="Per world: what ended the run.">
            <Table
              head={["World", ...Object.values(s.labels?.causes ?? { spikes: "Spikes", syrup: "Syrup", quit: "Quit" }), "Runs"]}
              rows={(s.labels?.worlds ?? []).map((name, w) => {
                const here = s.deaths.filter((d) => d.world === w);
                const total = here.reduce((a, d) => a + d.runs, 0);
                const causes = Object.keys(s.labels?.causes ?? { spikes: 1, syrup: 1, quit: 1 });
                return [name, ...causes.map((c) => pct(here.find((d) => d.cause === c)?.runs ?? 0, total)), fmt(total)];
              })}
            />
          </Section>

          <div className="grid gap-8 lg:grid-cols-2">
            <Section id="sessions" title="Sessions">
              <div className="grid grid-cols-2 gap-3">
                <Tile label="Runs per session" value={fmt(s.sessions.runs_per_session)} />
                <Tile label="Minutes per session" value={fmt(s.sessions.minutes_per_session, 1)} />
                <Tile label="Daily challenge" value={pct(s.totals.daily_runs, s.totals.runs)} sub={`of runs, ${fmt(s.totals.daily_players)} players`} />
                <Tile label="Median frame rate" value={`${fmt(s.heights.median_fps)} fps`} />
              </div>
            </Section>
            <Section id="economy" title="Candies and wardrobe">
              <div className="grid grid-cols-2 gap-3">
                <Tile label="Candies per run" value={fmt(s.heights.candies_per_run, 1)} />
                <Tile label="Candies per hour" value={fmt(s.economy.candies_per_hour)} />
              </div>
              <div className="space-y-1.5">
                {s.economy.top.slice(0, 8).map((p) => (
                  <Bar key={p.item} label={s.labels?.items?.[p.item] ?? humanize(p.item)} value={p.count} max={s.economy.top[0]?.count ?? 1} text={fmt(p.count)} tone="amber" />
                ))}
              </div>
            </Section>
          </div>

          <Section id="versions" title="Versions" note="Every build compared: how high players climb and how many come back the next day.">
            <Table
              head={["Build", "Players", "Runs", "Median height", "Median run", "Day 1 return"]}
              rows={s.builds.map((b) => {
                const r = s.retention.byBuild.find((x) => x.build === b.build);
                return [b.build ?? "?", fmt(b.installs), fmt(b.runs), `${fmt(b.medianM)} m`, minutes(b.medianTime), r?.d1 === null || r?.d1 === undefined ? "–" : `${r.d1}%`];
              })}
            />
          </Section>

          <div className="grid gap-8 lg:grid-cols-2">
            <Section id="platforms" title="Platforms">
              <Table head={["Platform", "Players", "Median fps"]} rows={s.platforms.map((p) => [p.platform === "ios" ? "iOS" : p.platform === "android" ? "Android" : p.platform, fmt(p.installs), fmt(p.medianFps)])} />
            </Section>
            <Section id="achievements" title="Achievements" note="Share of players who unlocked each one.">
              <div className="space-y-1.5">
                {s.achievements.slice(0, 12).map((a) => (
                  <Bar key={a.id} label={s.labels?.achievements?.[a.id] ?? humanize(a.id)} value={a.installs} max={players} text={pct(a.installs, players)} tone="rose" />
                ))}
              </div>
            </Section>
          </div>
        </>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        Collected only from players who agreed in the game. See the{" "}
        <Link href={`/apps/${app.slug}/privacy-policy`} className="underline underline-offset-4">
          privacy policy
        </Link>
        .
      </p>
    </article>
  );
}
