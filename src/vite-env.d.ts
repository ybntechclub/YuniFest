/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly YUNIFEST_SUPABASE_URL: string;
  readonly YUNIFEST_SUPABASE_ANON_KEY: string;
  readonly YUNIFEST_GOOGLE_DRIVE_SCRIPT_URL?: string;
  readonly YUNIFEST_ADMIN_EMAIL?: string;
  readonly YUNIFEST_ADMIN_PASSWORD?: string;
  readonly YUNIFEST_WHATSAPP_CHANNEL_URL?: string;
  readonly YUNIFEST_RESEND_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
