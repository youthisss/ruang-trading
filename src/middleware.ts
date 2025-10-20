import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseAuthClientForServer } from './app/lib/supabaseServer';

export async function middleware(request: NextRequest) {
  // Define the path that want to protected
  const protectedPaths = [
    '/api/users',
    '/api/submissions/',
  ];

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const supabase = await createSupabaseAuthClientForServer();
  
  if (!supabase) {
     console.error("Gagal membuat Supabase client di middleware.");
     return new NextResponse(
       JSON.stringify({ message: 'Konfigurasi server tidak valid.' }),
       { status: 500, headers: { 'Content-Type': 'application/json' } }
     );
  }

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized: Login diperlukan untuk mengakses halaman ini.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return NextResponse.next();
}


// Define the path that want to protected with this middleware
export const config = {
  matcher: [
    '/api/users/:path*',
    '/api/submissions/:path*',
  ],
};