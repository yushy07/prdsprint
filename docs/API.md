# API & Integration Contracts

This document describes the **public integration contracts** that the frontend in this repository uses to talk to the private backend.

> **Scope**
>
> - The **frontend** (this repository) is public and open for inspection.
> - The **backend generation infrastructure** (Supabase project, PostgreSQL schema, RLS policies, RPC functions, Edge Functions, AI provider pipeline) is **private and not included** in this repository.
> - The contracts below describe the *requests the frontend makes* and the *response shapes it expects*. They are the public boundary between the two systems.

## Edge Function Invocations

### `generate-prd`

The frontend invokes the `generate-prd` Edge Function with the user's Google OAuth bearer token:

- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer <user_google_jwt_token>` (required)
  - `Content-Type: application/json`
  - `Idempotency-Key` (optional, sent by the frontend to de-duplicate retries)

#### Request body

```json
{
  "platform": "website",
  "frontend": "react-tailwind",
  "backend": "",
  "database": "",
  "theme": "dark",
  "styleId": "spark",
  "font": "Inter",
  "colorPalette": "",
  "description": "A next-gen mobile banking experience for modern users.",
  "stylePrd": {
    "id": "spark",
    "name": "Spark",
    "title": "Spark",
    "tagline": "...",
    "markdown": "...",
    "sections": []
  }
}
```

The `stylePrd` object is included by the client (from `src/data/websiteStylePRDs/index.ts` or `src/data/androidStylePRDs/index.ts`) as reference material for the selected design style.

#### Response

A successful generation returns section content and billing details:

```json
{
  "success": true,
  "status": "completed",
  "sections": {
    "overview": "# Product Overview\n...",
    "features": "# Features\n...",
    "tech": "# Architecture\n...",
    "ui": "# Design System\n...",
    "roadmap": "# Roadmap\n...",
    "theme": "# Theme\n..."
  },
  "billing": {
    "credits_charged": 20,
    "credits_refunded": 0,
    "net_credits_used": 20,
    "remaining_balance": 480,
    "is_admin": false
  },
  "download_url": "https://..."
}
```

Fields the frontend understands (`src/pages/GenerationStep.tsx`):

| Field | Meaning |
| --- | --- |
| `sections` | Completed PRD markdown sections keyed by name |
| `partial` / `status` | Partial results when some sections fail |
| `completedSections` / `failedSections` | Which sections succeeded/failed |
| `errors` | `{ section: { reason } }` for failed sections |
| `billing.credits_charged` | Credits charged for the generation |
| `billing.credits_refunded` | Credits refunded on partial/failed generation |
| `billing.remaining_balance` | User balance after the generation |
| `billing.is_admin` | Whether the caller is an administrator (charged 0) |
| `download_url` | Backend-provided signed download URL for the ZIP export |

#### Errors the frontend handles

| Code / signal | Frontend behavior |
| --- | --- |
| `INSUFFICIENT_CREDITS` (or message containing "insufficient credits") | Shows an insufficient-credits screen and refreshes the balance |
| `AUTH_REQUIRED` / `AUTHENTICATION_REQUIRED` (or "authentication required" / "sign in") | Opens the Google sign-in modal |
| `FORBIDDEN` (or "forbidden") | Shows an access-denied screen |
| HTTP/network failure or `status` not completed/partial | Shows a generation-failed screen |

### `support`

The frontend submits support messages:

- **Method**: `POST`
- **Headers**: `Authorization: Bearer <user_google_jwt_token>`, `Content-Type: application/json`

#### Request body

```json
{
  "message": "Can I export PRDs directly to PDF?"
}
```

#### Response

```json
{
  "success": true
}
```

## Backend RPCs

Admin surfaces call backend RPC functions through the Supabase client (e.g. `is_admin`, dashboard statistics, user/credit/generation/payment management). These RPCs are implemented in the **private backend** and are not defined in this repository. The client-side calling code lives in `src/services/admin/api.ts`.

## Notes

- The multi-provider AI pipeline, section-level failover, partial-generation refunds, and storage exports are part of the **private backend** and are intentionally not documented in this public repository.
