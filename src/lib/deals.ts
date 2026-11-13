export const STAGES = ["discovery", "evaluation", "proposal", "negotiation", "won", "lost"] as const;
export const STAGE_PROB: Record<string, number> = { discovery: 0.1, evaluation: 0.25, proposal: 0.5, negotiation: 0.75, won: 1, lost: 0 };
export type DealRow = { id: string; name: string; company: string; amount: number; stage: string; close_date: string | null; has_champion: boolean; has_next_step: boolean; created_at: string };
// Transparent health score (0-100) from recorded signals.
export function dealHealth(d: DealRow, callCount: number, daysSinceLastCall: number | null) {
  let s = 50; const why: string[] = [];
  if (d.has_champion) s += 15; else { s -= 10; why.push("No champion identified"); }
  if (d.has_next_step) s += 15; else { s -= 15; why.push("No agreed next step"); }
  if (callCount >= 2) s += 10; else why.push("Fewer than 2 recorded calls");
  if (daysSinceLastCall === null) { s -= 10; why.push("No calls recorded"); }
  else if (daysSinceLastCall > 14) { s -= 15; why.push(`No contact for ${daysSinceLastCall} days`); }
  if (d.close_date && new Date(d.close_date) < new Date() && !["won", "lost"].includes(d.stage)) { s -= 10; why.push("Close date has passed"); }
  return { score: Math.max(0, Math.min(100, s)), why };
}
export const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
