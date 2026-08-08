# Deployment Guide

This guide covers deployment of the **frontend** (the public part of PRDSprint in this repository). The backend generation infrastructure is private and deployed separately.

## Overview

| Target | What it is | Where it lives |
| --- | --- | --- |
| Frontend | Static React build | This repository (`npm run build` → `dist/`) |
| Backend | Supabase project (Auth, DB, Edge Functions) | Private; not in this repository |

## Prerequisites

- A Supabase project with Google OAuth enabled and the backend deployed (private infrastructure).
- The public Supabase variables for the frontend.

## Build Settings

For any static host (Vercel, Netlify, Cloudflare Pages):

- **Framework Preset**: Vite
- **Root Directory**: `./` (project root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Environment Variables

Configure the following browser-safe variables in your static host environment settings:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Google OAuth Redirect Configuration

The application has no `/auth/callback` route — after OAuth the client lands back on app routes. In the Supabase Dashboard (**Authentication > URL Configuration**):

- **Site URL**: your deployment origin (e.g. `https://your-domain.com`)
- **Redirect URLs**: your app route origins, for example:
  - `https://your-domain.com/builder`
  - `https://your-domain.com/dashboard`

## Production Verification Checklist

- [ ] `npm run lint` passes without errors.
- [ ] `npm run test` passes without errors.
- [ ] `npm run build` generates `dist/` cleanly.
- [ ] `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in the host environment.
- [ ] Google OAuth redirect URLs are configured in Supabase Auth settings.
- [ ] No server secrets, service-role keys, or `.env` files are exposed in the build output.
