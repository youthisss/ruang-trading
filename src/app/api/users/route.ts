import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient';

export async function GET(_request: Request) { 
  try {
    const { data: users, error } = await supabase
      .from('submissions') 
      .select('*')         
      .order('created_at', { ascending: false }); 

    if (error) {
      throw error; 
    }
    return NextResponse.json({ users: users }, { status: 200 }); 

  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: 'Failed to fetch users', error: errorMessage },
      { status: 500 }
    );
  }
}