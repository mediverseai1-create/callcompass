import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";
// Handles Supabase email links. Supports PKCE (?code=) and token-hash links (?token_hash=&type=), the
// latter working even when the link is opened in a different browser than the one used to sign up.
export async function GET(req: Request) {
  const u = new URL(req.url);
  const rawNext = u.searchParams.get("next") ?? "/app";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/app";
  const sb = await supabaseServer();
  const code = u.searchParams.get("code");
  const tokenHash = u.searchParams.get("token_hash");
  const type = u.searchParams.get("type") as EmailOtpType | null;
  if (code) {
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, u.origin));
  } else if (tokenHash && type) {
    const { error } = await sb.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(new URL(next, u.origin));
  }
  const msg = encodeURIComponent("Your email may already be confirmed or the link expired. Try signing in, or request a new link.");
  return NextResponse.redirect(new URL(`/login?notice=${msg}`, u.origin));
}
