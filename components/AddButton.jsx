import React from 'react';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const AddButton = () => {
  return (
    <button className={`bg-gradient-to-r from-[#21262D] to-[#414B66] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all ${sourceSans3.className}`}>
      Crear equipo
    </button>
  );
};

export default AddButton;



