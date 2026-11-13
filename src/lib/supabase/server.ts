import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export const hasSupabase = () => !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => store.getAll(), setAll: (l: { name: string; value: string; options?: any }[]) => { try { l.forEach(({ name, value, options }) => store.set(name, value, options)); } catch {} } },
  });
}
