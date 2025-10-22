import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseClientForServer() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // ← Tanpa NEXT_PUBLIC_!

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Supabase URL or Service Role Key was not found in env.");
    throw new Error("Konfigurasi Supabase tidak lengkap.");
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
          } catch (error: unknown) {
            let errorMessage = "Error tidak diketahui."
            if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
            console.error(errorMessage)
          }
        },
        remove: async (name: string, options: CookieOptions) => {
          try {
            await cookieStore.set({ name, value: '', ...options });
          } catch (error: unknown) {
            let errorMessage = "Error tidak diketahui."
            if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
            console.error(errorMessage)
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
    console.error("Supabase URL atau Anon Key tidak ditemukan.");
    throw new Error("Konfigurasi Supabase untuk auth tidak lengkap.");
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
          } catch (error: unknown) {
            let errorMessage = "Error tidak diketahui."
            if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
            console.error(errorMessage)
          }
        },
        remove: async (name: string, options: CookieOptions) => {
          try {
            await cookieStore.set({ name, value: '', ...options });
          } catch (error: unknown) {
            let errorMessage = "Error tidak diketahui."
            if (error instanceof Error) {
            errorMessage = error.message;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
            console.error(errorMessage)
          }
        },
      },
    }
  );
}