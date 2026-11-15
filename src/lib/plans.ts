export type PlanId = "free" | "starter" | "growth";
// Payment links default to the Selar checkout pages; override with the env vars if they change.
export const PLANS: Record<PlanId, { name: string; price: string; callsPerMonth: number; aiAnalysis: boolean; blurb: string; features: string[]; link?: string }> = {
  free: { name: "Explorer", price: "$0", callsPerMonth: 5, aiAnalysis: false, blurb: "Try conversation metrics on a handful of calls.",
    features: ["5 calls per month", "Calculated call metrics", "Deal tracker and forecast", "Unlimited deals tracked", "Metrics glossary and playbooks"] },
  starter: { name: "Navigator", price: "$47/mo", callsPerMonth: 50, aiAnalysis: true, blurb: "For small teams coaching from real conversations.",
    features: ["50 calls per month", "AI summaries, risks and next steps", "Coaching scorecards", "Objections listed with quoted evidence", "Email support"],
    link: process.env.NEXT_PUBLIC_PAYMENT_LINK_STARTER || "https://selar.com/47plan?currency=USD" },
  growth: { name: "Captain", price: "$97/mo", callsPerMonth: 500, aiAnalysis: true, blurb: "For revenue teams running a weekly deal and coaching cadence.",
    features: ["500 calls per month", "Everything in Navigator", "Priority analysis", "Rep-level scorecards across all calls", "Priority email support"],
    link: process.env.NEXT_PUBLIC_PAYMENT_LINK_GROWTH || "https://selar.com/97plan?currency=USD" },
};
