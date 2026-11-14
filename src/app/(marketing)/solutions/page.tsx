import { Marketing } from "@/components/shell";
import { Eyebrow, Section, CtaBand } from "@/components/sections";
export const metadata = { title: "Solutions — CallCompass" };
const roles: [string, string, string[]][] = [
  ["Sales leaders", "Know where to spend your week.", ["See which open deals score below 50 and why", "Compare reps on talk ratio and next-step rate", "Review a forecast tied to deal signals"]],
  ["Revenue operations", "A forecast you can defend.", ["Stage-weighted value with visible probabilities", "At-risk value surfaced automatically", "Consistent deal fields: champion, next step, close date"]],
  ["Enablement", "Coach from real objections.", ["Objections quoted from actual calls", "Scorecards that show change over time", "A shared glossary of what each metric means"]],
  ["Account executives", "Prepare faster, forget less.", ["AI summary of each call on paid plans", "Action items with owners", "A deal view that shows what is missing"]],
  ["Customer success", "Carry renewals and expansions with the same discipline.", ["Track renewal deals through stages", "Capture risks from QBR calls", "Spot stale accounts by days since contact"]],
  ["Founders and small teams", "Get a revenue process without a RevOps hire.", ["Free plan to start", "One place for calls, deals and forecast", "Upgrade only when volume grows"]],
];
export default function Solutions() {
  return (
    <Marketing>
      <section className="bg-gradient-to-br from-violet-50 to-pink-400/20"><div className="mx-auto max-w-6xl px-4 py-16 md:py-24"><Eyebrow>Solutions</Eyebrow><h1 className="max-w-3xl text-4xl font-bold uppercase md:text-5xl">One platform, every revenue role</h1></div></section>
      <Section>
        <div className="grid gap-4 md:grid-cols-2">{roles.map(([t, s, pts]) => <div key={t} className="card"><h2 className="text-2xl font-bold">{t}</h2><p className="mt-1 font-medium text-violet-700">{s}</p><ul className="mt-3 space-y-1 text-sm text-ink/80">{pts.map((p) => <li key={p}>✓ {p}</li>)}</ul></div>)}</div>
      </Section>
      <CtaBand />
    </Marketing>
  );
}
