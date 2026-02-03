import { createClient } from '@supabase/supabase-js';

// Get env vars from .env.local
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log('🔍 Environment Variables Check:');
console.log('VITE_SUPABASE_URL:', url);
console.log('VITE_SUPABASE_ANON_KEY exists:', !!anonKey);
console.log('VITE_SUPABASE_ANON_KEY length:', anonKey?.length);

if (!url || !anonKey) {
  console.error('❌ CRITICAL: Supabase credentials are missing!');
  console.error('URL:', url);
  console.error('Key exists:', !!anonKey);
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
  console.log('🔐 Supabase auth event:', event, 'Session:', session?.user?.id);
});

// Log client initialization
console.log('✅ Supabase client initialized successfully');

export default supabase;
