import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
export async function GET(req: Request) {
  const u = new URL(req.url);
  const code = u.searchParams.get("code");
  const next = u.searchParams.get("next") ?? "/app";
  if (code) { const sb = await supabaseServer(); const { error } = await sb.auth.exchangeCodeForSession(code); if (!error) return NextResponse.redirect(new URL(next.startsWith("/") ? next : "/app", u.origin)); }
  return NextResponse.redirect(new URL("/login?error=Link%20invalid%20or%20expired", u.origin));
}
