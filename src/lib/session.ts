import { redirect } from "next/navigation";
import { supabaseServer } from "./supabase/server";
import { PLANS, type PlanId } from "./plans";
export async function getCtx() {
  const sb = await supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const { data: m } = await sb.from("memberships").select("org_id, organizations(id,name,plan,subscription_status)").eq("user_id", user.id).limit(1).maybeSingle();
  const org = (m as any)?.organizations as { id: string; name: string; plan: PlanId; subscription_status: string } | undefined;
  if (!org) throw new Error("No organization found for this account. Re-run supabase/schema.sql trigger setup.");
  const start = new Date(); start.setUTCDate(1); start.setUTCHours(0, 0, 0, 0);
  const { count } = await sb.from("usage_events").select("id", { count: "exact", head: true }).eq("org_id", org.id).eq("kind", "call_upload").gte("created_at", start.toISOString());
  const plan = PLANS[org.plan] ?? PLANS.free;
  return { sb, user, org, plan, used: count ?? 0 };
}
