import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseAuthClientForServer } from './app/lib/supabaseServer';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected paths - API routes and admin pages
  const protectedApiPaths = [
    '/api/users',
    '/api/submissions',
  ];

  const protectedPagePaths = [
    '/admin',
  ];

  // Check if current path is protected
  const isProtectedApi = protectedApiPaths.some(path => 
    pathname.startsWith(path)
  );

  const isProtectedPage = protectedPagePaths.some(path => 
    pathname.startsWith(path)
  );

  // If not protected, allow access
  if (!isProtectedApi && !isProtectedPage) {
    return NextResponse.next();
  }

  // Create Supabase client
  const supabase = await createSupabaseAuthClientForServer();
  
  if (!supabase) {
    console.error("Gagal membuat Supabase client di middleware.");
    
    // For page requests, redirect to login
    if (isProtectedPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // For API requests, return JSON error
    return new NextResponse(
      JSON.stringify({ message: 'Konfigurasi server tidak valid.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check authentication
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    console.log(`Unauthorized access attempt to: ${pathname}`);
    
    // For page requests, redirect to login
    if (isProtectedPage) {
      const loginUrl = new URL('/login', request.url);
      // Optional: add redirect parameter to return after login
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // For API requests, return 401 JSON
    return new NextResponse(
      JSON.stringify({ 
        message: 'Unauthorized: Login diperlukan untuk mengakses resource ini.' 
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

// Define the paths that should be protected by this middleware
export const config = {
  matcher: [
    '/api/users/:path*',
    '/api/submissions/:path*',
    '/admin/:path*',  // ✅ Added admin pages protection
  ],
};