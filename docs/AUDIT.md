# Reference audit (public pages only)

Sources: gong.io homepage (viewed in browser), its public navigation, and third-party review summaries. The authenticated app and inner product/pricing pages were not inspected. The reference's pricing is quote-based, so CallCompass pricing is our own.

**Concept:** "Revenue AI OS": conversation intelligence (record, transcribe, analyse calls), deal intelligence/health, forecasting, engagement and coaching/enablement. Targets sales, RevOps, customer success and enablement teams.
**Nav:** Product, Solutions, Innovation, Resources, Company, Pricing, Sign in, Book a demo.
**Design:** deep violet ink on white/lavender, magenta-pink pill CTAs, bold uppercase grotesk headlines, Inter body, soft pink/violet gradient hero.

## CallCompass adaptation
Original brand and copy. Modules built: Calls (deterministic metrics + AI analysis), Deals (health score), Forecast (stage-weighted), Coaching (rep scorecards), Billing (plans, usage), Settings.
Not built (needs credentials/infra): audio recording/transcription, CRM/calendar integrations, email engagement, multi-user invites.

## Architecture
Next.js 15 App Router + server actions; Supabase Auth/Postgres with org-scoped RLS (`is_member`); Gemini output validated by zod; billing via payment links plus a secret-authenticated webhook that is the only path that changes plans (a DB trigger blocks client edits).
