'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
// 1. PERBAIKI TYPO DAN PATH IMPORT CONTEXT (sesuaikan jika perlu)
import { useModal } from "@/app/(public)/context/ModcalContext"; 
import Link from "next/link"; // <<< 2. IMPOR KOMPONEN LINK

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const { openModal } = useModal();

    return (
        <header className={`${isScrolled ? 'bg-white/40 backdrop-blur-sm shadow-md' : 'bg-white'} fixed top-0 left-0 w-full flex items-center z-10 transition-all duration-300`}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between relative">
                    <div className="px-4">
                        {/* 3. GUNAKAN KOMPONEN <Link> UNTUK LOGO */}
                        <Link href="/#Home" className="block py-4"> 
                            <Image src="/logo-rt.png" alt="Logo Ruang Trading" width={100} height={10} />
                        </Link>
                    </div>
                    <nav>
                        <ul className="flex text-[17px]">
                            {/* 3. GUNAKAN KOMPONEN <Link> UNTUK ITEM NAVIGASI */}
                            <li className="group">
                                <Link href="/#Home" className=" text-black py-2 mx-5 flex font-semibold hover:underline underline-offset-8 decoration-orange-600 decoration-2">
                                    home
                                </Link>
                            </li>
                            <li className="group">
                                <Link href="/konsultan-edukasi" className=" text-black py-2 mx-5 flex font-semibold hover:underline underline-offset-8 decoration-orange-600 decoration-2">
                                    konsultan Edukasi
                                </Link>
                            </li>
                            <li className="group">
                                <Link href="/#Layanan" className=" text-black py-2 mx-5 flex font-semibold hover:underline underline-offset-8 decoration-orange-600 decoration-2">
                                    komunitas
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-right px-4 gap-3">
                        <button onClick={openModal} className="flex items-center text-white font-bold px-5 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300">
                            Join Sekarang
                        </button>
                        {/* 4. Link eksternal (WA) tetap pakai <a> */}
                        <a href="https://wa.me/6282110211821" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white font-bold px-5 py-3 bg-orange-600 rounded-full hover:bg-orange-700 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth='1px' stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            <span>+62 821-1021-1821</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar