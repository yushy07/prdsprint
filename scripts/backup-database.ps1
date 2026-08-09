param(
  [string]$OutputDirectory = "backups"
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
  throw "Supabase CLI is required. Install it from https://supabase.com/docs/guides/cli"
}

$projectRef = if ($env:SUPABASE_PROJECT_REF) { $env:SUPABASE_PROJECT_REF } else { "tywjykawhzltkqabuwwx" }
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = Join-Path $OutputDirectory "supabase-$projectRef-$timestamp.sql"

New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
supabase db dump --project-ref $projectRef --file $backupPath

Write-Host "Database backup created at $backupPath"
Write-Host "Store this file outside Supabase and do not commit it if it contains sensitive data."
