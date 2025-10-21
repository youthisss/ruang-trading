import { NextResponse } from 'next/server';
import { createSupabaseClientForServer } from '@/app/lib/supabaseServer';

export async function GET(_request: Request) { 
  try {
    const supabase = await createSupabaseClientForServer();
    const { data: users, error } = await supabase
      .from('submissions') 
      .select('*')         
      .order('created_at', { ascending: false }); 

    if (error) {
      throw error; 
    }
    return NextResponse.json({ users: users }, { status: 200 }); 

  } catch (error: unknown) {
    let errorMessage = "Error tidak diketahui."
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    console.error("Error fetching users:", error);
    return NextResponse.json( 
      { message: 'Failed to fetch users', error: errorMessage },
      { status: 500 }
    );
  }
} 