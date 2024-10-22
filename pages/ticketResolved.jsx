import React from 'react';
import Link from 'next/link';
import { CheckCircle } from '@mui/icons-material';

import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile';
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile';
import LefthTechnician from '@/components/LefthTechnician'; // Importa el nuevo componente

import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function TicketResolved() {
  return (
    <div
      className={`min-h-screen w-full bg-[#d8d5d5] lg:flex lg:flex-row lg:bg-white ${montserrat.className}`}
    >
      <NavbarTecnicoMobile />
      <div className='hidden lg:block lg:bg-gradient-to-b lg:from-[#31416d] lg:to-[#232c48]'>
        <LefthTechnician /> {/* Reemplaza LefthDashboard con LefthTechnician */}
      </div>
      <section className='m-6 flex flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300'>
        <HeaderTecnicoMobile />

        <div className='m-8 flex flex-col items-center justify-center text-center md:h-[65vh] ' >
          <span className='mb-2 font-semibold text-slate-300 md:mb-16 md:text-4xl'>
            Ticket Solucionado !
          </span>
          <CheckCircle className='mb-16 w-full text-7xl text-yellow-300 md:text-9xl' />
          <Link href='/homeTecnico'>
            <button className='hover:text-bold rounded border border-blue-700 bg-[#EEE727] px-3 font-semibold text-blue-950 hover:border-2 hover:border-slate-200 hover:bg-transparent hover:text-slate-200 md:rounded-xl md:p-4 md:text-3xl'>
              Ir al Inicio
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
