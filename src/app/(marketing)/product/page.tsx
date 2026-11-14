import { Marketing } from "@/components/shell";
import { Eyebrow, Section, CtaBand, Faq } from "@/components/sections";
export const metadata = { title: "Product — CallCompass" };
const modules: [string, string, string[]][] = [
  ["Calls", "Turn a transcript into structured evidence.", ["Paste text or upload a .txt transcript", "Talk ratio, questions, longest turn, filler rate", "Next-step, pricing and competitor signals", "AI summary, objections with quotes, risks and action items on paid plans", "Link each call to a deal"]],
  ["Deals", "A pipeline that explains its own health.", ["Amount, stage, close date, champion and next step", "Health score from 0 to 100 with the reasons listed", "Flags for stale contact and past-due close dates", "Edit stage and signals in one click"]],
  ["Forecast", "Calculated, not hoped for.", ["Open pipeline and closed-won totals", "Stage-weighted forecast using fixed, visible probabilities", "At-risk value for deals scoring under 50", "Breakdown by stage"]],
  ["Coaching", "Patterns across every call.", ["Per-rep averages for talk ratio, questions and filler rate", "Next-step rate across calls", "Highlights reps above the talk-ratio guideline"]],
  ["Billing and usage", "Know your plan and your limits.", ["Plan, status and monthly call usage", "Upgrade through secure payment links", "Plan changes applied only after verified payment"]],
  ["Workspace settings", "Your team, your data.", ["Workspace naming and account details", "Password reset by email", "Isolated data per workspace"]],
];
const who = [["Sales leaders", "See which deals are healthy and which reps need help, without sitting in on every call."], ["RevOps", "A forecast tied to real activity rather than self-reported stages."], ["Enablement", "Coach from evidence in the conversation, and track change over time."], ["Account executives", "Prepare from summaries and never lose a commitment made on a call."]];
const roadmap = ["Native call recording and transcription", "CRM and calendar sync", "Team invitations and roles", "Email and meeting engagement tracking"];
export default function Product() {
  return (
    <Marketing>
      <section className="bg-gradient-to-br from-violet-50 via-violet-100 to-pink-400/20"><div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Eyebrow>The platform</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-bold uppercase md:text-5xl">Everything between the call and the forecast</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/80">Six connected modules that share one set of data, so a call updates what you know about the deal, and the deal updates the forecast.</p>
      </div></section>
      <Section>
        <div className="grid gap-4 md:grid-cols-2">{modules.map(([t, s, pts]) => (
          <div key={t} className="card"><h2 className="text-2xl font-bold">{t}</h2><p className="mt-1 font-medium text-violet-700">{s}</p>
            <ul className="mt-3 space-y-1 text-sm text-ink/80">{pts.map((p) => <li key={p}>✓ {p}</li>)}</ul></div>))}</div>
      </Section>
      <Section tint id="solutions">
        <Eyebrow>Solutions</Eyebrow><h2 className="text-3xl font-bold uppercase md:text-4xl">Value for every role</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">{who.map(([t, d]) => <div key={t} className="card"><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
      </Section>
      <Section>
        <Eyebrow>How deal health works</Eyebrow><h2 className="text-3xl font-bold uppercase md:text-4xl">A score you can argue with</h2>
        <p className="mt-3 max-w-2xl text-ink/80">Each deal starts at 50. Points are added or removed from signals you can see and edit, and every deduction is listed beside the score.</p>
        <div className="card mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th className="py-2">Signal</th><th>Effect</th></tr></thead><tbody>
          {[["Champion identified", "+15 (−10 if missing)"], ["Next step agreed", "+15 (−15 if missing)"], ["Two or more calls recorded", "+10"], ["No calls recorded", "−10"], ["No contact for over 14 days", "−15"], ["Close date has passed", "−10"]].map(([a, b]) => <tr key={a} className="border-t"><td className="py-2">{a}</td><td>{b}</td></tr>)}</tbody></table></div>
      </Section>
      <Section dark>
        <Eyebrow><span className="text-pink-400">Roadmap</span></Eyebrow><h2 className="text-3xl font-bold uppercase">What is not here yet</h2>
        <p className="mt-2 max-w-2xl opacity-85">We would rather be clear about the current scope. These are planned, not available today.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">{roadmap.map((r) => <li key={r} className="rounded-xl border border-white/20 p-4 text-sm">{r}</li>)}</ul>
      </Section>
      <Section><Faq items={[["What format should transcripts be in?", "One speaker turn per line, written as “Name: text”. Most transcription exports can be converted to this quickly."], ["Which plan includes AI analysis?", "Navigator and Captain. The Explorer plan includes calculated metrics only."], ["Can I link several calls to one deal?", "Yes. Each call can be linked to a deal and counts toward its health score."]]} /></Section>
      <CtaBand />
    </Marketing>
  );
}
