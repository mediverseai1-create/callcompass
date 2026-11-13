import Link from "next/link";
import { Marketing } from "@/components/shell";
import { PLANS, type PlanId } from "@/lib/plans";
export const metadata = { title: "Pricing — CallCompass" };
export default function Pricing() {
  return (
    <Marketing>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold uppercase">Pricing</h1>
        <p className="mt-2 text-ink/80">Start free. Upgrade when your team is ready for AI analysis and more calls.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {(Object.keys(PLANS) as PlanId[]).map((id) => { const p = PLANS[id]; return (
            <div key={id} className={`card flex flex-col ${id === "starter" ? "border-pink-500 ring-1 ring-pink-500" : ""}`}>
              <h2 className="text-xl font-bold">{p.name}</h2><p className="mt-1 text-3xl font-bold">{p.price}</p><p className="mt-2 text-sm text-ink/80">{p.blurb}</p>
              <ul className="mt-4 flex-1 space-y-1 text-sm">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
              <Link href="/signup" className={`${id === "starter" ? "btn-pink" : "btn-ghost"} mt-5`}>{id === "free" ? "Start free" : "Sign up, then upgrade"}</Link>
            </div>); })}
        </div>
      </div>
    </Marketing>
  );
}
