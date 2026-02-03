import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  // Vite env
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  // Next or fallback
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';

const SUPABASE_ANON_KEY =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);