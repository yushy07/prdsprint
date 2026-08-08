# Roadmap

This roadmap separates what is implemented in the public repository (the frontend) from what remains planned — including work that lives in the private backend.

## Completed

- [x] Guided PRD wizard for website and Android concepts
- [x] Platform, style, color, typography, and technology selection
- [x] Auth-gated PRD generation (Google OAuth required)
- [x] Credit plans, pricing rules, and cost estimation UI
- [x] Generated-section presentation and client-side ZIP export
- [x] Dashboard, checkout, support, and admin UI surfaces
- [x] Vitest test suite covering generation, auth-gating, and admin flows
- [x] Public repository documentation and GitHub issue/PR templates

## In Progress

- [ ] PRD history list on the dashboard — currently shows a placeholder empty state.

## Planned (private backend)

- [ ] Real AI generation pipeline in the backend (provider routing, failover, retries, quality validation)
- [ ] Partial generation handling and automatic credit refunds
- [ ] Server-side ZIP storage and signed download URLs
- [ ] Support email dispatch and rate limiting
- [ ] Real payment gateway integration — the checkout flow is currently a simulated UI
- [ ] Provider observability, cost controls, and model selection controls

## Future

- [ ] Production billing, subscriptions, invoices, and webhook reconciliation
- [ ] Versioned prompt templates and prompt management
- [ ] Team workspaces, roles, and shared project permissions
- [ ] Real-time collaboration and project activity history
- [ ] A documented public API and API authentication model
- [ ] Template and style marketplace

Roadmap items are directional and may change as the project is validated with users.
