import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile';
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile';
import SubtitleMobile from '@/components/SubtitleMobile';
import LefthTechnician from '@/components/LefthTechnician'; // Importa el nuevo componente

import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function OrderClosed() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={`min-h-screen w-full bg-[#d8d5d5] lg:flex lg:flex-row lg:bg-white ${montserrat.className}`}>
      <NavbarTecnicoMobile />
      <div className='hidden lg:block lg:bg-gradient-to-b lg:from-[#31416d] lg:to-[#232c48]'>
        <LefthTechnician />
      </div>
      <section className='m-6 flex h-[85vh] md:h-[85vh] md:w-full max-h-screen flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300 md:m-10 md:p-10'>
        <HeaderTecnicoMobile />
        <span className='m-auto my-3 font-semibold text-slate-200 md:text-xl'>
          Orden Cerrada
        </span>
        
        {/* Contenedor de información */}
        <div className='flex-grow overflow-y-auto'>
          <div className='-mx-2 flex flex-col rounded bg-slate-100 p-3 text-center md:mx-5 md:text-xl'>
            <span className='mb-2 mr-auto font-semibold text-slate-800 md:hidden'>
              Reparar cable
            </span>
            <div className='flex w-full flex-col gap-2'>
              <SubtitleMobile children={'ID de la Orden'} />
              <input
                type='text'
                readOnly
                disabled
                value={id}
                className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800 md:text-lg'
              />
              <SubtitleMobile children={'Solucion del Ingeniero'} />
              <textarea
                name=''
                disabled
                rows={5}
                id=''
                className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
              ></textarea>
              <div className='flex w-auto items-center justify-between md:w-full md:flex-col'>
                <SubtitleMobile children={'Inicio:'} />
                <input
                  type='date'
                  disabled
                  name=''
                  id=''
                  className='ml-auto rounded-lg border-2 border-slate-300 p-1 text-sm text-slate-800 md:w-full md:text-lg'
                />
              </div>
              <div className='flex items-center md:flex-col'>
                <SubtitleMobile children={'Termino:'} />
                <div className='ml-auto flex w-auto md:w-full'>
                  <input
                    type='date'
                    disabled
                    name=''
                    id=''
                    className='w-full rounded-lg border-2 border-slate-300 p-1 text-sm text-slate-800 md:text-lg'
                  />
                </div>
              </div>

              <SubtitleMobile children={'VoBo cliente:'} />
              <textarea
                name=''
                rows={5}
                disabled
                id=''
                className='w-full rounded border-2 border-slate-300 p-1 text-sm text-slate-800'
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Contenedor del botón centrado */}
        <div className='flex justify-center mt-8'>
          <Link href={`/ticketResolved`}>
            <button className='flex items-center  justify-center w-full md:w-64 rounded-lg bg-yellow-300 p-1 px-4 text-lg font-semibold text-blue-950 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold'>
              Completo
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}



