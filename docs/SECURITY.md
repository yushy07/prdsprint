# Security Policy

## Repository scope

- The **frontend** in this repository is public and open for inspection.
- The **backend generation infrastructure** (Supabase project, database schema, RLS policies, RPC functions, Edge Functions, AI provider keys) is **private and not included** in this repository.

## Security principles

### 1. Auth-gated generation
PRD generation requires a valid Google OAuth session (`supabase.auth.signInWithOAuth({ provider: 'google' })`). Signed-out users are blocked and prompted to sign in.

### 2. Secret & credential isolation
- Only public, browser-safe environment variables prefixed with `VITE_` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are bundled into client code.
- Server-side secrets — service-role keys, AI provider keys, email credentials — live only in the private backend and never enter the browser bundle or this repository.
- Never commit `.env` files or credentials.

### 3. Server-side authorization
- Admin status is determined by the backend (`is_admin`), never inferred from frontend state, local storage, plan names, or credit balances.
- Client-side navigation guards are UX enhancements only; authorization is enforced by the backend.

### 4. Billing authority
- Credit balances and charges are display-only in the UI. The backend is the sole billing authority.
- Users cannot modify credit balances from the frontend.

## Reporting vulnerabilities

If you discover a potential security vulnerability in PRDSprint, please report it privately:

- **Email**: [ayushrock3006@gmail.com](mailto:ayushrock3006@gmail.com)
- **Required details**: description of the vulnerability, affected component, steps to reproduce, and impact assessment.
- **Disclosure policy**: please do not publish security issues publicly until a fix has been released. Reports will be acknowledged within 7 days.
