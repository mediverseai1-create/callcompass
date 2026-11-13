import { getCtx } from "@/lib/session";
import { loadDeals, forecast } from "@/lib/data";
import { STAGES, STAGE_PROB, money } from "@/lib/deals";
export default async function Forecast() {
  const { sb } = await getCtx();
  const deals = await loadDeals(sb);
  const f = forecast(deals);
  const rows = STAGES.map((s) => { const ds = deals.filter((d) => d.stage === s); const v = ds.reduce((a, d) => a + d.amount, 0); return { s, n: ds.length, v, w: Math.round(v * STAGE_PROB[s]) }; });
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Forecast</h1>
      <div className="grid gap-4 sm:grid-cols-4">{[["Open pipeline", money(f.openValue)], ["Weighted forecast", money(f.weighted)], ["At-risk (health < 50)", money(f.atRisk)], ["Closed won", money(f.won)]].map(([l, v]) => <div key={l} className="card"><p className="text-sm text-ink/70">{l}</p><p className="text-2xl font-bold">{v}</p></div>)}</div>
      <div className="card overflow-x-auto"><table className="w-full text-left text-sm"><caption className="mb-2 text-left font-bold">By stage</caption><thead><tr><th>Stage</th><th>Deals</th><th>Probability</th><th>Value</th><th>Weighted</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.s} className="border-t"><td className="py-2 capitalize">{r.s}</td><td>{r.n}</td><td>{STAGE_PROB[r.s] * 100}%</td><td>{money(r.v)}</td><td>{money(r.w)}</td></tr>)}</tbody></table>
        <p className="mt-3 text-xs text-ink/60">Weighted forecast = deal value × fixed stage probability. Probabilities are defaults, not learned from your history.</p></div>
    </div>
  );
}
