import { NextResponse } from 'next/server';
import { createSupabaseAuthClientForServer } from '@/app/lib/supabaseServer';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    console.log('=== Logout API called ===');
    
    const supabase = await createSupabaseAuthClientForServer();

    if (!supabase) {
      console.error('Failed to create Supabase client');
      return NextResponse.json(
        { message: 'Gagal membuat koneksi' },
        { status: 500 }
      );
    }

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Supabase logout error:', error);
      // Lanjutkan meskipun ada error - tetap hapus cookies
    }

    // Manually delete all Supabase cookies
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    console.log('Clearing cookies...');
    
    // Delete all auth-related cookies
    allCookies.forEach(cookie => {
      if (
        cookie.name.includes('sb-') || 
        cookie.name.includes('supabase') || 
        cookie.name.includes('auth-token')
      ) {
        try {
          cookieStore.delete(cookie.name);
          console.log(`Deleted cookie: ${cookie.name}`);
        } catch (e) {
          console.error(`Failed to delete cookie ${cookie.name}:`, e);
        }
      }
    });

    console.log('Logout successful');

    return NextResponse.json(
      { message: 'Logout berhasil', success: true },
      { 
        status: 200,
        headers: {
          // Prevent caching
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        }
      }
    );

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('=== API POST /api/auth/logout Error ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server', error: errorMessage },
      { status: 500 }
    );
  }
}