import Link from "next/link";
import { Marketing } from "@/components/shell";
import { Eyebrow, Section, Faq, CtaBand, Steps } from "@/components/sections";
import { Mic, Gauge, TrendingUp, GraduationCap, ShieldCheck, Calculator, Users, FileText, Target, AlertTriangle } from "lucide-react";

const features = [
  { icon: Mic, t: "Call intelligence", d: "Paste or upload a transcript and get talk ratio, questions asked, longest monologue, filler words, and pricing and competitor mentions — calculated, not guessed." },
  { icon: Gauge, t: "Deal health", d: "A transparent score for every opportunity built from champions, next steps, recency and call activity, with the reasons spelled out." },
  { icon: TrendingUp, t: "Pipeline forecast", d: "A stage-weighted forecast and at-risk revenue, computed from your own deal data and shown by stage." },
  { icon: GraduationCap, t: "Coaching scorecards", d: "Per-rep averages across calls, so managers coach on patterns rather than on the one call they happened to hear." },
];
const problems = [
  [AlertTriangle, "Forecasts built on gut feel", "Deals sit in late stages with no champion and no agreed next step, and nobody notices until the quarter closes."],
  [Users, "Coaching that depends on memory", "Managers can review a handful of calls a week. The rest of the conversations go unheard."],
  [FileText, "Insight trapped in transcripts", "Objections, competitor mentions and commitments are buried in long conversations no one has time to reread."],
] as const;
const roles = [
  ["Sales leaders", "Spot the deals that need help this week and see which reps are talking too much, asking too little, or leaving calls without a next step."],
  ["Revenue operations", "Replace spreadsheet forecasting with a number tied to real deal signals, and see how much open value is genuinely at risk."],
  ["Enablement and coaching", "Pull real objections and evidence from calls to build coaching plans that address what reps actually face."],
  ["Account executives", "Walk into the next conversation with a clear summary, open risks and the action items you committed to."],
];
const metrics = [
  ["Talk ratio", "Share of words spoken by each person on the call. Reps who talk more than about half the time often miss what the buyer needs."],
  ["Questions asked", "Count of questions per speaker, a simple read on how much discovery happened."],
  ["Longest monologue", "The longest uninterrupted turn, in words, to flag pitches that ran on."],
  ["Filler rate", "Filler words per 100 words, useful for tracking delivery over time."],
  ["Next step signal", "Whether a follow-up or meeting was proposed before the call ended."],
  ["Pricing and competitors", "Whether budget or pricing came up, and the sentences where alternatives were mentioned."],
];
const faqs: [string, string][] = [
  ["Does CallCompass record my calls?", "Not yet. You add a transcript by pasting it or uploading a text file, using the output of whichever recording or transcription tool you already use. Native recording and CRM sync are not part of this release."],
  ["Which numbers are calculated and which come from AI?", "Talk ratio, question counts, filler rate, deal health and the forecast are all computed by code from your data. AI is used only to summarise a call, surface objections with quoted evidence, flag risks and suggest coaching, and it is labelled as such."],
  ["Can AI results be wrong?", "Yes. AI output is shown next to the transcript so you can check it. It is instructed to use only what was said, but you should treat it as a starting point for review."],
  ["Is my data separated from other customers?", "Every record belongs to a workspace and is protected by database row-level security, so one workspace cannot read another's calls or deals."],
  ["How does billing work?", "You upgrade through a secure payment link. Your plan changes only after the payment is confirmed on our side, not when you return from checkout."],
  ["Is CallCompass affiliated with other revenue intelligence vendors?", "No. CallCompass is an independent product."],
];

export default function Home() {
  return (
    <Marketing>
      <section className="bg-gradient-to-br from-violet-50 via-violet-100 to-pink-400/30">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <Eyebrow>Revenue intelligence</Eyebrow>
            <h1 className="text-4xl font-bold uppercase leading-tight md:text-6xl">Know where every deal is heading</h1>
            <p className="mt-6 max-w-xl text-lg text-ink/80">CallCompass turns your sales conversations into measurable call metrics, honest deal health and a forecast your team can trust.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className="btn-pink">Start free</Link><Link href="/product" className="btn-ghost">Explore the product</Link></div>
            <p className="mt-4 text-sm text-ink/60">Free plan includes 5 calls a month. No card required.</p>
          </div>
          <div className="card shadow-xl" aria-label="Example call metrics">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">Example call · Discovery</p>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              {[["57%", "Rep talk"], ["9", "Questions"], ["Yes", "Next step"]].map(([v, l]) => <div key={l} className="rounded-xl bg-violet-50 p-3"><p className="font-display text-2xl font-bold">{v}</p><p className="text-xs text-ink/70">{l}</p></div>)}
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-violet-100"><div className="h-3 w-[57%] bg-pink-500" /></div>
            <p className="mt-1 text-xs text-ink/60">Rep 57% · Buyer 43%</p>
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm"><strong>Risk flagged:</strong> “legal must approve” — no owner or date agreed.</p>
            <p className="mt-2 text-xs text-ink/50">Illustrative sample, not customer data.</p>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>The problem</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-bold uppercase md:text-4xl">Most of what buyers tell you never makes it into the forecast</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{problems.map(([I, t, d]) => <div key={t} className="card"><I className="h-6 w-6 text-pink-500" aria-hidden /><h3 className="mt-3 text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
      </Section>

      <Section tint>
        <Eyebrow>One connected workflow</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">From conversation to forecast</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map(({ icon: I, t, d }) => <div key={t} className="card"><I className="h-6 w-6 text-pink-500" aria-hidden /><h3 className="mt-3 text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}
        </div>
      </Section>

      <Section dark>
        <Eyebrow><span className="text-pink-400">How it works</span></Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Up and running in four steps</h2>
        <Steps items={[["Create a workspace", "Sign up and your team workspace is ready immediately."], ["Add a call", "Paste a transcript or upload a text file and link it to a deal."], ["Review the analysis", "See calculated metrics at once, and AI findings on paid plans."], ["Act on the pipeline", "Check deal health, the forecast and rep scorecards each week."]]} />
      </Section>

      <Section>
        <Eyebrow>What we measure</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-bold uppercase md:text-4xl">Metrics you can verify</h2>
        <p className="mt-3 max-w-2xl text-ink/80">Every number below is calculated directly from the transcript you provide, so you can check it against the source.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{metrics.map(([t, d]) => <div key={t} className="card"><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
      </Section>

      <Section tint>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>AI with guardrails</Eyebrow>
            <h2 className="text-3xl font-bold uppercase md:text-4xl">Numbers from code. Insight from AI.</h2>
            <p className="mt-4 text-ink/80">Precision-sensitive figures are never left to a language model. AI reads the transcript and explains what happened, then its answer is checked against a fixed structure before it reaches you.</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[[Calculator, "Deterministic metrics, deal health and forecast"], [Target, "Objections shown with the quoted evidence"], [ShieldCheck, "Clear labels on what is AI judgement"]].map(([I, t]: any) => <li key={t} className="flex items-center gap-3"><I className="h-5 w-5 text-pink-500" aria-hidden />{t}</li>)}
            </ul>
          </div>
          <div className="card space-y-3 text-sm">
            <p className="font-display text-lg font-bold">AI analysis</p>
            <p><strong>Customer pains:</strong> forecast keeps slipping; reps do not log calls.</p>
            <p><strong>Objection:</strong> “we already use another tool” — <span className="text-red-700">needs work</span>.</p>
            <p><strong>Action item:</strong> Alex to hold a follow-up on Thursday.</p>
            <p className="text-xs text-ink/50">Illustrative sample output.</p>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Who it is for</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Built for the whole revenue team</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{roles.map(([t, d]) => <div key={t} className="card"><h3 className="text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
      </Section>

      <Section dark>
        <div className="grid gap-8 md:grid-cols-3">
          {[["Workspace isolation", "Row-level security keeps each workspace's calls and deals private to its members."], ["Server-side secrets", "Service keys and AI credentials never reach the browser."], ["Verified billing", "Plans change only after payment is confirmed, never from a redirect."]].map(([t, d]) => <div key={t}><ShieldCheck className="h-7 w-7 text-pink-400" aria-hidden /><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-1 text-sm opacity-85">{d}</p></div>)}
        </div>
      </Section>

      <Section>
        <Eyebrow>Questions</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Frequently asked</h2>
        <Faq items={faqs} />
      </Section>
      <CtaBand />
    </Marketing>
  );
}
