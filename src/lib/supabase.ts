import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");

/**
 * Public, read-only client (anon key). Honours RLS, so it can only ever
 * read published posts. Safe to use in public Server Components.
 */
export function publicClient(): SupabaseClient {
  if (!anonKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(url!, anonKey, { auth: { persistSession: false } });
}

/**
 * Admin client (service-role key). Bypasses RLS — for dashboard writes and
 * image uploads only. SERVER ONLY: never import into a Client Component.
 */
export function adminClient(): SupabaseClient {
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local (Supabase Dashboard → Project Settings → API → service_role) and restart the dev server."
    );
  }
  return createClient(url!, serviceKey, { auth: { persistSession: false } });
}

export const BLOG_BUCKET = "blog-images";
