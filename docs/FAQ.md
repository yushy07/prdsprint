# Frequently asked questions

## How do credits work?

The client defines Free, Starter, Pro, and Ultimate plans with 50, 200, 500, and 900 monthly credits respectively (see `src/data/plans/index.ts`). A generation cost is estimated from platform, complexity, features, style, and technology stack (`src/lib/credits.config.ts`). Final balances are enforced by the private backend, which is the source of truth.

## How do exports work?

Generated PRD sections are packaged into a ZIP archive. If the backend provides a signed download URL, the browser opens it; otherwise the ZIP is created client-side with JSZip (`src/lib/zipExport.ts`).

## Why did a generation fail?

Common causes include being signed out, an unavailable or misconfigured backend, invalid input, insufficient credits, or a malformed backend response. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

## Is the AI generation pipeline in this repository?

No. This repository contains the **public frontend**. The AI provider pipeline, database schema, and Edge Functions are part of the **private backend** and are not included here. The frontend calls the backend through the public contracts documented in [API.md](API.md).

## How do I access the admin dashboard?

An authenticated user must pass the backend `is_admin` check. Client-side navigation to `/admin` is not a way to grant access.

## Is payment live?

No. The client includes checkout and payment-management UI, but a complete production payment gateway, billing, and webhook implementation is not present. Payments are deployment-specific and planned.

## Can I deploy without Supabase?

You can build the static frontend shell, but authentication, generation, dashboard data, support, and admin features require a compatible Supabase project and backend.

## Can I use a service-role key in `.env`?

No. Server-side secrets belong only in the private backend's secret store. Never put them in a `VITE_` variable or ship them to the browser.
