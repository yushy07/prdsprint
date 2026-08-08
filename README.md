<div align="center">
  <img src="public/logo.svg" alt="PRDSprint" width="128" />
</div>

<h1 align="center">PRDSprint</h1>

<p align="center">
  <strong>Think. Build. Launch.</strong>
</p>

<p align="center">
  AI-powered Product Requirements Document (PRD) generation — guided wizard, credit-based plans, and one-click ZIP export.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white" alt="Supabase">
</p>

---

> **Public repository scope.** The **frontend** in this repository is public and open for inspection — you can read it, run it locally, and contribute to it. The **backend generation infrastructure** (the AI provider pipeline, database schema, and related server-side systems) is **private and not included** in this repository. See [Architecture](#architecture) and [API](docs/API.md) for the boundary.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Credit System](#credit-system)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Documentation](#documentation)

## Overview

PRDSprint is a Product Requirements Document (PRD) generation application. Users are guided through a product-definition wizard, pick a platform (website or Android), a design style, a tech stack, colors, and typography, and then generate a complete, multi-section Markdown PRD that can be downloaded as a ZIP package.

The application is built as a **React single-page application** (the public, open part of the project) that talks to a **Supabase-powered backend** (the private part). Google OAuth is used for authentication, and PRD generation is gated behind a credit system.

## Features

- **Guided PRD wizard** — platform selection, tech stack, colors & theme, typography, design style, project details, and generation.
- **Website & Android PRDs** — platform-specific design systems, tech stacks, and style guides.
- **Auth-gated generation** — users must sign in with Google before generating a PRD.
- **Credit system** — Free / Starter / Pro / Ultimate plans with monthly credit allowances.
- **ZIP export** — generated PRD sections are packaged into a downloadable ZIP (client-side).
- **Dashboard** — credits, plan, and credit history.
- **Admin console** — users, credits, generations, payments, audit logs, analytics, providers, system health, and settings.
- **Support form** — validated support submissions routed through the backend.

## Architecture

> **Frontend vs. backend boundary**

- **Frontend (public, this repository):** React SPA. Handles the wizard UI, credit/plan displays, admin dashboard surfaces, and ZIP packaging. Runs fully in the browser.
- **Backend (private, not in this repository):** Supabase project — PostgreSQL schema, Row Level Security, RPC functions, and Edge Functions (`generate-prd`, `support`). This is where PRD generation actually happens. It is **not included** here; only the client-side integration points (`src/lib/supabase.ts`, `supabase.functions.invoke`) are public.

For full detail, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI | React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4 |
| Routing | React Router 7 |
| Data & Auth | Supabase (`@supabase/supabase-js`), TanStack Query |
| Motion & Effects | Motion, Lenis, OGL, Three.js, Postprocessing |
| Charts | Recharts |
| Export | JSZip |
| Icons | Lucide React, React Icons |
| Styling | Tailwind CSS v4, CVA, clsx, tailwind-merge |
| Testing | Vitest, Testing Library |

## Folder Structure

```text
prdsprint/
├── .github/                   # Issue & PR templates
├── docs/                      # Long-form documentation
├── public/                    # Static assets (logo, manifest)
├── src/
│   ├── components/            # UI components (auth, credits, generation, layout, sections, support, ui, effects)
│   ├── pages/                 # Top-level pages (home, builder, dashboard, checkout, generation, admin)
│   │   └── wizard/            # Wizard step screens
│   ├── context/               # Credit & toast providers
│   ├── lib/                   # Supabase client, credit rules, export helpers
│   ├── data/                  # Plans, pricing rules, style PRDs
│   ├── services/              # Admin API client
│   ├── hooks/                 # Shared hooks
│   ├── __tests__/             # Vitest + Testing Library tests
│   ├── App.tsx                # Route tree
│   └── main.tsx               # Entry point
├── .env.example
├── LICENSE
├── package.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js v22+ and npm
- A Supabase project (for authentication and backend calls). Without one, the app shell still builds and runs, but auth, generation, dashboard, and admin features require backend connectivity.

### Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables — copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your public Supabase variables:
   ```text
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The dev server runs on `http://localhost:3000`.

### Environment Variables

Only two browser-safe variables are required by the client:

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

Server-side secrets are managed inside the private backend and never enter the browser bundle or this repository.

### Running Tests

```bash
npm run test
```

### Build

```bash
npm run build
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on `http://localhost:3000` |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run test` | Run the Vitest + Testing Library suite |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run clean` | Remove the `dist/` build output |

## Credit System

Plans are defined in `src/data/plans/index.ts` (INR, monthly): **Free** (₹0 / 50 credits), **Starter** (₹49 / 200), **Pro** (₹99 / 500), **Ultimate** (₹149 / 900). Generation cost is estimated client-side from platform, complexity, features, style, and tech stack (`src/lib/credits.config.ts`). Final billing is enforced by the private backend, which is the source of truth for balances.

## Roadmap

See [ROADMAP.md](docs/ROADMAP.md). The roadmap separates what is already implemented in this public repository from what remains planned — including the real AI generation pipeline, which lives in the private backend.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for setup, branch naming, commit style, and the PR process.

## Security

See [SECURITY.md](docs/SECURITY.md) for the security model and responsible disclosure. To report a vulnerability, email ayushrock3006@gmail.com.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Documentation

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Frontend architecture and the public/private backend boundary.
- [API.md](docs/API.md) — The public integration contracts the frontend uses.
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) — Frontend deployment instructions.
- [SECURITY.md](docs/SECURITY.md) — Security model and disclosure policy.
- [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) — Common issues and fixes.
- [CONTRIBUTING.md](docs/CONTRIBUTING.md) — Contribution guidelines.
- [FAQ.md](docs/FAQ.md) — Frequently asked questions.
