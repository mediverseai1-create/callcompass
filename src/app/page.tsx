import Link from "next/link";
import { Marketing } from "@/components/shell";
import { Mic, Gauge, TrendingUp, GraduationCap } from "lucide-react";
const features = [
  { icon: Mic, t: "Call intelligence", d: "Paste or upload a transcript and get talk ratio, questions asked, longest monologue, filler words, pricing and competitor mentions — computed, not guessed." },
  { icon: Gauge, t: "Deal health", d: "A transparent score for every opportunity based on champions, next steps, recency and call activity, with the reasons listed." },
  { icon: TrendingUp, t: "Pipeline forecast", d: "Stage-weighted forecast and at-risk revenue, calculated from your own deal data." },
  { icon: GraduationCap, t: "Coaching", d: "Rep scorecards from call metrics, plus AI-written coaching notes grounded in what was actually said." },
];
export default function Home() {
  return (
    <Marketing>
      <section className="bg-gradient-to-br from-violet-50 via-violet-100 to-pink-400/30">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-violet-700">Revenue intelligence</p>
          <h1 className="max-w-3xl text-4xl font-bold uppercase leading-tight md:text-6xl">Know where every deal is heading</h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80">CallCompass turns your sales conversations into measurable call metrics, honest deal health and a forecast your team can trust.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/signup" className="btn-pink">Start free</Link><Link href="/pricing" className="btn-ghost">See pricing</Link></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold uppercase">One workflow, from call to forecast</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map(({ icon: I, t, d }) => (
            <div key={t} className="card"><I className="h-6 w-6 text-pink-500" aria-hidden /><h3 className="mt-3 text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>
          ))}
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="text-3xl font-bold uppercase">Numbers from code. Insight from AI.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-violet-100">Every metric and forecast is deterministic. AI only summarises, flags risks and suggests coaching from the transcript you provide.</p>
          <Link href="/signup" className="btn-pink mt-6">Create your workspace</Link>
        </div>
      </section>
    </Marketing>
  );
}
