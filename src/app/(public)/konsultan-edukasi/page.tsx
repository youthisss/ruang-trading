import Image from "next/image";

const KonsultanEdukasiPage = () => {
    return (
        <>
            <div className="pt-40 pb-32 bg-gray-100 flex flex-col justify-center items-center min-h-screen">
                
                <h1 className="text-center text-5xl mb-10 font-bold text-gray-900 underline underline-offset-8 decoration-4 decoration-orange-600">
                    Konsultan Edukasi
                </h1>
                <h2 className="text-center text-xl font-bold text-gray-600 mb-10">
                    Pilih Salah Satu Konsultan:
                </h2>
                
                {/* Container Kartu Profile: max-w-lg tetap untuk PC */}
                <div className="bg-white border border-gray-400 rounded-lg w-full max-w-lg p-6 drop-shadow-lg">
                    
                    {/* >>> PERUBAHAN DI SINI: Default (Mobile) menjadi flex-col/tumpukan vertikal.
                         Gunakan md: untuk mempertahankan flex-row di PC/Desktop. <<< */}
                    <div className="flex flex-col items-center gap-4 text-center 
                                 md:flex-row md:items-center md:gap-5 md:ml-5 md:text-left">
                        
                        {/* Gambar Profile */}
                        <Image 
                            alt="Profile Sigit Istiawan" 
                            src="/profile-sigit.jpg" 
                            width={80} // Ukuran PC default
                            height={80} 
                            className="rounded-full object-cover border-4 border-orange-600"
                        />
                        
                        {/* Wrapper Teks & Tombol */}
                        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:flex-1 md:justify-between">
                            
                            {/* Nama Konsultan */}
                            <h3 className="text-2xl text-gray-900 font-bold">
                                Sigit I Istiawan
                            </h3>
                            
                            {/* Tombol Chat Sekarang */}
                            <a 
                                href="https://wa.me/6282110211821" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                // Tombol full-width di mobile, dibatasi di PC (md:w-auto)
                                className="w-full text-center text-white font-bold 
                                           px-5 py-3 bg-blue-600 rounded-full hover:bg-blue-500 
                                           transition-colors duration-300 text-base 
                                           md:w-auto"
                            >
                                Chat Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default KonsultanEdukasiPage;