import Image from "next/image";

const KonsultanEdukasiPage = () => {
    return (
        <>
            <div className="pt-32 pb-16 bg-gray-100 flex flex-col justify-center items-center min-h-screen sm:pt-40">
                
                {/* Judul Utama */}
                <h1 className="text-3xl text-center mb-6 font-bold text-gray-900 
                             sm:text-5xl underline underline-offset-8 decoration-4 decoration-orange-600">
                    Konsultan Edukasi
                </h1>
                
                <h2 className="text-center text-lg font-bold text-gray-600 mb-8 sm:text-xl">
                    Pilih Salah Satu Konsultan:
                </h2>
                
                {/* Container Kartu Profile */}
                <div className="bg-white border border-gray-400 rounded-lg w-11/12 max-w-xl p-4 drop-shadow-lg 
                            sm:p-6"> {/* Padding disesuaikan untuk mobile */}
                    
                    {/* Konten Profile: Menggunakan flex-col di mobile, flex-row di sm: */}
                    <div className="flex flex-col items-center gap-4 text-center 
                                sm:flex-row sm:items-center sm:gap-6 sm:text-left">
                        
                        {/* Gambar Profile */}
                        <Image 
                            alt="Profile Sigit Istiawan" 
                            src="/profile-sigit.jpg" 
                            width={72} // Ukuran lebih kecil untuk mobile
                            height={72} 
                            className="rounded-full object-cover border-4 border-orange-600 sm:w-20 sm:h-20"
                        />
                        
                        {/* Teks dan Tombol Wrapper */}
                        {/* Menggunakan flex-1 agar mengambil sisa ruang dan memastikan tombol ada di bawah */}
                        <div className="flex flex-col items-center sm:items-start flex-1 gap-2">
                            <h3 className="text-xl text-gray-900 font-bold sm:text-2xl">
                                Sigit Istiawan
                            </h3>
                            
                            {/* Tombol Chat Sekarang */}
                            <a 
                                href="https://wa.me/6282110211821" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                // Tombol full-width di mobile, lalu dibatasi di sm:
                                className="w-full text-center sm:w-auto text-white font-bold 
                                           px-5 py-3 bg-blue-600 rounded-full hover:bg-blue-500 
                                           transition-colors duration-300 text-base"
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