import Link from "next/link";
import { Marketing } from "@/components/shell";
import { Eyebrow, Section, Faq, CtaBand, Steps } from "@/components/sections";
import { DeepDive, StatStrip, Mock, Bar } from "@/components/deepdive";
import { Mic, Gauge, TrendingUp, GraduationCap, ShieldCheck, Calculator, Users, FileText, Target, AlertTriangle, Briefcase, Search, Layers, Lock } from "lucide-react";

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
const day = [
  ["Monday", "Open Deals. Sort by health, and read the reasons beside each low score."],
  ["Tuesday", "Add last week's calls. Review calculated metrics and AI-flagged objections."],
  ["Wednesday", "Open Coaching. Compare talk ratio and next-step rate across reps."],
  ["Thursday", "Check the Forecast. Compare weighted value with at-risk value by stage."],
  ["Friday", "Update champions and next steps on each deal so next week's scores are accurate."],
];
const beforeAfter = [
  ["Reviewing a few calls a week", "Metrics on every call you add"],
  ["Stage-only forecasting", "Forecast plus health-scored, at-risk value"],
  ["Objections remembered, roughly", "Objections listed with quoted evidence"],
  ["Coaching from anecdotes", "Coaching from rep-level averages"],
  ["Next steps lost in notes", "Action items extracted per call"],
];
const faqs: [string, string][] = [
  ["Does CallCompass record my calls?", "Not yet. You add a transcript by pasting it or uploading a text file, using the output of whichever recording or transcription tool you already use. Native recording and CRM sync are not part of this release."],
  ["Which numbers are calculated and which come from AI?", "Talk ratio, question counts, filler rate, deal health and the forecast are all computed by code from your data. AI is used only to summarise a call, surface objections with quoted evidence, flag risks and suggest coaching, and it is labelled as such."],
  ["Can AI results be wrong?", "Yes. AI output is shown next to the transcript so you can check it. It is instructed to use only what was said, but you should treat it as a starting point for review."],
  ["Is my data separated from other customers?", "Every record belongs to a workspace and is protected by database row-level security, so one workspace cannot read another's calls or deals."],
  ["How does billing work?", "You upgrade through a secure payment link. Your plan changes only after the payment is confirmed on our side, not when you return from checkout."],
  ["What transcript format do you need?", "One speaker turn per line, written as “Name: text”. Most transcription exports convert to this quickly."],
  ["Who is CallCompass for?", "Small and mid-sized B2B sales teams, revenue operations and enablement leads who want evidence-based pipeline reviews and coaching."],
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
          <Mock title="Example call · Discovery">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[["57%", "Rep talk"], ["9", "Questions"], ["Yes", "Next step"]].map(([v, l]) => <div key={l} className="rounded-xl bg-violet-50 p-3"><p className="font-display text-2xl font-bold">{v}</p><p className="text-xs text-ink/70">{l}</p></div>)}
            </div>
            <Bar pct={57} label="Rep talk share" />
            <p className="rounded-lg bg-amber-50 p-3"><strong>Risk flagged:</strong> “legal must approve” — no owner or date agreed.</p>
          </Mock>
        </div>
      </section>

      <Section tint>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-ink/60">Built around how revenue teams actually work</p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-3 font-display text-lg font-bold text-ink/50">
          {["Discovery calls", "Demos", "Renewals", "QBRs", "Negotiations", "Pipeline reviews"].map((t) => <span key={t}>{t}</span>)}
        </div>
      </Section>

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

      <DeepDive eyebrow="Call intelligence" title="Hear every conversation, not just the ones you attend" body="Add a transcript and CallCompass breaks the call down into numbers you can compare across reps, deals and weeks." points={["Talk ratio for every speaker", "Questions, filler rate and longest monologue", "Next-step, pricing and competitor signals", "Link calls to the deals they belong to"]}>
        <Mock title="Speaker breakdown"><Bar pct={57} label="Alex (rep)" /><Bar pct={43} label="Sam (buyer)" /><p>Questions: <strong>Alex 7 · Sam 2</strong></p><p>Longest turn: <strong>58 words</strong></p></Mock>
      </DeepDive>
      <div className="bg-white"><DeepDive flip eyebrow="Deal health" title="A pipeline that tells you why a deal is slipping" body="Every opportunity gets a score from 0 to 100 and a plain-language list of what is dragging it down." points={["Champion and next-step tracking", "Flags for stale contact and overdue close dates", "At-risk value surfaced on the dashboard", "No black box: every deduction is listed"]}>
        <Mock title="Acme · Platform renewal"><p className="font-display text-4xl font-bold text-red-700">35</p><ul className="list-disc space-y-1 pl-5"><li>No champion identified</li><li>No agreed next step</li><li>No contact for 19 days</li></ul></Mock>
      </DeepDive></div>
      <DeepDive eyebrow="Forecast" title="A forecast you can explain line by line" body="See open pipeline, stage-weighted value and at-risk revenue side by side, so you know how much of the number depends on deals in trouble." points={["Fixed, visible stage probabilities", "Breakdown by stage with counts and values", "Closed-won totals alongside open value", "Calculated from your deal records"]}>
        <Mock title="Forecast"><div className="grid grid-cols-3 gap-2 text-center">{[["$412k", "Open"], ["$161k", "Weighted"], ["$74k", "At risk"]].map(([v, l]) => <div key={l} className="rounded-xl bg-violet-50 p-3"><p className="font-display text-xl font-bold">{v}</p><p className="text-xs">{l}</p></div>)}</div></Mock>
      </DeepDive>
      <div className="bg-white"><DeepDive flip eyebrow="Coaching" title="Coach on patterns, not anecdotes" body="Rep scorecards average the metrics across every call, so managers can see who needs help with listening, discovery or closing the loop." points={["Average talk ratio and question rate per rep", "Next-step rate across calls", "Guideline highlights for talkative calls", "AI coaching notes grounded in the transcript"]}>
        <Mock title="Rep scorecard"><Bar pct={62} label="Avg talk · Jordan" /><Bar pct={48} label="Avg talk · Priya" /><Bar pct={80} label="Next-step rate · Priya" /></Mock>
      </DeepDive></div>

      <Section>
        <Eyebrow>Before and after</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">What changes when calls become data</h2>
        <div className="mt-8 grid gap-3">{beforeAfter.map(([a, b]) => <div key={a} className="grid items-center gap-2 rounded-2xl border border-ink/10 bg-white p-4 text-sm sm:grid-cols-2"><p className="text-ink/60 line-through">{a}</p><p className="font-semibold">→ {b}</p></div>)}</div>
      </Section>

      <Section dark>
        <StatStrip items={[["6", "call metrics on every transcript"], ["4", "connected modules"], ["0–100", "transparent deal health score"], ["100%", "calculated numbers, never AI-invented"]]} />
      </Section>

      <Section>
        <Eyebrow>What we measure</Eyebrow>
        <h2 className="max-w-3xl text-3xl font-bold uppercase md:text-4xl">Metrics you can verify</h2>
        <p className="mt-3 max-w-2xl text-ink/80">Every number below is calculated directly from the transcript you provide, so you can check it against the source.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{metrics.map(([t, d]) => <div key={t} className="card"><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
        <Link href="/resources" className="mt-6 inline-block font-semibold text-violet-700 underline">Read the full metrics glossary →</Link>
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
          <Mock title="AI analysis">
            <p><strong>Customer pains:</strong> forecast keeps slipping; reps do not log calls.</p>
            <p><strong>Objection:</strong> “we already use another tool” — <span className="text-red-700">needs work</span>.</p>
            <p><strong>Action item:</strong> Alex to hold a follow-up on Thursday.</p>
          </Mock>
        </div>
      </Section>

      <Section>
        <Eyebrow>Who it is for</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Built for the whole revenue team</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{roles.map(([t, d]) => <div key={t} className="card"><h3 className="text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
        <Link href="/solutions" className="mt-6 inline-block font-semibold text-violet-700 underline">See solutions by role →</Link>
      </Section>

      <Section tint>
        <Eyebrow>A week with CallCompass</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">A simple weekly rhythm</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-5">{day.map(([d, t]) => <div key={d} className="card"><p className="font-display text-lg font-bold text-pink-600">{d}</p><p className="mt-1 text-sm text-ink/80">{t}</p></div>)}</div>
      </Section>

      <Section>
        <Eyebrow>Under the hood</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Designed for trustworthy answers</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[[Search, "Evidence first", "Objections include the quoted sentence so you can verify them."], [Layers, "Connected data", "Calls, deals, forecast and coaching share one record."], [Briefcase, "Workspace model", "Each team gets its own isolated workspace."], [Lock, "Private by default", "Row-level security protects every table."]].map(([I, t, d]: any) => <div key={t} className="card"><I className="h-6 w-6 text-pink-500" aria-hidden /><h3 className="mt-3 font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}
        </div>
      </Section>

      <Section dark>
        <div className="grid gap-8 md:grid-cols-3">
          {[["Workspace isolation", "Row-level security keeps each workspace's calls and deals private to its members."], ["Server-side secrets", "Service keys and AI credentials never reach the browser."], ["Verified billing", "Plans change only after payment is confirmed, never from a redirect."]].map(([t, d]) => <div key={t}><ShieldCheck className="h-7 w-7 text-pink-400" aria-hidden /><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-1 text-sm opacity-85">{d}</p></div>)}
        </div>
      </Section>

      <Section>
        <Eyebrow>Plans</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Start free, grow when you are ready</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[["Explorer", "$0", "5 calls a month with calculated metrics, deals and forecast."], ["Navigator", "$49/mo", "50 calls a month plus AI summaries, risks and action items."], ["Captain", "$149/mo", "500 calls a month for teams with a weekly review cadence."]].map(([n, p, d]) => <div key={n} className="card"><h3 className="text-xl font-bold">{n}</h3><p className="font-display text-3xl font-bold">{p}</p><p className="mt-2 text-sm text-ink/80">{d}</p></div>)}
        </div>
        <Link href="/pricing" className="btn-pink mt-6">Compare plans</Link>
      </Section>

      <Section tint>
        <Eyebrow>Questions</Eyebrow>
        <h2 className="text-3xl font-bold uppercase md:text-4xl">Frequently asked</h2>
        <Faq items={faqs} />
      </Section>
      <CtaBand />
    </Marketing>
  );
}
