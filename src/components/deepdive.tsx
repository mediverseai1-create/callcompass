import Link from "next/link";
import { Eyebrow } from "./sections";
export function DeepDive({ eyebrow, title, body, points, flip, children, id }: { eyebrow: string; title: string; body: string; points: string[]; flip?: boolean; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
      <div className={flip ? "md:order-2" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold uppercase leading-tight md:text-4xl">{title}</h2>
        <p className="mt-4 text-ink/80">{body}</p>
        <ul className="mt-5 space-y-2 text-sm">{points.map((p) => <li key={p} className="flex gap-2"><span className="text-pink-500">●</span>{p}</li>)}</ul>
        <Link href="/signup" className="mt-6 inline-block font-semibold text-violet-700 underline">Try it free →</Link>
      </div>
      <div className={flip ? "md:order-1" : ""}>{children}</div>
    </div>
  );
}
export function StatStrip({ items }: { items: [string, string][] }) {
  return <div className="grid grid-cols-2 gap-6 md:grid-cols-4">{items.map(([v, l]) => <div key={l}><p className="font-display text-5xl font-bold text-pink-400">{v}</p><p className="mt-1 text-sm opacity-85">{l}</p></div>)}</div>;
}
export function Mock({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="card space-y-3 text-sm shadow-lg"><p className="text-xs font-semibold uppercase tracking-wide text-ink/60">{title}</p>{children}<p className="text-xs text-ink/50">Illustrative sample, not customer data.</p></div>;
}
export const Bar = ({ pct, label }: { pct: number; label: string }) => (
  <div><div className="flex justify-between text-xs"><span>{label}</span><span>{pct}%</span></div><div className="mt-1 h-2 rounded-full bg-violet-100"><div className="h-2 rounded-full bg-pink-500" style={{ width: `${pct}%` }} /></div></div>
);
