import { getCtx } from "@/lib/session";
import { PLANS, type PlanId } from "@/lib/plans";
export default async function Billing() {
  const { org, plan, used } = await getCtx();
  const pct = Math.min(100, Math.round((used / plan.callsPerMonth) * 100));
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <section className="card"><p className="text-sm text-ink/70">Current plan</p><p className="text-2xl font-bold">{plan.name} <span className="text-sm font-normal">({org.subscription_status === "none" ? "no subscription" : org.subscription_status})</span></p>
        <div className="mt-3"><div className="flex justify-between text-sm"><span>Calls this month</span><span>{used} / {plan.callsPerMonth}</span></div><div className="mt-1 h-2 rounded bg-violet-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div className="h-2 rounded bg-pink-500" style={{ width: `${pct}%` }} /></div></div></section>
      <div className="grid gap-4 md:grid-cols-2">{(["starter", "growth"] as PlanId[]).map((id) => { const p = PLANS[id]; return (
        <div key={id} className="card"><h2 className="text-xl font-bold">{p.name} — {p.price}</h2><ul className="mt-2 text-sm">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
          {org.plan === id ? <p className="mt-3 text-sm font-medium">Your current plan</p>
            : p.link ? <a className="btn-pink mt-4" href={`${p.link}${p.link.includes("?") ? "&" : "?"}client_reference_id=${org.id}`}>{org.plan === "free" ? "Upgrade" : "Switch"} to {p.name}</a>
            : <p className="mt-3 text-sm text-amber-800">Payment link not configured yet (set NEXT_PUBLIC_PAYMENT_LINK_{id.toUpperCase()}).</p>}</div>); })}</div>
      <p className="text-xs text-ink/60">Plan changes apply only after payment is confirmed by our billing webhook, not when you return from checkout. Workspace ID for support: {org.id}</p>
    </div>
  );
}
