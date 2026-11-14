import Link from "next/link";
export function Logo({ light }: { light?: boolean }) {
  return <Link href="/" className={`font-display text-xl font-bold ${light ? "text-white" : "text-ink"}`}>Call<span className="text-pink-500">Compass</span></Link>;
}
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="/product">Product</Link><Link href="/product#solutions">Solutions</Link><Link href="/pricing">Pricing</Link><Link href="/about">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="px-3 text-sm font-medium">Sign in</Link>
          <Link href="/signup" className="btn-pink">Start free</Link>
        </div>
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="bg-ink text-violet-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm md:flex-row md:justify-between">
        <div><Logo light /><p className="mt-2 max-w-xs opacity-80">Revenue intelligence for teams that sell by conversation.</p></div>
        <div className="flex flex-wrap gap-x-8 gap-y-2"><Link href="/product">Product</Link><Link href="/pricing">Pricing</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/login">Sign in</Link></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs opacity-60">© {new Date().getFullYear()} CallCompass. Not affiliated with any other revenue intelligence vendor.</p>
    </footer>
  );
}
export function Marketing({ children }: { children: React.ReactNode }) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}
