// Deterministic call metrics. AI never produces these numbers.
export type Turn = { speaker: string; text: string };
export type CallMetrics = {
  speakers: { name: string; words: number; sharePct: number; questions: number; longestMonologue: number }[];
  repTalkPct: number; totalWords: number; questionCount: number; fillerPer100: number;
  nextStepMentioned: boolean; pricingMentioned: boolean; competitorMentions: string[];
};
const FILLERS = /\b(um+|uh+|you know|basically|actually|sort of|kind of)\b/gi;
const COMPETITOR_HINT = /\b(competitor|alternative|currently using|already use|compared to)\b/i;
export function parseTranscript(t: string): Turn[] {
  const turns: Turn[] = [];
  for (const line of t.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z][\w .'-]{0,30}?)\s*:\s+(.+)$/);
    if (m) turns.push({ speaker: m[1].trim(), text: m[2].trim() });
    else if (line.trim() && turns.length) turns[turns.length - 1].text += " " + line.trim();
  }
  return turns;
}
const wc = (s: string) => (s.match(/\S+/g) ?? []).length;
export function computeMetrics(transcript: string, repName: string): CallMetrics {
  const turns = parseTranscript(transcript);
  const by = new Map<string, { words: number; questions: number; longest: number }>();
  let all = "";
  for (const t of turns) {
    const e = by.get(t.speaker) ?? { words: 0, questions: 0, longest: 0 };
    const w = wc(t.text);
    e.words += w; e.longest = Math.max(e.longest, w); e.questions += (t.text.match(/\?/g) ?? []).length;
    by.set(t.speaker, e); all += " " + t.text;
  }
  const total = [...by.values()].reduce((a, b) => a + b.words, 0);
  const div = total || 1;
  const speakers = [...by.entries()].map(([name, e]) => ({ name, words: e.words, sharePct: Math.round((e.words / div) * 100), questions: e.questions, longestMonologue: e.longest }));
  const rep = speakers.find((s) => s.name.toLowerCase() === repName.trim().toLowerCase());
  const comp = new Set<string>();
  for (const s of all.split(/(?<=[.!?])\s+/)) if (COMPETITOR_HINT.test(s)) comp.add(s.trim().slice(0, 140));
  return {
    speakers, repTalkPct: rep?.sharePct ?? 0, totalWords: total,
    questionCount: speakers.reduce((a, s) => a + s.questions, 0),
    fillerPer100: Math.round(((all.match(FILLERS)?.length ?? 0) / div) * 1000) / 10,
    nextStepMentioned: /\b(next step|follow[- ]up|schedule|book a|send (you )?(the|a)|let'?s (meet|talk|connect))\b/i.test(all),
    pricingMentioned: /\b(price|pricing|budget|cost|quote|discount|\$\d)/i.test(all),
    competitorMentions: [...comp].slice(0, 5),
  };
}
