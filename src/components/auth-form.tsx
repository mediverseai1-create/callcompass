import Link from "next/link";
import { Logo } from "./shell";
export async function AuthPage({ title, action, params, password = true, submit, footer }: {
  title: string; action: (fd: FormData) => Promise<void>; params: Promise<Record<string, string | undefined>>; password?: boolean; submit: string; footer: React.ReactNode;
}) {
  const sp = await params;
  const configured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <Logo />
      <form action={action} className="card mt-6 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {(sp.setup || !configured) && <p role="alert" className="rounded bg-amber-100 p-2 text-sm">Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).</p>}
        {sp.error && <p role="alert" className="rounded bg-red-100 p-2 text-sm text-red-800">{sp.error}</p>}
        {sp.notice && <p role="status" className="rounded bg-green-100 p-2 text-sm text-green-800">{sp.notice}</p>}
        <div><label className="label" htmlFor="email">Work email</label><input id="email" name="email" type="email" required autoComplete="email" className="input" /></div>
        {password && <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" required minLength={8} autoComplete="current-password" className="input" /></div>}
        <button className="btn-pink w-full">{submit}</button>
        <div className="text-center text-sm">{footer}</div>
      </form>
      <Link href="/" className="mt-4 text-sm underline">Back to site</Link>
    </main>
  );
}
