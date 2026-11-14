import Link from "next/link";
export const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-700">{children}</p>;
export const Section = ({ children, dark, tint, id }: { children: React.ReactNode; dark?: boolean; tint?: boolean; id?: string }) => (
  <section id={id} className={dark ? "bg-ink text-white" : tint ? "bg-white" : ""}><div className="mx-auto max-w-6xl px-4 py-16 md:py-20">{children}</div></section>
);
export function Faq({ items }: { items: [string, string][] }) {
  return <div className="mt-8 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">{items.map(([q, a]) => (
    <details key={q} className="group p-5"><summary className="cursor-pointer font-display text-lg font-bold">{q}</summary><p className="mt-2 text-sm leading-relaxed text-ink/80">{a}</p></details>))}</div>;
}
export function CtaBand({ title = "Find out what your calls are really telling you", sub = "Create a free workspace and add your first call in minutes." }: { title?: string; sub?: string }) {
  return (
    <section className="bg-gradient-to-r from-violet-700 to-pink-500 text-white"><div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h2 className="mx-auto max-w-2xl text-3xl font-bold uppercase md:text-4xl">{title}</h2><p className="mx-auto mt-3 max-w-xl text-white/90">{sub}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/signup" className="btn bg-white text-ink hover:bg-violet-100">Start free</Link><Link href="/contact" className="btn border border-white/60 text-white hover:bg-white/10">Talk to us</Link></div>
    </div></section>
  );
}
export function Steps({ items }: { items: [string, string][] }) {
  return <ol className="mt-10 grid gap-6 md:grid-cols-4">{items.map(([t, d], i) => (
    <li key={t} className="relative"><span className="font-display text-5xl font-bold text-pink-400">{i + 1}</span><h3 className="mt-1 text-lg font-bold">{t}</h3><p className="mt-1 text-sm opacity-85">{d}</p></li>))}</ol>;
}
