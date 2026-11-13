import Link from "next/link";
import { getCtx } from "@/lib/session";
import { loadDeals, forecast } from "@/lib/data";
import { money } from "@/lib/deals";
export default async function Dashboard() {
  const { sb, plan, used } = await getCtx();
  const deals = await loadDeals(sb);
  const f = forecast(deals);
  const { data: calls } = await sb.from("calls").select("id,title,rep_name,call_date,metrics").order("created_at", { ascending: false }).limit(5);
  const risky = deals.filter((d) => !["won", "lost"].includes(d.stage) && d.health.score < 50).slice(0, 5);
  const stats = [["Open pipeline", money(f.openValue)], ["Weighted forecast", money(f.weighted)], ["At-risk value", money(f.atRisk)], ["Calls this month", `${used} / ${plan.callsPerMonth}`]];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([l, v]) => <div key={l} className="card"><p className="text-sm text-ink/70">{l}</p><p className="mt-1 text-2xl font-bold">{v}</p></div>)}</div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card"><h2 className="font-bold">Recent calls</h2>
          {calls?.length ? <ul className="mt-3 divide-y">{calls.map((c: any) => <li key={c.id} className="py-2 text-sm"><Link href={`/app/calls/${c.id}`} className="font-medium underline">{c.title}</Link> <span className="text-ink/60">· {c.rep_name} · rep talk {c.metrics?.repTalkPct ?? 0}%</span></li>)}</ul>
            : <p className="mt-3 text-sm text-ink/70">No calls yet. <Link href="/app/calls/new" className="underline">Add your first call</Link> to see metrics here.</p>}
        </section>
        <section className="card"><h2 className="font-bold">Deals needing attention</h2>
          {risky.length ? <ul className="mt-3 divide-y">{risky.map((d) => <li key={d.id} className="py-2 text-sm"><span className="font-medium">{d.company}</span> — score {d.health.score}: {d.health.why.join(", ")}</li>)}</ul>
            : <p className="mt-3 text-sm text-ink/70">Nothing flagged. <Link href="/app/deals" className="underline">Add deals</Link> to track their health.</p>}
        </section>
      </div>
    </div>
  );
}
