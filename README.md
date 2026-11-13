# CallCompass

Revenue intelligence from sales calls. Next.js 15, Supabase, Gemini.

## Setup
1. `npm install`
2. Create a Supabase project and run `supabase/schema.sql` in the SQL editor. Add `http://localhost:3000/auth/callback` (and your production URL) to Auth redirect URLs.
3. Copy `.env.example` to `.env.local` and fill it in.
4. `npm run dev`

## Billing
Set `NEXT_PUBLIC_PAYMENT_LINK_STARTER` / `_GROWTH`. Links get `client_reference_id=<org id>` appended. After a verified payment, your automation must `POST /api/billing/webhook` with header `x-webhook-secret: $BILLING_WEBHOOK_SECRET` and JSON `{"org_id","plan":"starter|growth","status":"active|past_due|canceled"}`. Returning from checkout does not change the plan.

## Vercel
Import the repo, add every variable from `.env.example` (keep `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `BILLING_WEBHOOK_SECRET` server-only), set `NEXT_PUBLIC_SITE_URL` to the production URL, deploy.
