'use client'

import React, { useMemo } from 'react';
import { useModal } from '@/app/(public)/context/ModcalContext';

const plans = [
  {
    name: 'Komunitas Gratis',
    price: '100% GRATIS',
    isRecommended: false,
    features: [
      { text: 'Signal Trading Akurat', value: 450000 },
      { text: 'Group Diskusi', value: 1000000 },
      { text: 'Video Edukasi Lengkap', value: 700000 },
    ],
    buttonText: 'Gabung Sekarang',
    action: 'openModal',
  },
  {
    name: 'Komunitas VIP',
    price: 'Rp 2.000.000',
    isRecommended: true,
    features: [
      { text: 'Semua di Paket Gratis', value: 2150000 },
      { text: 'Expert Advisor (EA) berbasis AI', value: 1200000 },
      { text: 'Konsultasi Portofolio Privat', value: 1500000 },
      { text: 'Akses Penuh Materi Premium', value: 1000000 },
    ],
    buttonText: 'Hubungi Admin',
    action: 'whatsapp',
  },
];

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

const PlanCard = ({ plan, onButtonClick }: { plan: typeof plans[0], onButtonClick: () => void }) => {
  const totalValue = useMemo(() => plan.features.reduce((sum, feature) => sum + feature.value, 0), [plan.features]);

  return (
    <div className={`relative border rounded-lg shadow-md w-full p-8 flex flex-col overflow-hidden ${plan.isRecommended ? '' : ''}`}>
      <div 
        className="absolute inset-0 z-[0] bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/bg-valuecards.jpg')" }}
      ></div>

      {plan.isRecommended && (
        <div className="bg-blue-600 text-white text-center font-bold py-1 px-4 rounded-t-lg -mt-8 -mx-8 mb-4">
          Paling Populer
        </div>
      )}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white tracking-wide">{plan.name}</h1>
        <p className="text-md font-semibold text-blue-600 tracking-widest mt-2">
          MANFAAT EKSKLUSIF
        </p>
      </div>
      <h2 className="text-lg font-semibold text-white mb-4 mt-4">Ini yang Anda dapatkan:</h2>
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300 text-base">
            <CheckIcon />
            <span className="flex-grow">{feature.text}</span>
            <span className="text-base text-gray-400 line-through">{formatRupiah(feature.value)}</span>
          </li>
        ))}
      </ul>
      <hr className="my-6 border-gray-600" />
      <div className="text-center mt-auto">
        <p className={`text-lg font-semibold text-gray-400 ${plan.name === 'Komunitas Gratis' ? 'line-through' : ''}`}>
          Total Value : {formatRupiah(totalValue)}
        </p>
        <p className={`text-4xl font-bold mb-5 ${plan.price === '100% GRATIS' ? 'text-blue-600' : 'text-blue-600'}`}>
          {plan.price}
        </p>
      </div>
      <button
        onClick={onButtonClick}
        className="bg-orange-600 text-white text-xl tracking-wider w-full font-bold py-3 rounded-lg hover:bg-orange-500 hover:scale-105 ease-in-out transition duration-300 z-3"
      >
        {plan.buttonText}
        {plan.price === '100% GRATIS'}
      </button>
    </div>
  );
};

const ValueCard = () => {
  const { openModal } = useModal();

  const handleAction = (action: string) => {
    if (action === 'openModal') {
      openModal();
    } else if (action === 'whatsapp') {
      window.open('https://wa.me/6285156125677', '_blank');
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center py-24 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} onButtonClick={() => handleAction(plan.action)} />
        ))}
      </div>
    </div>
  );
};

export default ValueCard;