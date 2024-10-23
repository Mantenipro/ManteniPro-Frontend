import React, { useState } from 'react';
import LefthDashboard from '../components/LefthDashboard' // Cambiado a LefthCustomer
import GetInfoMachine from '../components/GetInfoMachine'; 
import Title from '../components/Title'; 
import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const ReporteCliente = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`relative flex min-h-screen bg-white ${montserrat.className}`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        {/* Componente LefthCustomer en lugar de LefthDashboard */}
        <LefthDashboard />
      </div>

      <main className='mt-2 flex-1 px-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        <div className='mb-4'>
          <Title className='text-2xl'>Reporte de incidente</Title>
        </div>

        <div className=''>
          <GetInfoMachine />
        </div>
      </main>
    </div>
  )
};

export default ReporteCliente;



