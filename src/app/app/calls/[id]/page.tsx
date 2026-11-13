import { notFound } from "next/navigation";
import { getCtx } from "@/lib/session";
import { AnalysisSchema } from "@/lib/ai";
import type { CallMetrics } from "@/lib/analysis";
const List = ({ items }: { items: string[] }) => items.length ? <ul className="list-disc space-y-1 pl-5 text-sm">{items.map((i, k) => <li key={k}>{i}</li>)}</ul> : <p className="text-sm text-ink/60">None found.</p>;
export default async function CallDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { sb } = await getCtx();
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { data: c } = await sb.from("calls").select("*").eq("id", id).maybeSingle();
  if (!c) notFound();
  const m = c.metrics as CallMetrics;
  const ai = AnalysisSchema.safeParse(c.ai_analysis);
  return (
    <div className="max-w-4xl space-y-6">
      <div><h1 className="text-3xl font-bold">{c.title}</h1><p className="text-sm text-ink/70">{c.rep_name} · {c.call_date}</p></div>
      <section aria-labelledby="m" className="card"><h2 id="m" className="font-bold">Call metrics <span className="text-xs font-normal text-ink/60">(calculated)</span></h2>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {[["Rep talk", `${m.repTalkPct}%`], ["Questions", m.questionCount], ["Filler / 100 words", m.fillerPer100], ["Words", m.totalWords], ["Next step", m.nextStepMentioned ? "Yes" : "No"], ["Pricing discussed", m.pricingMentioned ? "Yes" : "No"]].map(([k, v]) => <div key={String(k)}><dt className="text-ink/60">{k}</dt><dd className="text-lg font-bold">{v}</dd></div>)}
        </dl>
        <table className="mt-4 w-full text-left text-sm"><thead><tr><th>Speaker</th><th>Share</th><th>Questions</th><th>Longest turn (words)</th></tr></thead><tbody>{m.speakers.map((s) => <tr key={s.name} className="border-t"><td className="py-1">{s.name}</td><td>{s.sharePct}%</td><td>{s.questions}</td><td>{s.longestMonologue}</td></tr>)}</tbody></table>
        {m.competitorMentions.length > 0 && <div className="mt-3 text-sm"><p className="font-medium">Competitor / alternative mentions</p><List items={m.competitorMentions} /></div>}
      </section>
      <section className="card"><h2 className="font-bold">AI analysis</h2>
        {c.ai_status === "done" && ai.success ? (
          <div className="mt-3 space-y-4"><p className="text-sm">{ai.data.summary}</p><p className="text-sm font-medium">Rep score: {ai.data.rep_score}/10 <span className="font-normal text-ink/60">(AI judgement, not a calculated metric)</span></p>
            <div><h3 className="font-medium">Customer pains</h3><List items={ai.data.customer_pains} /></div>
            <div><h3 className="font-medium">Objections</h3><List items={ai.data.objections.map((o) => `${o.objection} — ${o.handled_well ? "handled well" : "needs work"}. “${o.evidence}”`)} /></div>
            <div><h3 className="font-medium">Risks</h3><List items={ai.data.risks} /></div>
            <div><h3 className="font-medium">Action items</h3><List items={ai.data.action_items.map((a) => `${a.owner}: ${a.task}`)} /></div>
            <div><h3 className="font-medium">Coaching</h3><List items={ai.data.coaching} /></div></div>
        ) : <p className="mt-2 text-sm text-ink/70">{c.ai_status === "failed" ? "AI analysis failed or is not configured for this workspace. Metrics above are unaffected." : "AI analysis is available on paid plans."}</p>}
      </section>
      <details className="card"><summary className="cursor-pointer font-bold">Transcript</summary><pre className="mt-3 whitespace-pre-wrap text-sm">{c.transcript}</pre></details>
    </div>
  );
}
