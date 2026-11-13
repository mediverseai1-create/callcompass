import type { SupabaseClient } from "@supabase/supabase-js";
import { dealHealth, STAGE_PROB, type DealRow } from "./deals";
export async function loadDeals(sb: SupabaseClient) {
  const [{ data: deals }, { data: calls }] = await Promise.all([
    sb.from("deals").select("*").order("created_at", { ascending: false }),
    sb.from("calls").select("deal_id, call_date").not("deal_id", "is", null),
  ]);
  return ((deals ?? []) as DealRow[]).map((d) => {
    const dc = (calls ?? []).filter((c: any) => c.deal_id === d.id);
    const last = dc.length ? Math.max(...dc.map((c: any) => new Date(c.call_date).getTime())) : null;
    const days = last === null ? null : Math.floor((Date.now() - last) / 86400000);
    return { ...d, amount: Number(d.amount), callCount: dc.length, health: dealHealth(d, dc.length, days) };
  });
}
export function forecast(deals: { amount: number; stage: string; health: { score: number } }[]) {
  const open = deals.filter((d) => !["won", "lost"].includes(d.stage));
  return {
    openValue: open.reduce((a, d) => a + d.amount, 0),
    weighted: Math.round(open.reduce((a, d) => a + d.amount * STAGE_PROB[d.stage], 0)),
    atRisk: open.filter((d) => d.health.score < 50).reduce((a, d) => a + d.amount, 0),
    won: deals.filter((d) => d.stage === "won").reduce((a, d) => a + d.amount, 0),
    openCount: open.length,
  };
}
