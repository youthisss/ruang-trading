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
    }

    // Get all cookies
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    console.log('All cookies:', allCookies.map(c => c.name));

    // Create response
    const response = NextResponse.json(
      { message: 'Logout berhasil', success: true },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );

    // Delete cookies using Set-Cookie headers
    allCookies.forEach(cookie => {
      // Set cookie with expired date to delete it
      response.cookies.set({
        name: cookie.name,
        value: '',
        maxAge: -1,
        expires: new Date(0),
        path: '/',
        sameSite: 'lax',
      });
      
      console.log(`Set-Cookie header added for: ${cookie.name}`);
    });

    console.log('Logout successful - cookies deletion headers set');

    return response;

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