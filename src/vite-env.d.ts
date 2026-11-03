/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly YUNIFEST_SUPABASE_URL: string;
  readonly YUNIFEST_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
