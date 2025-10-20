const brokerPage = () => {
    return (
        // Tambahkan 'relative' agar div background terikat pada main
        <main className="relative min-h-screen flex flex-col">
            <div className="absolute inset-0 z-[-1] bg-gray-200 lg:bg-[url('/bg-broker.jpg')] bg-cover bg-fixed bg-center brightness-30"></div>
            {/* Gunakan flex-grow agar container ini mengisi sisa ruang vertikal */}
            <div className="container mx-auto px-4 flex flex-col justify-center items-center flex-grow py-20">
                
                <div className="text-center mb-8"> {/* Mengurangi mb-12 di mobile */}
                    
                    {/* Judul: Font mobile (3xl) dan underline yang lebih wajar */}
                    <h1 className="text-3xl font-bold text-white tracking-tight 
                                 underline decoration-4 decoration-orange-600 
                                 sm:text-4xl lg:text-5xl lg:underline-offset-30"> {/* <<< Styling mobile diutamakan, styling PC (lg:) tetap ada */}
                        Daftar Broker Dupoin Indonesia
                    </h1>
                    
                    {/* Deskripsi: Menggunakan mt-5 sebagai default (mobile) */}
                    <p className="mt-10 max-w-4xl mx-auto text-base text-gray-300 
                              sm:text-lg lg:mt-15"> {/* <<< Menggunakan mt-5 (mobile), mt-15 (punya Anda) tetap ada */}
                        Broker Dupoin Futures Indonesia berlisensi penuh dan diatur oleh BAPPEBTI dan anggota JFX dan KBI.
                    </p>
                </div>
                
                {/* Tombol Daftar Sekarang */}
                <div className="mt-10 flex justify-center">
                    <a 
                        href='https://i.dupoin.vip/rIwYumck7' 
                        // Wajib full-width di mobile, lalu dibatasi di PC
                        className="w-full max-w-sm bg-blue-600 text-center text-white 
                                   rounded-lg px-6 py-3 text-xl font-bold 
                                   hover:bg-blue-700 transition duration-300 
                                   sm:text-2xl 
                                   lg:max-w-md lg:scale-110 lg:ease-in-out lg:delay-150 lg:duration-150" 
                    >
                        Daftar Sekarang
                    </a>
                </div>
            </div>
        </main>
    )
}

export default brokerPage