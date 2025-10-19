const brokerPage = () => {
    return (
        <main className="bg-gray-100 min-h-screen lg:mt-15">
            {/* Mengurangi padding vertikal dan membuatnya responsif */}
            <div className="container mx-auto px-4 py-28 sm:py-32">
                <div className="text-center mb-12">
                    {/* Menggunakan ukuran font dan spasi yang lebih wajar & responsif */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight underline underline-offset-20 decoration-6 decoration-orange-500">Daftar Broker Dupoin Indonesia</h1>
                    <p className="mt-15 max-w-4xl mx-auto text-lg sm:text-lg text-gray-600">Broker Dupoin Futures Indonesia berlisensi penuh dan diatur oleh BAPPEBTI dan anggota JFX dan KBI.</p>
                </div>
                {/* Membatasi lebar tombol dan menempatkannya di tengah */}
                <div className="mt-10 flex justify-center">
                    <a href='https://i.dupoin.vip/rIwYumck7' className="w-full max-w-md bg-blue-600 text-center text-white rounded-lg px-6 py-4 text-xl sm:text-2xl font-bold hover:bg-blue-700 transition scale-110 ease-in-out delay-150 duration-150">Daftar Sekarang</a>
                </div>
            </div>
        </main>
    )
}

export default brokerPage