# Changelog

All notable changes to PRDSprint are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and releases follow [Semantic Versioning](https://semver.org/).

## [Unreleased] — 2026-08-09

### Improved

- Added normalized Supabase admin dashboard snapshot metrics.
- Added server-side pagination for users, generations, credits, and audit logs.
- Added stuck-generation operational state and age classification.
- Added audit-log and credit-ledger CSV export.
- Added system settings history and administrator restore support.
- Updated deployment and free-plan operations guidance for Preview testing.

## [1.0.0] — 2026-08-07

### Added

- Guided product-definition flow for website and Android concepts.
- Platform, tech stack, colors & theme, typography, design style, and project details wizard steps.
- Auth-gated PRD generation requiring Google OAuth sign-in.
- Credit plans (Free / Starter / Pro / Ultimate), cost estimation, checkout, and dashboard surfaces.
- ZIP export of generated PRD markdown sections.
- Support form flow.
- Admin workspace with users, credits, generations, payments, audit logs, analytics, providers, system health, and settings surfaces.
- Responsive interface, animated visual components, theme support, and reduced-motion handling.
- Vitest + Testing Library test suite (auth gating, generation, and admin flows).
- Public repository documentation (README, architecture, API contract, deployment, security, contributing, FAQ, troubleshooting) and GitHub issue/PR templates.

### Notes

This release contains the **public frontend**. The backend generation infrastructure (Supabase project, AI provider pipeline, Edge Functions, database schema) is private and not included in this repository.
