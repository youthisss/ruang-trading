import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseClientForServer() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Supabase URL or Service Role Key was not found in env.");
    console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "SET" : "MISSING");
    console.error("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceRoleKey ? "SET" : "MISSING");
    throw new Error("Konfigurasi Supabase tidak lengkap. Cek variabel lingkungan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createServerClient(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      cookies: {
        get: async (name: string) => {
          const cookie = await cookieStore.get(name);
          return cookie?.value;
        },
        set: async (name: string, value: string, options: CookieOptions) => {
          try {
            await cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error(error instanceof Error ? error.message : 'Failed to set cookie');
          }
        },
        remove: async (name: string, options: CookieOptions) => {
          try {
            await cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            console.error(error instanceof Error ? error.message : 'Failed to remove cookie');
          }
        },
      },
    }
  );
}

export async function createSupabaseAuthClientForServer() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL atau Anon Key tidak ditemukan di environment variables untuk auth.");
    console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "SET" : "MISSING");
    console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "SET" : "MISSING");
    throw new Error("Konfigurasi Supabase untuk auth tidak lengkap. Cek NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: async (name: string) => {
          const cookie = await cookieStore.get(name);
          return cookie?.value;
        },
        set: async (name: string, value: string, options: CookieOptions) => {
          try {
            await cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error(error instanceof Error ? error.message : 'Failed to set cookie');
          }
        },
        remove: async (name: string, options: CookieOptions) => {
          try {
            await cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            console.error(error instanceof Error ? error.message : 'Failed to remove cookie');
          }
        },
      },
    }
  );
}