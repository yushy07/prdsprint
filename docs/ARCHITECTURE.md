# System Architecture

PRDSprint is a React single-page application (the public part of the project) that integrates with a Supabase-powered backend (the private part).

> **Repository scope**
>
> - **Public (this repository):** the entire frontend in `src/`. Everything here is open for inspection, runs fully in the browser, and can be developed and tested locally.
> - **Private (not in this repository):** the backend generation infrastructure — the PostgreSQL schema, Row Level Security policies, RPC functions, AI provider pipeline, and the deployed Edge Functions. Only the client-side integration surface (`src/lib/supabase.ts` and `supabase.functions.invoke`) is public.

```text
┌──────────────────────────────────────────────────┐
│            React Frontend (public)               │
│         Vite + TypeScript + Tailwind v4          │
│                                                  │
│   Wizard UI · Generation screen · Dashboard      │
│   Admin surfaces · Credit/plan UI · ZIP export   │
└───────────────────────┬──────────────────────────┘
                        │  supabase.auth / supabase.functions.invoke / .rpc()
                        ▼
┌──────────────────────────────────────────────────┐
│         Supabase Backend (private, external)     │
│   Auth (Google OAuth) · Postgres · Edge          │
│   Functions (generate-prd, support)              │
└──────────────────────────────────────────────────┘
```

## 1. Frontend Structure

The frontend application resides entirely inside [`src/`](src/):

- **Main entrypoint**: [`src/main.tsx`](src/main.tsx) mounts the app in `StrictMode`.
- **Route tree**: [`src/App.tsx`](src/App.tsx) wires up React Router routes and provider hierarchy.

  | Route | Page |
  | --- | --- |
  | `/` | Home |
  | `/builder` | PRD wizard (`Builder`) |
  | `/dashboard` | Credits, plan, and history |
  | `/checkout` | Plan/pricing checkout |
  | `/admin` | Admin console (nested routes: overview, users, credits, generations, payments, logs, analytics, providers, system, settings) |

- **Providers**: `ThemeProvider` (dark default), `QueryProvider` (TanStack Query), `SmoothScroll` (Lenis), `ToastProvider` (notifications), and `CreditProvider` (credit/plan state).
- **Pages**: `src/pages/wizard/` contains the wizard step screens (`PlatformSelectionStep`, `TechStackStep`, `ColorsThemeStep`, `TypographyStep`, `DesignStyleStep`, `ProjectDetailsStep`), `src/pages/` contains the top-level pages (`Home`, `Builder`, `Dashboard`, `Checkout`, `GenerationStep`), plus the `admin/` subtree.
- **Wizard data**: `src/data/` holds plan definitions (`plans/index.ts`), website style PRDs (`websiteStylePRDs/index.ts`), and Android style PRDs (`androidStylePRDs/index.ts`).
- **Client libraries**: `src/lib/` contains the Supabase client (`supabase.ts`), credit calculator (`creditCalculator.ts`), pricing rules (`credits.config.ts`), ZIP packaging (`zipExport.ts`), and utilities (`utils.ts`).
- **Admin API**: `src/services/admin/api.ts` is the client-side wrapper for admin backend RPCs.
- **Context**: `src/context/` provides `CreditContext` and `ToastContext`.

## 2. Backend Integration (external contract)

The frontend interacts with the private backend only through public, browser-safe interfaces:

- **Authentication**: `supabase.auth.signInWithOAuth({ provider: 'google' })`. Sessions are resolved by the Supabase client; there is no dedicated `/auth/callback` route.
- **Generation**: `supabase.functions.invoke('generate-prd', ...)` with the user's bearer token and the wizard payload. The contract is documented in [API.md](API.md).
- **Support**: `supabase.functions.invoke('support', ...)` with a support message payload.
- **RPCs**: admin surfaces call backend RPC functions (e.g. `is_admin`, dashboard statistics) through the Supabase client.

The backend itself is not part of this repository.

## 3. Authentication Flow

1. Users must authenticate with Google OAuth before generating a PRD.
2. The browser calls `supabase.auth.signInWithOAuth({ provider: 'google' })` and is redirected back to an app route (e.g. `/builder?auth=success` or `/dashboard`).
3. Supabase Auth redirect URLs must be configured in the Supabase Dashboard to allow the application origin:
   - Development: `http://localhost:3000` (e.g. `http://localhost:3000/builder`)
   - Production: `https://<your-domain>` (e.g. `https://<your-domain>/builder`)
4. OAuth client credentials live only in the Supabase project; they are never exposed in client code.

## 4. Generation Flow (frontend side)

1. The wizard collects platform, tech stack, colors/theme, typography, design style, and project details.
2. `GenerationStep` (`src/pages/GenerationStep.tsx`) verifies a valid session and calls `supabase.functions.invoke('generate-prd')`.
3. The backend performs the actual generation and returns section content plus billing details.
4. The frontend presents a success/partial/error screen and packages the returned sections into a ZIP (`src/lib/zipExport.ts`), with a signed download URL when the backend provides one.

## 5. Environment Variables

Only public, browser-safe variables prefixed with `VITE_` are exposed to the client:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

All server-side secrets are managed in the private backend and never enter the browser bundle or this repository.

## 6. Security Model

- **Auth-gated generation**: PRD generation requires a valid Google OAuth session.
- **Admin gating**: admin access is authorized by the backend (`is_admin`); client-side guards are UX enhancements only.
- **Secret separation**: only `VITE_` variables ship to the browser; no server keys are committed.
- **Server authority**: credit balances and billing are enforced by the backend, not by frontend state.

For the full security posture, see [SECURITY.md](SECURITY.md).
