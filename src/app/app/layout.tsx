import Link from "next/link";
import { LayoutDashboard, Phone, Briefcase, TrendingUp, GraduationCap, CreditCard, Settings } from "lucide-react";
import { getCtx } from "@/lib/session";
import { Logo } from "@/components/shell";
import { signOut } from "../actions";
const nav = [
  ["/app", "Dashboard", LayoutDashboard], ["/app/calls", "Calls", Phone], ["/app/deals", "Deals", Briefcase],
  ["/app/forecast", "Forecast", TrendingUp], ["/app/coaching", "Coaching", GraduationCap], ["/app/billing", "Billing", CreditCard], ["/app/settings", "Settings", Settings],
] as const;
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { org, plan, user } = await getCtx();
  return (
    <div className="min-h-screen md:flex">
      <aside className="bg-ink p-4 text-violet-100 md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0">
        <Logo light />
        <p className="mt-1 truncate text-xs opacity-70">{org.name} · {plan.name}</p>
        <nav aria-label="Application" className="mt-4 flex gap-1 overflow-x-auto md:flex-col">
          {nav.map(([href, label, Icon]) => <Link key={href} href={href} className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm hover:bg-white/10"><Icon className="h-4 w-4" aria-hidden />{label}</Link>)}
        </nav>
        <form action={signOut} className="mt-4 md:absolute md:bottom-4"><p className="truncate text-xs opacity-70">{user.email}</p><button className="mt-1 text-sm underline">Sign out</button></form>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
