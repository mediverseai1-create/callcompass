import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
export async function middleware(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isApp = req.nextUrl.pathname.startsWith("/app");
  if (!url || !anon) return isApp ? NextResponse.redirect(new URL("/login?setup=1", req.url)) : NextResponse.next();
  let res = NextResponse.next({ request: req });
  const sb = createServerClient(url, anon, { cookies: {
    getAll: () => req.cookies.getAll(),
    setAll: (l: { name: string; value: string; options?: any }[]) => { l.forEach(({ name, value }) => req.cookies.set(name, value)); res = NextResponse.next({ request: req }); l.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); },
  } });
  const { data: { user } } = await sb.auth.getUser();
  if (isApp && !user) return NextResponse.redirect(new URL("/login", req.url));
  if (user && ["/login", "/signup"].includes(req.nextUrl.pathname)) return NextResponse.redirect(new URL("/app", req.url));
  return res;
}
export const config = { matcher: ["/app/:path*", "/login", "/signup"] };
