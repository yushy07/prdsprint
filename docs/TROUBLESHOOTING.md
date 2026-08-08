# Troubleshooting Guide

Common issues and fixes for the PRDSprint frontend.

---

## 1. Missing Supabase Environment Variables

**Symptom**: The app fails to connect to Supabase with errors such as `VITE_SUPABASE_URL is required` or `VITE_SUPABASE_ANON_KEY is required`.

**Solution**:
1. Copy `.env.example` to `.env` in your project root:
   ```bash
   cp .env.example .env
   ```
2. Set your Supabase project credentials in `.env`:
   ```text
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Restart the Vite development server (`npm run dev`).
4. Never place server-side secrets (such as a service-role key) in `.env` or client code.

---

## 2. Google OAuth Redirect Mismatch

**Symptom**: Clicking "Sign in with Google" returns a `redirect_uri_mismatch` error page or redirects to an invalid origin.

**Solution**:
1. Open **Supabase Dashboard > Authentication > URL Configuration**.
2. Verify **Site URL** matches your origin (e.g. `https://your-domain.com` or `http://localhost:3000` for local dev).
3. Add the application's redirect paths under **Redirect URLs**. The app has no `/auth/callback` route — OAuth returns to app routes such as:
   - `http://localhost:3000/builder`
   - `http://localhost:3000/dashboard`
   - `https://your-domain.com/builder`
   - `https://your-domain.com/dashboard`
4. Ensure your Google Cloud OAuth client includes the Supabase Auth callback URI under **Authorized redirect URIs**.

---

## 3. Authentication-Required Generation Errors

**Symptom**: PRD generation shows an "Authentication Required" popup, or generation fails with an auth-related error.

**Solution**:
1. Sign in with Google before generating.
2. Confirm the session token is sent with the request — `supabase.functions.invoke` passes the session `Authorization` header automatically when a session exists.
3. If the session expired, re-authenticate; the app re-attempts generation after sign-in.

---

## 4. Insufficient Credits

**Symptom**: PRD generation fails with `INSUFFICIENT_CREDITS` or an "insufficient credits" message.

**Solution**:
1. Check your current credit balance on the dashboard.
2. Review the requested platform and complexity against the pricing rules in `src/lib/credits.config.ts`.
3. Purchase additional credits or upgrade your plan.
4. If you are an administrator, admin status is determined by the backend (`is_admin`); it cannot be granted via frontend state or local storage.

---

## 5. Admin Access Denied

**Symptom**: The admin dashboard or admin actions fail with an access-denied error.

**Solution**:
1. Admin status is authorized by the backend (`is_admin`) — client-side navigation is not a way to grant access.
2. Verify your account is provisioned as an administrator in the backend project.
3. Do not attempt to grant admin access by setting local storage flags, plan tier strings, or zeroing credits.

---

## 6. ZIP Download Fails

**Symptom**: The generated PRD does not package into a ZIP, or the download does not start.

**Solution**:
1. Try again — the download packages the returned sections client-side (`src/lib/zipExport.ts`).
2. If the backend provided a signed `download_url`, the browser opens it directly; a popup blocker may need to be allowed.
3. Check the browser console for errors and report them if the issue persists.

---

## 7. Build or Test Failures

**Symptom**: `npm run build`, `npm run test`, or `npm run lint` fails.

**Solution**:
1. Ensure dependencies are installed: `npm install`.
2. Node.js v22+ is required.
3. Run the checks separately to isolate the failure:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
4. If the failure is in `src/__tests__/`, confirm `src/test/setup.ts` is present — it provides the test-environment shims used by the suite.
