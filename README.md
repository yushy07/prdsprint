<div align="center">

  <img src="assets/prdsprint-mark.svg" alt="PRDSprint" width="120" />

  <h1>PRDSprint</h1>

  <p>
    <strong>Think. Build. Launch.</strong>
  </p>

  <p>
    AI-powered Product Requirements Document (PRD) generation — a guided wizard,
    credit-based plans, and one-click ZIP export.
  </p>

  <p>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-Apache%202.0-3ECF8E?style=for-the-badge" alt="License: Apache 2.0" />
    </a>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.8" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Tests-23%20%2F%2023-2F855A?style=for-the-badge" alt="Tests: 23/23" />
  </p>

</div>

---

<div align="center">

> **Public repository scope.** The **frontend** in this repository is public and open for inspection — you can read it, run it locally, and contribute to it. The **backend generation infrastructure** (the AI provider pipeline, database schema, and related server-side systems) is **private and not included** in this repository. See [Architecture](#architecture) and [API](docs/API.md) for the boundary.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Credit System](#credit-system)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Overview

PRDSprint is a Product Requirements Document (PRD) generation application. Users are guided through a product-definition wizard, pick a platform (website or Android), a design style, a tech stack, colors, and typography, and then generate a complete, multi-section Markdown PRD that can be downloaded as a ZIP package.

The application is built as a **React single-page application** (the public, open part of the project) that talks to a **Supabase-powered backend** (the private part). Google OAuth is used for authentication, and PRD generation is gated behind a credit system.

## Features

<table align="center">
  <tr>
    <td align="center" width="50%">
      <strong>⚡ Guided PRD wizard</strong><br/>
      <small>Platform, tech stack, colors &amp; theme, typography, design style, and project details.</small>
    </td>
    <td align="center" width="50%">
      <strong>🎨 Website &amp; Android PRDs</strong><br/>
      <small>Platform-specific design systems, tech stacks, and style guides.</small>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>🔐 Auth-gated generation</strong><br/>
      <small>Sign in with Google before generating a PRD.</small>
    </td>
    <td align="center">
      <strong>💳 Credit system</strong><br/>
      <small>Free / Starter / Pro / Ultimate plans with monthly credit allowances.</small>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>📦 ZIP export</strong><br/>
      <small>Generated PRD sections packaged into a downloadable ZIP, client-side.</small>
    </td>
    <td align="center">
      <strong>📊 Dashboard</strong><br/>
      <small>Credits, plan, and credit history at a glance.</small>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>🛠️ Admin console</strong><br/>
      <small>Users, credits, generations, payments, audit logs, analytics, providers, and system health.</small>
    </td>
    <td align="center">
      <strong>💬 Support form</strong><br/>
      <small>Validated support submissions routed through the backend.</small>
    </td>
  </tr>
</table>

## Architecture

> **Frontend vs. backend boundary**

- **Frontend (public, this repository):** React SPA. Handles the wizard UI, credit/plan displays, admin dashboard surfaces, and ZIP packaging. Runs fully in the browser.
- **Backend (private, not in this repository):** Supabase project — PostgreSQL schema, Row Level Security, RPC functions, and Edge Functions (`generate-prd`, `support`). This is where PRD generation actually happens. It is **not included** here; only the client-side integration points (`src/lib/supabase.ts`, `supabase.functions.invoke`) are public.

```mermaid
flowchart LR
    subgraph Frontend["React Frontend (public)"]
        W[Wizard UI] --> G[Generation screen]
        D[Dashboard] --> C[Credit / plan UI]
        A[Admin surfaces]
    end
    G --> S{supabase.auth /<br/>functions.invoke / .rpc()}
    S --> B["Supabase Backend (private, external)<br/>Auth · Postgres · Edge Functions"]
    C --> S
    A --> S
```

For full detail, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.8" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/React%20Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router 7" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/TanStack%20Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Motion-12-F97316?style=for-the-badge&logo=smashgg&logoColor=white" alt="Motion" />
  <img src="https://img.shields.io/badge/Three.js-0.180-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Recharts-3-22B8CF?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/JSZip-3-FF6A3D?style=for-the-badge&logo=7zip&logoColor=white" alt="JSZip" />
  <img src="https://img.shields.io/badge/Vitest-4-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
</p>

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

## Project Structure

<details>
  <summary><strong>Click to expand</strong></summary>

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

</details>

## Credit System

Plans are defined in `src/data/plans/index.ts` (INR, monthly): **Free** (₹0 / 50 credits), **Starter** (₹49 / 200), **Pro** (₹99 / 500), **Ultimate** (₹149 / 900). Generation cost is estimated client-side from platform, complexity, features, style, and tech stack (`src/lib/credits.config.ts`). Final billing is enforced by the private backend, which is the source of truth for balances.

## Documentation

<p align="center">
  <a href="docs/ARCHITECTURE.md"><img src="https://img.shields.io/badge/Architecture-4572FE?style=for-the-badge" alt="Architecture" /></a>
  <a href="docs/API.md"><img src="https://img.shields.io/badge/API-4572FE?style=for-the-badge" alt="API" /></a>
  <a href="docs/DEPLOYMENT.md"><img src="https://img.shields.io/badge/Deployment-4572FE?style=for-the-badge" alt="Deployment" /></a>
  <a href="docs/SECURITY.md"><img src="https://img.shields.io/badge/Security-4572FE?style=for-the-badge" alt="Security" /></a>
  <a href="docs/TROUBLESHOOTING.md"><img src="https://img.shields.io/badge/Troubleshooting-4572FE?style=for-the-badge" alt="Troubleshooting" /></a>
  <a href="docs/CONTRIBUTING.md"><img src="https://img.shields.io/badge/Contributing-4572FE?style=for-the-badge" alt="Contributing" /></a>
  <a href="docs/FAQ.md"><img src="https://img.shields.io/badge/FAQ-4572FE?style=for-the-badge" alt="FAQ" /></a>
</p>

## Roadmap

See [ROADMAP.md](docs/ROADMAP.md). The roadmap separates what is already implemented in this public repository from what remains planned — including the real AI generation pipeline, which lives in the private backend.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for setup, branch naming, commit style, and the PR process.

## Security

See [SECURITY.md](docs/SECURITY.md) for the security model and responsible disclosure. To report a vulnerability, email ayushrock3006@gmail.com.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

<div align="center">

<sub>Built with ❤️ by Ayush Kant</sub>

</div>
