# Free-plan operations

These procedures keep PRDSprint maintainable without paid Supabase features.

## Manual database backup

Before applying database changes, run:

```powershell
$env:SUPABASE_PROJECT_REF = "tywjykawhzltkqabuwwx"
npm run backup:db
```

The script uses the Supabase CLI to create a timestamped SQL dump in `backups/`.
Keep backups outside Supabase and do not commit them to the repository. The
`backups/` directory is ignored by Git.

## Storage and database growth

- Keep generated ZIP files in `prd-exports` and avoid storing duplicate exports.
- Review Storage usage before launch campaigns.
- Review database size monthly, especially `generations`, `credit_transactions`,
  and `admin_audit_logs`.
- Do not delete records automatically until a retention period has been chosen.

## Failure monitoring

Generation failures and refund results are persisted in `generations`, including
status, error code, error message, provider usage, duration, and refund fields.
Use the admin generations and system-health screens to review failures before
deleting or retrying anything.

## Free-plan pausing

Supabase Free projects can pause after prolonged inactivity. This is platform
behavior and cannot be fixed in application code. Open the project before a
demo or launch event and verify the health status.
