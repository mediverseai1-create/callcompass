import { Marketing } from "@/components/shell";
import { Eyebrow, Section, CtaBand } from "@/components/sections";
export const metadata = { title: "About — CallCompass" };
export default function About() {
  const values = [["Evidence over opinion", "Show the source for every claim, whether it is a calculated number or a quote from the call."], ["Honest about AI", "Use code for numbers and AI for interpretation, and label which is which."], ["Respect for data", "Keep each customer's conversations private and isolated."]];
  return (
    <Marketing>
      <section className="bg-gradient-to-br from-violet-50 to-pink-400/20"><div className="mx-auto max-w-6xl px-4 py-16 md:py-24"><Eyebrow>About</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-bold uppercase md:text-5xl">Helping revenue teams steer by what buyers actually say</h1></div></section>
      <Section>
        <div className="max-w-3xl space-y-4 text-lg text-ink/80">
          <p>CallCompass exists because the most valuable data in a sales organisation, the conversations with buyers, is also the least used. It lives in recordings and transcripts that nobody has time to review.</p>
          <p>We turn those conversations into measurable signals, connect them to the deals they belong to, and roll them up into a forecast and coaching view that leaders can inspect and challenge.</p>
        </div>
        <h2 className="mt-14 text-3xl font-bold uppercase">What we believe</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{values.map(([t, d]) => <div key={t} className="card"><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></div>)}</div>
      </Section>
      <CtaBand />
    </Marketing>
  );
}
