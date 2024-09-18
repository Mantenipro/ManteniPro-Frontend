import React from 'react';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const SortTeams = () => {
  return (
    <div className={`flex justify-between items-center bg-gradient-to-r from-[#21262D] to-[#414B66] p-2 rounded-lg ${sourceSans3.className}`}>
      <span className="text-white">Ordenar por:</span>
      <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg">
        Más recientes 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default SortTeams;

