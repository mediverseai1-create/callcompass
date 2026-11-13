"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";
import { getCtx } from "@/lib/session";
import { computeMetrics } from "@/lib/analysis";
import { analyzeCall } from "@/lib/ai";
import { STAGES } from "@/lib/deals";

const cred = z.object({ email: z.string().email(), password: z.string().min(8, "Password must be at least 8 characters") });
const q = (m: string) => encodeURIComponent(m);
const site = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function signIn(fd: FormData) {
  const p = cred.safeParse(Object.fromEntries(fd));
  if (!p.success) redirect(`/login?error=${q(p.error.issues[0].message)}`);
  const sb = await supabaseServer();
  const { error } = await sb.auth.signInWithPassword(p.data);
  if (error) redirect(`/login?error=${q(error.message)}`);
  redirect("/app");
}
export async function signUp(fd: FormData) {
  const p = cred.safeParse(Object.fromEntries(fd));
  if (!p.success) redirect(`/signup?error=${q(p.error.issues[0].message)}`);
  const sb = await supabaseServer();
  const { data, error } = await sb.auth.signUp({ ...p.data, options: { emailRedirectTo: `${site()}/auth/callback` } });
  if (error) redirect(`/signup?error=${q(error.message)}`);
  if (!data.session) redirect(`/login?notice=${q("Check your email to confirm your account, then sign in.")}`);
  redirect("/app");
}
export async function forgot(fd: FormData) {
  const email = z.string().email().safeParse(fd.get("email"));
  if (!email.success) redirect(`/forgot?error=${q("Enter a valid email")}`);
  const sb = await supabaseServer();
  await sb.auth.resetPasswordForEmail(email.data, { redirectTo: `${site()}/auth/callback?next=/app/settings` });
  redirect(`/forgot?notice=${q("If that account exists, a reset link is on its way.")}`);
}

const dealSchema = z.object({
  name: z.string().min(1).max(120), company: z.string().min(1).max(120),
  amount: z.coerce.number().min(0).max(1e9), stage: z.enum(STAGES),
  close_date: z.string().optional(),
});
export async function createDeal(fd: FormData) {
  const { sb, user, org } = await getCtx();
  const p = dealSchema.safeParse(Object.fromEntries(fd));
  if (!p.success) redirect(`/app/deals?error=${q(p.error.issues[0].path.join(".") + ": " + p.error.issues[0].message)}`);
  const { error } = await sb.from("deals").insert({ ...p.data, close_date: p.data.close_date || null, org_id: org.id, owner_id: user.id });
  if (error) redirect(`/app/deals?error=${q(error.message)}`);
  revalidatePath("/app", "layout"); redirect("/app/deals");
}
export async function updateDeal(fd: FormData) {
  const { sb } = await getCtx();
  const id = z.string().uuid().parse(fd.get("id"));
  const stage = z.enum(STAGES).parse(fd.get("stage"));
  await sb.from("deals").update({ stage, has_champion: fd.get("has_champion") === "on", has_next_step: fd.get("has_next_step") === "on" }).eq("id", id);
  revalidatePath("/app", "layout");
}
export async function deleteDeal(fd: FormData) {
  const { sb } = await getCtx();
  await sb.from("deals").delete().eq("id", z.string().uuid().parse(fd.get("id")));
  revalidatePath("/app", "layout");
}

const callSchema = z.object({
  title: z.string().min(1).max(160), rep_name: z.string().min(1).max(60),
  call_date: z.string().min(8), deal_id: z.string().optional(),
  transcript: z.string().min(40, "Transcript is too short").max(200000),
});
export async function createCall(fd: FormData) {
  const { sb, user, org, plan, used } = await getCtx();
  const file = fd.get("file");
  let transcript = String(fd.get("transcript") ?? "");
  if (file instanceof File && file.size > 0) {
    if (file.size > 2_000_000) redirect(`/app/calls/new?error=${q("File too large (max 2 MB of text)")}`);
    transcript = await file.text();
  }
  const p = callSchema.safeParse({ ...Object.fromEntries(fd), transcript });
  if (!p.success) redirect(`/app/calls/new?error=${q(p.error.issues[0].path.join(".") + ": " + p.error.issues[0].message)}`);
  if (used >= plan.callsPerMonth) redirect(`/app/calls/new?error=${q("Monthly call limit reached. Upgrade on the Billing page.")}`);
  const metrics = computeMetrics(p.data.transcript, p.data.rep_name);
  if (!metrics.speakers.length) redirect(`/app/calls/new?error=${q('No speakers found. Use lines like "Alex: Hello".')}`);
  let ai: unknown = null, status: "done" | "failed" | "skipped" = "skipped";
  if (plan.aiAnalysis) {
    try { ai = await analyzeCall(p.data.transcript, JSON.stringify(metrics)); status = "done"; } catch { status = "failed"; }
  }
  const { data, error } = await sb.from("calls").insert({
    org_id: org.id, user_id: user.id, title: p.data.title, rep_name: p.data.rep_name, call_date: p.data.call_date,
    deal_id: p.data.deal_id || null, transcript: p.data.transcript, metrics, ai_analysis: ai, ai_status: status,
  }).select("id").single();
  if (error) redirect(`/app/calls/new?error=${q(error.message)}`);
  await sb.from("usage_events").insert({ org_id: org.id, kind: "call_upload" });
  revalidatePath("/app", "layout"); redirect(`/app/calls/${data.id}`);
}
export async function signOut() {
  const sb = await supabaseServer(); await sb.auth.signOut(); redirect("/");
}
export async function renameOrg(fd: FormData) {
  const { sb, org } = await getCtx();
  const name = z.string().min(1).max(80).parse(fd.get("name"));
  await sb.from("organizations").update({ name }).eq("id", org.id);
  revalidatePath("/app", "layout");
}
