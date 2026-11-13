export type PlanId = "free" | "starter" | "growth";
export const PLANS: Record<PlanId, { name: string; price: string; callsPerMonth: number; aiAnalysis: boolean; blurb: string; features: string[]; link?: string }> = {
  free: { name: "Explorer", price: "$0", callsPerMonth: 5, aiAnalysis: false, blurb: "Try conversation metrics on a handful of calls.",
    features: ["5 calls per month", "Deterministic call metrics", "Deal tracker and forecast"] },
  starter: { name: "Navigator", price: "$49/mo", callsPerMonth: 50, aiAnalysis: true, blurb: "For small teams coaching from real conversations.",
    features: ["50 calls per month", "AI summaries, risks and next steps", "Coaching scorecards"], link: process.env.NEXT_PUBLIC_PAYMENT_LINK_STARTER },
  growth: { name: "Captain", price: "$149/mo", callsPerMonth: 500, aiAnalysis: true, blurb: "For revenue teams running a weekly deal and coaching cadence.",
    features: ["500 calls per month", "Everything in Navigator", "Priority analysis"], link: process.env.NEXT_PUBLIC_PAYMENT_LINK_GROWTH },
};
