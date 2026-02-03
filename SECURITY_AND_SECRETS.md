SECURITY AND SECRETS — quick guide

1) Immediate action (if a key is leaked)
   - Rotate the leaked key immediately in Supabase dashboard (Project → Settings → API → Regenerate keys).
   - Replace the key in your local and deployed environment variables and restart services.
   - If the service_role key was exposed, rotate it first — it can bypass RLS.

2) Local env files
   - You should never commit `.env` files or files containing real secrets.
   - Copy `.env.local.example` → `.env.local` and fill values locally.
   - We added `.env` and `.env.local` to `.gitignore` to prevent accidental commits.

3) Recommended variables (example)
   - VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (frontend, safe for browser if RLS enabled)
   - SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (server-only, never in client bundle)
   - DATABASE_URL (server-only)

4) How to set env vars in PowerShell (temporary for current session)
   $env:VITE_SUPABASE_URL = "https://xyz.supabase.co"
   $env:VITE_SUPABASE_ANON_KEY = "eyJ..."

5) How to set env vars permanently (Windows user-level)
   [Environment]::SetEnvironmentVariable('VITE_SUPABASE_URL','https://xyz.supabase.co','User')
   [Environment]::SetEnvironmentVariable('VITE_SUPABASE_ANON_KEY','eyJ...','User')

6) Git history cleanup (only if secrets were committed)
   - If a secret was committed, follow the recommended Git history purge steps (use `git-filter-repo` or BFG) and force-push the cleaned history. Coordinate with your team.

7) Admin credentials
   - Do not store admin passwords in the repository. Use environment variables or a secure secret store.

8) Next steps I can do for you
   - Add a README section with rotation steps tailored to your Supabase project.
   - Add serverless admin endpoint scaffolding so the frontend never needs service_role key.
