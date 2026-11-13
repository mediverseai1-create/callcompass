import { Marketing } from "@/components/shell";
const modules = [
  ["Calls", "Add a transcript with speaker lines. We compute talk ratio, questions, monologues, filler rate, next-step and pricing signals, then (on paid plans) add an AI summary, objections with evidence, risks and action items."],
  ["Deals", "Track amount, stage, close date, champion and next step. Health scores explain themselves."],
  ["Forecast", "Open pipeline, stage-weighted forecast and at-risk value, calculated deterministically."],
  ["Coaching", "Per-rep averages across calls with benchmarks for talk ratio and question rate."],
  ["Billing", "Plan, usage against limits and upgrade options in one place."],
];
const who = [["Sales leaders", "See which deals are healthy and which reps need help."], ["RevOps", "A forecast tied to real activity, not hope."], ["Enablement", "Coach from evidence in the conversation."]];
export default function Product() {
  return (
    <Marketing>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold uppercase">The CallCompass platform</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{modules.map(([t, d]) => <div key={t} className="card"><h2 className="text-xl font-bold">{t}</h2><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
        <h2 id="solutions" className="mt-14 text-3xl font-bold uppercase">Solutions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{who.map(([t, d]) => <div key={t} className="card"><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm">{d}</p></div>)}</div>
      </div>
    </Marketing>
  );
}
