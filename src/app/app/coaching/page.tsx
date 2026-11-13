import { getCtx } from "@/lib/session";
export default async function Coaching() {
  const { sb } = await getCtx();
  const { data: calls } = await sb.from("calls").select("rep_name,metrics");
  const reps = new Map<string, { n: number; talk: number; q: number; filler: number; next: number }>();
  for (const c of (calls ?? []) as any[]) {
    const e = reps.get(c.rep_name) ?? { n: 0, talk: 0, q: 0, filler: 0, next: 0 };
    e.n++; e.talk += c.metrics.repTalkPct; e.q += c.metrics.questionCount; e.filler += c.metrics.fillerPer100; e.next += c.metrics.nextStepMentioned ? 1 : 0;
    reps.set(c.rep_name, e);
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Coaching</h1>
      <p className="text-sm text-ink/70">Averages across each rep’s calls. Benchmarks (rep talk under 55%, next step on most calls) are common guidelines, not guarantees.</p>
      {reps.size ? <div className="card overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th>Rep</th><th>Calls</th><th>Avg rep talk</th><th>Avg questions</th><th>Filler / 100</th><th>Next step rate</th></tr></thead>
        <tbody>{[...reps].map(([name, e]) => { const talk = Math.round(e.talk / e.n); return <tr key={name} className="border-t"><td className="py-2 font-medium">{name}</td><td>{e.n}</td><td className={talk > 55 ? "font-bold text-red-700" : ""}>{talk}%</td><td>{Math.round(e.q / e.n)}</td><td>{(e.filler / e.n).toFixed(1)}</td><td>{Math.round((e.next / e.n) * 100)}%</td></tr>; })}</tbody></table></div>
        : <div className="card text-sm">No calls yet. Scorecards appear once you add calls.</div>}
    </div>
  );
}
