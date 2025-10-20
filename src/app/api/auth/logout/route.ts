import { NextResponse } from 'next/server';
import { createSupabaseAuthClientForServer } from '@/app/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseAuthClientForServer(); // Gunakan ANON_KEY untuk auth

    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      return NextResponse.json(
        { message: 'Gagal logout', error: error.message },
        { status: 500 }
      );
    }

    // Session cookie akan dihapus oleh Supabase
    return NextResponse.json({ message: 'Logout berhasil' }, { status: 200 });

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("API POST /api/auth/logout Error:", error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server', error: errorMessage },
      { status: 500 }
    );
  }
}