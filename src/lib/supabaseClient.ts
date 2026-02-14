import { createClient } from '@supabase/supabase-js';

// Get env vars from .env.local
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging removed for production

if (!url || !anonKey) {
  console.error('❌ CRITICAL: Supabase credentials are missing!');
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Monitor connection status
supabase.auth.onAuthStateChange((event, session) => {
  // Silent auth state change
});

export default supabase;
