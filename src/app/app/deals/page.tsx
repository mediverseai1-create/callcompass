import { getCtx } from "@/lib/session";
import { loadDeals } from "@/lib/data";
import { STAGES, money } from "@/lib/deals";
import { createDeal, updateDeal, deleteDeal } from "../../actions";
export default async function Deals({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const { sb } = await getCtx();
  const deals = await loadDeals(sb);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Deals</h1>
      {error && <p role="alert" className="rounded bg-red-100 p-2 text-sm text-red-800">{error}</p>}
      <form action={createDeal} className="card grid gap-3 sm:grid-cols-6">
        <div className="sm:col-span-2"><label className="label" htmlFor="name">Deal name</label><input id="name" name="name" required className="input" /></div>
        <div><label className="label" htmlFor="company">Company</label><input id="company" name="company" required className="input" /></div>
        <div><label className="label" htmlFor="amount">Amount (USD)</label><input id="amount" name="amount" type="number" min="0" step="1" required className="input" /></div>
        <div><label className="label" htmlFor="stage">Stage</label><select id="stage" name="stage" className="input">{STAGES.map((s) => <option key={s}>{s}</option>)}</select></div>
        <div><label className="label" htmlFor="close_date">Close date</label><input id="close_date" name="close_date" type="date" className="input" /></div>
        <div className="sm:col-span-6"><button className="btn-pink">Add deal</button></div>
      </form>
      {deals.length ? (
        <div className="space-y-3">{deals.map((d) => (
          <div key={d.id} className="card">
            <div className="flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-bold">{d.company} — {d.name}</h2><p className="font-bold">{money(d.amount)}</p></div>
            <p className="mt-1 text-sm">Health <strong className={d.health.score < 50 ? "text-red-700" : "text-green-700"}>{d.health.score}</strong> · {d.callCount} calls{d.close_date ? ` · closes ${d.close_date}` : ""}{d.health.why.length ? ` · ${d.health.why.join("; ")}` : ""}</p>
            <form action={updateDeal} className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <input type="hidden" name="id" value={d.id} />
              <select name="stage" defaultValue={d.stage} aria-label="Stage" className="input w-auto">{STAGES.map((s) => <option key={s}>{s}</option>)}</select>
              <label className="flex items-center gap-1"><input type="checkbox" name="has_champion" defaultChecked={d.has_champion} />Champion</label>
              <label className="flex items-center gap-1"><input type="checkbox" name="has_next_step" defaultChecked={d.has_next_step} />Next step agreed</label>
              <button className="btn-ghost">Save</button>
              <button formAction={deleteDeal} className="text-red-700 underline">Delete</button>
            </form>
          </div>))}</div>
      ) : <div className="card text-sm">No deals yet. Add one above to start tracking health and forecast.</div>}
    </div>
  );
}
