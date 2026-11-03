import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.YUNIFEST_SUPABASE_URL || 
  'https://qopryjdzqylsjgymilyq.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.YUNIFEST_SUPABASE_ANON_KEY || 
  'sb_publishable_GZjdltnPumuRu4C7qqw1lw_FkQxbS5D';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
