// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseAuthClientForServer } from '@/app/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseAuthClientForServer();

    // Coba login pake Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return NextResponse.json(
        { message: 'Email atau password salah', error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Login berhasil', user: data.user },
      { status: 200 }
    );

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("API POST /api/auth/login Error:", error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server', error: errorMessage },
      { status: 500 }
    );
  }
}