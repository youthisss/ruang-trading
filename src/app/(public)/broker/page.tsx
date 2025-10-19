const brokerPage = () => {
    return (
        // Menggunakan bg-gray-50 untuk tampilan lebih cerah
        <main className="bg-gray-50 min-h-screen">
            {/* Mengurangi padding vertikal (py) di mobile dan membuatnya responsif */}
            <div className="container mx-auto px-4 py-20 sm:py-24 lg:py-32">
                <div className="text-center mb-12 sm:mb-16">
                    
                    {/* Judul: Font responsif, underline yang lebih tebal */}
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight 
                                 sm:text-4xl lg:text-5xl 
                                 underline underline-offset-8 decoration-6 decoration-orange-500">
                        Daftar Broker Dupoin Indonesia
                    </h1>

                    {/* Deskripsi: Menggunakan mt-4 yang standar */}
                    <p className="mt-4 max-w-4xl mx-auto text-base sm:text-lg text-gray-600">
                        Broker Dupoin Futures Indonesia berlisensi penuh dan diatur oleh BAPPEBTI dan anggota JFX dan KBI.
                    </p>
                </div>

                {/* Tombol Daftar Sekarang */}
                <div className="mt-10 sm:mt-12 flex justify-center">
                    <a 
                        href='https://i.dupoin.vip/rIwYumck7' 
                        // Lebar Penuh di mobile (w-full) tapi dibatasi di desktop (max-w-sm)
                        className="w-full max-w-sm bg-blue-600 text-center text-white 
                                   rounded-lg px-6 py-3 text-xl font-bold 
                                   hover:bg-blue-700 transition scale-105 ease-in-out duration-300
                                   sm:text-2xl"
                    >
                        Daftar Sekarang
                    </a>
                </div>
            </div>
        </main>
    )
}

export default brokerPage