# Contributing to PRDSprint

Thank you for your interest in contributing to PRDSprint! This repository contains the **public frontend**. The backend generation infrastructure is private and not part of this repository.

Follow this guide to set up your local development environment and submit contributions.

---

## 1. Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yushy07/prdsprint.git
   cd prdsprint
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env` and fill in your development Supabase credentials:
   ```text
   VITE_SUPABASE_URL=https://your-dev-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-dev-anon-key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

> The frontend shell runs without backend credentials, but auth, generation, dashboard, and admin features require a compatible Supabase project.

---

## 2. Project Structure

All frontend code lives inside [`src/`](src/):

- **Pages & routes**: `src/pages/`, wired in `src/App.tsx`
- **Components**: `src/components/`
- **State & context**: `src/context/`
- **Client libraries**: `src/lib/`
- **Data (plans, style PRDs)**: `src/data/`
- **Admin API client**: `src/services/admin/api.ts`
- **Tests**: `src/__tests__/` (Vitest + Testing Library)

---

## 3. Development Guidelines

- **Code quality**: ensure all code passes the type check and tests before submitting:
  ```bash
  npm run lint   # TypeScript check (tsc --noEmit)
  npm run test   # Vitest test suite
  npm run build  # Production build
  ```
- **Security principles**:
  - Never commit credentials, `.env` files, or service-role keys.
  - Only browser-safe `VITE_` variables belong in the frontend.
  - Credit balances and billing are display-only in the UI; the backend is the billing authority.
  - Do not attempt to grant access by manipulating frontend state or local storage — admin status is determined server-side.

---

## 4. Branch Naming & Commit Messages

- Use descriptive branches from `main`:
  - `feature/<name>` for new functionality
  - `fix/<name>` for bug fixes
  - `docs/<name>` for documentation changes
  - `chore/<name>` for maintenance
- Use clear, concise commit messages following [Conventional Commits](https://www.conventionalcommits.org/) style, e.g. `feat: add payment modal`, `fix: correct credit refund calculation`, `docs: update deployment guide`.

---

## 5. Submitting Pull Requests

1. Create a descriptive feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes with clear, concise commit messages.
3. Push to your fork and open a Pull Request against `main`.
4. Fill out the [PR template](.github/PULL_REQUEST_TEMPLATE.md), describing changes, visual screenshots (if applicable), and verification steps.
