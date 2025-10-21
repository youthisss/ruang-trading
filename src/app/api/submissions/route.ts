import { NextResponse } from 'next/server';
import { createSupabaseClientForServer } from '@/app/lib/supabaseServer';

// GET - Fetch all submissions
export async function GET() {
  try {
    console.log('=== API /api/submissions GET called ===');
    console.log('Environment check:', {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    const supabase = await createSupabaseClientForServer();
    
    if (!supabase) {
      console.error('Failed to create Supabase client');
      return NextResponse.json(
        { message: 'Gagal membuat koneksi ke database' },
        { status: 500 }
      );
    }

    console.log('Supabase client created successfully');

    // Fetch data dari table submissions
    console.log('Querying submissions table...');
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    console.log('Query successful, rows:', data?.length || 0);

    return NextResponse.json({ 
      users: data || [], // Gunakan 'users' karena dashboard expect data.users
      success: true 
    }, { status: 200 });

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    let errorDetails = {};
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack?.substring(0, 500), // Limit stack trace
      };
    }
    
    console.error('=== API GET Error ===');
    console.error('Error message:', errorMessage);
    console.error('Error details:', errorDetails);
    console.error('Full error:', error);
    
    return NextResponse.json(
      { 
        message: 'Gagal mengambil data submissions', 
        error: errorMessage,
        details: errorDetails 
      },
      { status: 500 }
    );
  }
}

// POST - Create new submission (optional, untuk Add New button)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, status = 'Pending' } = body;

    // Validasi input
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Name dan email wajib diisi' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseClientForServer();

    if (!supabase) {
      return NextResponse.json(
        { message: 'Gagal membuat koneksi ke database' },
        { status: 500 }
      );
    }

    // Insert data baru
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          name,
          email,
          whatsapp,
          status,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return NextResponse.json(
      { message: 'Submission berhasil dibuat!', data: data[0] },
      { status: 201 }
    );

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('API POST Error:', error);
    return NextResponse.json(
      { message: 'Gagal membuat submission', error: errorMessage },
      { status: 500 }
    );
  }
}