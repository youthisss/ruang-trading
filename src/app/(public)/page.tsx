'use client'

import Image from "next/image";
import ValueCard from "./components/ValueCard";
import { servicesData } from "./components/InfoCard";

const HomePage = () => {
  return (
    <>
      <section id='Home' className="relative text-white pt-32 pb-20 lg:pt-48 lg:pb-28">
        <div className="absolute inset-0 z-[-1] bg-slate-900 lg:bg-[url('/bg-1.png')] bg-cover bg-fixed bg-center brightness-30"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left lg:ml-20">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Raih Profit Konsisten<br />
                Bersama <span className="text-blue-600">Sigit I Istiawan</span>
              </h1>
              <p className="text-orange-600 font-semibold mb-5 text-2xl">&ldquo;Your Partner in Financial Freedom&ldquo;</p>
              <p className="text-lg font-normal opacity-90 mb-10 max-w-lg mx-auto lg:mx-0">
                Dapatkan Signal Gratis Akurat Secara Realtime
              </p>
              <a href="#Layanan" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition duration-300 hover:bg-blue-500 hover:scale-105 ease-in-out ">
                Join Komunitas
              </a>
            </div>
            <div className="w-full">
              <Image alt="trading setup" src="/phone-1.png" width={300} height={100} className="max-w-full mx-auto" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
            <div className="flex justify-center">
              <Image alt="profile" src="/profile-sigit.jpg" width={400} height={400} className="rounded-full shadow-lg ring-8 ring-orange-600 ring-offset-8 ring-offset-white"></Image>
            </div>
            <div className="w-full text-center lg:text-left">
              <h2 className="text-base font-bold text-blue-600 mb-1 tracking-wider">PERKENALKAN NAMA SAYA</h2>
              <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3 relative pb-4 inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-orange-600">
                Sigit I Istiawan
              </h3>
              <p className="font-semibold text-2xl text-blue-600 mb-3">&ldquo;Your Partner in Financial Freedom&ldquo;</p>
              <p className="font-medium text-gray-600 leading-relaxed">
                Sejak tahun 2013, saya telah menekuni dunia trading sebagai jalan menuju kebebasan finansial. Berawal dari rasa penasaran terhadap pasar saham dan forex, saya mulai belajar secara otodidak, membaca buku-buku investasi, mengikuti seminar, dan mencoba berbagai strategi di akun demo.
                Tahun-tahun awal dipenuhi dengan tantangan—kerugian, kesalahan analisis, emosi yang belum stabil dan bahkan pernah sampai mengalami MC ( Margin Call ). Namun, dari setiap kegagalan, saya belajar disiplin, manajemen risiko, dan pentingnya psikologi trading. Perlahan, strategi yang saya kembangkan mulai menunjukkan hasil positif.
                Pada 2016, saya mulai aktif membagikan pengalaman dan edukasi melalui media sosial dan komunitas trader lokal. saya percaya bahwa trading bukan soal cepat kaya, melainkan soal konsistensi, pembelajaran, dan pengendalian diri.
                Kini, dengan lebih dari satu dekade pengalaman, saya dikenal sebagai trader yang mengedepankan pendekatan teknikal dan fundamental yang seimbang. saya juga aktif menjadi mentor bagi trader pemula, membantu mereka membangun mindset dan strategi yang sehat.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-900 py-24 pb-40 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">INFORMASI DARI KOMUNITAS</h2>
            <p className="text-blue-600 mt-2 font-semibold text-lg">APA SAJA YANG KAMU DAPATKAN.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative w-full h-52">
                  <Image src={service.imageUrl} alt={service.title} layout="fill" objectFit="cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 text-base">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pt-44 bg-white pb-40">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
            <div className="text-center lg:text-left lg:ml-10">
                <h2 className="text-gray-800 text-[40px] font-bold leading-10 mb-16">Signal Trading Akurat<br />
                  <span className="underline underline-offset-15 decoration-4 decoration-orange-600">Setiap Hari</span>
                </h2>
                <h3 className="text-[18px] text-gray-800 font-semibold">Dapatkan Signal Trading Akurat setiap harinya dari Sigit Istiawan. Signal lengkap dengan:</h3>
                <ul className="mt-6 ml-6 space-y-3 text-[18px] text-gray-800 font-semibold mb-16">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-blue-600 mr-3 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Harga Entry</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-blue-600 mr-3 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Harga Stoploss</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-blue-600 mr-3 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Harga Target Profit</span>
                  </li>
                </ul>
                <a href="#Layanan" className="bg-blue-600 hover:bg-blue-800 transition-colors duration-300 px-8 py-5 text-[20px] font-bold text-white rounded-full">
                  Dapatkan Signal GRATIS
                </a>
            </div>
            <div className="relative flex justify-center items-center h-full overflow-hidden">
              <div className="absolute z-0">
                <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="ml-6">
                  <path fill="#3b82f6" d="M65.9,-21.6C74.6,5.4,63.5,38.7,40.1,55.9C16.6,73,-19,74.1,-43.3,57.1C-67.5,40,-80.4,4.8,-71.3,-22.7C-62.2,-50.2,-31.1,-70,-1.3,-69.6C28.6,-69.2,57.2,-48.5,65.9,-21.6Z" transform="translate(100 100)" />
                </svg>
              </div>
              <Image alt="gadget" src="/asset-7.png" width={450} height={450} className="relative z-2 mt-16"></Image>
            </div>
          </div>
        </div>
      </section>
      <section id="Layanan">
        <ValueCard />
      </section>
    </>
  )
}

export default HomePage;