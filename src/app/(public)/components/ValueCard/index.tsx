'use client'

import React from 'react';
import { useModal } from '@/app/(public)/context/ModcalContext';

const features = [
    { id: 1, text: 'Signal Trading Akurat', value: 'Rp 450.000' },
    { id: 2, text: 'Group Diskusi', value: 'Rp 876.000' },
    { id: 3, text: 'Video Edukasi Lengkap', value: 'Rp 933.000' },
];

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ValueCard = () => {
  const { openModal } = useModal();
    return (
    <div className="bg-gray-900 flex flex-col items-center justify-center py-36 px-4"> 
    <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full max-w-2xl p-8 sm:p-10">
        <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 tracking-wide">Gabung Sekarang</h1>
            <p className="text-md  font-semibold text-blue-600 tracking-widest mt-2 mb-16">
            MANFAAT EKSKLUSIF SEUMUR HIDUP
            </p>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8">Ini yang Anda dapatkan:</h2>
        <ul className="space-y-3 mb-16">
        {features.map((feature) => (
            <li key={feature.id} className="flex items-center text-gray-600 text-lg">
                <CheckIcon />
                <span className="flex-grow">{feature.text}</span>
                <span className="text-lg text-gray-400 line-through">{`Value ${feature.value}`}</span>
            </li>
            ))}
        </ul>
        <hr className="my-6 mb-16  mt-16 border-gray-800" />
        <div className="text-center">
            <p className="text-5xl font-bold text-gray-800 mb-5">Rp 0 / GRATIS</p>
        </div>
        <button 
            onClick={openModal}
            className="bg-orange-600 text-white text-xl tracking-wider w-full font-bold py-3 rounded-lg hover:bg-orange-500 hover:scale-105 ease-in-out  transition duration-300 mt-8"
        >
        GABUNG SEKARANG
            <span className="block text-md font-semibold">GRATIS</span>
        </button>
        </div>
    </div>
    );
};

export default ValueCard;