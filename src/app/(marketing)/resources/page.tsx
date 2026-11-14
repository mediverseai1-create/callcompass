import { Marketing } from "@/components/shell";
import { Eyebrow, Section, CtaBand } from "@/components/sections";
export const metadata = { title: "Resources — CallCompass" };
const glossary: [string, string][] = [
  ["Talk ratio", "The share of total words spoken by one participant. CallCompass divides each speaker's word count by the total words in the transcript."],
  ["Longest monologue", "The word count of the longest single speaker turn. It flags long pitches or lectures."],
  ["Filler rate", "Filler words such as “um”, “you know” and “basically” per 100 words."],
  ["Next step", "A follow-up, meeting or deliverable proposed on the call. CallCompass detects common phrases such as “schedule” or “follow-up”."],
  ["Champion", "A person inside the buyer's company who actively supports your solution and helps move the deal."],
  ["Deal health", "A 0–100 score from champion, next step, call count, recency and close date. Every deduction is shown."],
  ["Weighted forecast", "Open deal value multiplied by a fixed stage probability, summed across the pipeline."],
  ["At-risk value", "The total value of open deals with a health score below 50."],
];
const guides: [string, string][] = [
  ["Run a weekly pipeline review from deal health", "Sort deals by health, read the listed reasons, and assign an owner and a date to every missing next step."],
  ["Coach on talk ratio without making it a rule", "Use the ratio as a conversation starter. Some calls, like demos, legitimately need more seller talk."],
  ["Turn objections into enablement", "Collect the objections AI quotes across calls, group the repeats, and rehearse answers with the team."],
  ["Prepare transcripts for fast uploads", "Export with speaker labels and save as plain text with one “Name: text” line per turn."],
];
export default function Resources() {
  return (
    <Marketing>
      <section className="bg-gradient-to-br from-violet-50 to-pink-400/20"><div className="mx-auto max-w-6xl px-4 py-16 md:py-24"><Eyebrow>Resources</Eyebrow><h1 className="text-4xl font-bold uppercase md:text-5xl">Guides and glossary</h1><p className="mt-3 max-w-2xl text-ink/80">Plain-language explanations of how CallCompass calculates what it shows.</p></div></section>
      <Section>
        <h2 className="text-3xl font-bold uppercase">Playbooks</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{guides.map(([t, d]) => <article key={t} className="card"><h3 className="text-lg font-bold">{t}</h3><p className="mt-1 text-sm text-ink/80">{d}</p></article>)}</div>
      </Section>
      <Section tint>
        <h2 className="text-3xl font-bold uppercase">Glossary</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">{glossary.map(([t, d]) => <div key={t} className="card"><dt className="font-bold">{t}</dt><dd className="mt-1 text-sm text-ink/80">{d}</dd></div>)}</dl>
      </Section>
      <CtaBand />
    </Marketing>
  );
}
