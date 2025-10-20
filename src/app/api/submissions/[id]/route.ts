import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseAuthClientForServer } from '@/app/lib/supabaseServer';

// --- Fungsi PATCH (dengan disable ESLint) ---
export async function PATCH(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  context: any // <<< ESLint diabaikan HANYA untuk baris ini
): Promise<NextResponse> {
  try {
    const { id } = context.params; 
    const { status } = await request.json();

    if (!status || !['Pending', 'Approved', 'Rejected'].includes(status)) {
      return NextResponse.json({ message: 'Status tidak valid' }, { status: 400 });
    }

    const supabase = await createSupabaseAuthClientForServer();

    const { data, error } = await supabase
      .from('submissions')
      .update({ status: status })
      .eq('id', id)
      .select();

    if (error) { throw error; }
    if (!data || data.length === 0) {
      return NextResponse.json({ message: 'Submission tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ message: "Status berhasil diperbarui!", data: data[0] }, { status: 200 });

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    if (error instanceof Error) { errorMessage = error.message; }
    console.error("API PATCH Error:", error);
    return NextResponse.json({ message: 'Gagal memperbarui status', error: errorMessage }, { status: 500 });
  }
}

// --- Fungsi DELETE (dengan disable ESLint) ---
export async function DELETE(
  request: NextRequest,
  context: any
): Promise<NextResponse> {
  try {
    const { id } = context.params;

    if (!id) {
       return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 });
    }

    const supabase = await createSupabaseAuthClientForServer();

    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', id);

    if (error) {
        console.error("Supabase delete error:", error);
        throw error;
    }

    return new NextResponse(null, { status: 204 });

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    if (error instanceof Error) { errorMessage = error.message; }
    console.error("API DELETE Error:", error);
    return NextResponse.json({ message: 'Gagal menghapus data', error: errorMessage }, { status: 500 });
  }
}