import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient'; // Pastikan path ini benar

export async function POST(request: Request) {
  try {
    const { nama, email, whatsapp, status } = await request.json();

    if (!nama || !email) {
      return NextResponse.json({ message: 'Nama dan Email wajib diisi' }, { status: 400 });
    }

    // --- START: Pemeriksaan Email Duplikat ---
    // Coba cari data yang emailnya sama
    const { data: existingSubmission, error: checkError } = await supabase
      .from('submissions')
      .select('email') // Hanya perlu cek email
      .eq('email', email) // Cari email yang sama persis
      .maybeSingle(); // Ambil satu baris (atau null), jangan error jika tidak ada

    // Tangani jika ada error saat memeriksa email
    if (checkError) {
        console.error("Supabase check email error:", checkError);
        // Lempar error agar ditangkap oleh blok catch di bawah
        throw new Error('Gagal memeriksa email di database'); 
    }

    // Jika existingSubmission BUKAN null (artinya email ditemukan)
    if (existingSubmission) {
      // Kembalikan respons spesifik untuk email duplikat
      return NextResponse.json(
        { message: 'Email ini sudah terdaftar.' }, // Pesan ini akan muncul di alert frontend
        { status: 409 } // Status 409 Conflict
      );
    }


    // Jika email belum ada, lanjutkan proses penyimpanan
    const { data, error: insertError } = await supabase
      .from('submissions')
      .insert([
        {
          name: nama,       
          email: email, 
          whatsapp: whatsapp, 
          status: status || 'Pending' 
        }
      ])
      .select();

    // Tangani jika ada error saat menyimpan
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw insertError; 
    }

    // Jika berhasil menyimpan
    return NextResponse.json(
      { message: "Pendaftaran Berhasil!", data: data },
      { status: 201 } // Status 201 Created
    );

  } catch (error: unknown) {
    let errorMessage = 'Error tidak diketahui';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("API POST /api/join Error:", error);
    return NextResponse.json(
      // Pesan error umum jika terjadi kesalahan tak terduga
      { message: 'Terjadi kesalahan pada server', error: errorMessage },
      { status: 500 }
    );
  }
}