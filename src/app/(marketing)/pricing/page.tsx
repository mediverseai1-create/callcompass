import Link from "next/link";
import { Marketing } from "@/components/shell";
import { Section, Faq, CtaBand, Eyebrow } from "@/components/sections";
import { PLANS, type PlanId } from "@/lib/plans";
export const metadata = { title: "Pricing — CallCompass" };
const rows: [string, string, string, string][] = [
  ["Calls per month", "5", "50", "500"], ["Calculated call metrics", "✓", "✓", "✓"], ["Deal tracker and health scores", "✓", "✓", "✓"],
  ["Pipeline forecast", "✓", "✓", "✓"], ["Coaching scorecards", "✓", "✓", "✓"], ["AI summaries, objections and risks", "—", "✓", "✓"],
];
export default function Pricing() {
  return (
    <Marketing>
      <section className="bg-gradient-to-br from-violet-50 to-violet-100"><div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <Eyebrow>Pricing</Eyebrow><h1 className="text-4xl font-bold uppercase md:text-5xl">Simple plans that scale with your calls</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/80">Start free. Upgrade when your team is ready for AI analysis and more volume.</p>
      </div></section>
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(PLANS) as PlanId[]).map((id) => { const p = PLANS[id]; return (
            <div key={id} className={`card flex flex-col ${id === "starter" ? "border-pink-500 ring-1 ring-pink-500" : ""}`}>
              {id === "starter" && <p className="mb-2 text-xs font-bold uppercase tracking-wide text-pink-600">Most popular</p>}
              <h2 className="text-xl font-bold">{p.name}</h2><p className="mt-1 font-display text-4xl font-bold">{p.price}</p><p className="mt-2 text-sm text-ink/80">{p.blurb}</p>
              <ul className="mt-4 flex-1 space-y-1 text-sm">{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
              <Link href="/signup" className={`${id === "starter" ? "btn-pink" : "btn-ghost"} mt-5`}>{id === "free" ? "Start free" : "Sign up, then upgrade"}</Link>
            </div>); })}
        </div>
        <div className="card mt-10 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="mb-3 text-left font-display text-xl font-bold">Compare plans</caption>
          <thead><tr><th className="py-2">Feature</th><th>Explorer</th><th>Navigator</th><th>Captain</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]} className="border-t"><td className="py-2">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody></table></div>
      </Section>
      <Section tint>
        <Eyebrow>Billing questions</Eyebrow><h2 className="text-3xl font-bold uppercase">Good to know</h2>
        <Faq items={[["How do I upgrade?", "Sign in, open Billing and choose a plan. You will be taken to a secure payment page."], ["When does my plan change?", "After the payment is confirmed on our side. Returning from the payment page does not change your plan by itself."], ["What happens at my call limit?", "Adding more calls is blocked until next month or until you upgrade. Existing calls stay available."], ["Can I cancel?", "Yes. When a subscription is cancelled, the workspace returns to the free plan and your data is kept."]]} />
      </Section>
      <CtaBand />
    </Marketing>
  );
}
