'use client'

// 1. Impor useState dan FormEvent
import { useState, type FormEvent } from 'react';
// 2. Path import sudah diperbaiki
import { useModal } from '@/app/(public)/context/ModcalContext'; 

export default function LoginModal() {
  const { isModalOpen, closeModal } = useModal();

  // 3. Buat state untuk setiap input
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null); // State error umum

  // 4. Buat fungsi handleSubmit untuk mengirim data
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Mencegah browser me-refresh halaman
    setIsSubmitting(true);
    setError(null); // Bersihkan error lama

    try {
      const response = await fetch('/api/join', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, whatsapp }),
      });

      // --- START: Pemeriksaan Email Duplikat (Status 409) ---
      if (response.status === 409) {
        // Jika backend mengembalikan status 409 (Conflict)
        const result = await response.json();
        // Tampilkan alert spesifik untuk email duplikat
        alert(result.message || 'Email ini sudah terdaftar.'); 
        setError('Email ini sudah terdaftar.'); // Juga set state error (opsional)
        return; // Hentikan fungsi di sini, jangan redirect
      }
      // --- END: Pemeriksaan Email Duplikat ---

      // Jika BUKAN 409, periksa error lainnya
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal mengirim data');
      }
      
      // Jika sukses (bukan 409 dan OK), lakukan redirect
      window.location.href = 'https://i.dupoin.vip/rIwYumck7'; 

    } catch (err: unknown) {
      // Tangkap error (dari throw di atas atau error jaringan)
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
      setError(errorMessage); // Tampilkan error umum di form
      // Anda bisa juga menampilkan alert error umum di sini jika mau
      // alert(`Error: ${errorMessage}`); 
    } finally {
      setIsSubmitting(false); // Selalu hilangkan loading state
    }
  };

  if (!isModalOpen) {
    return null; 
  }

  return (
    <div 
      onClick={closeModal}
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg relative text-gray-800"
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {/* ... ikon X ... */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            Gabung Komunitas <span className="text-blue-600">GRATIS</span>
          </h2>
          <p className="text-gray-500 mt-2">Isi Form dibawah ini</p>
        </div>

        {/* 5. Hubungkan form ke handleSubmit */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="nama" className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Anda *
              </label>
              {/* 6. Hubungkan input ke state */}
              <input 
                type="text" 
                id="nama" 
                placeholder="Masukan Nama Terbaik Anda" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Aktif *
              </label>
              <input 
                type="email" 
                id="email" 
                placeholder="Masukan Email Aktif Anda" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-2">
                No. Whatsapp *
              </label>
              <input 
                type="tel"
                id="whatsapp" 
                placeholder="Masukan No. Whatsapp Anda" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
              />
            </div>
          </div>
          
          {/* Tampilkan pesan error jika ada (termasuk error duplikat jika di set) */}
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-orange-600 text-white rounded-lg py-4 mt-8 font-bold transition duration-300 hover:bg-orange-700 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Mengirim...' : (
              <>
                <span className="block text-xl">Gabung Sekarang</span>
                <span className="block text-xs font-normal">GRATIS 100%</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}