import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin";
// Trusted billing confirmation. Your payment automation (e.g. Stripe webhook relay) calls this with
// header x-webhook-secret. Returning from a payment link alone never changes a plan.
const body = z.object({ org_id: z.string().uuid(), plan: z.enum(["free", "starter", "growth"]), status: z.enum(["active", "past_due", "canceled"]) });
export async function POST(req: Request) {
  const secret = process.env.BILLING_WEBHOOK_SECRET;
  const got = req.headers.get("x-webhook-secret") ?? "";
  if (!secret || got.length !== secret.length || !timingSafeEqual(Buffer.from(got), Buffer.from(secret))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const p = body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "invalid body" }, { status: 400 });
  const plan = p.data.status === "canceled" ? "free" : p.data.plan;
  const { error } = await supabaseAdmin().from("organizations").update({ plan, subscription_status: p.data.status }).eq("id", p.data.org_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
