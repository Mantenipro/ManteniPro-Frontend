import React from 'react';
import { useRouter } from 'next/router';

import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile';
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile';
import LefthTechnician from '@/components/LefthTechnician'; // Cambiado de LefthDashboard a LefthTechnician

import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function TaskClose() {
  const router = useRouter();
  const { id } = router.query;

  const handleCloseTask = () => {
    router.push(`/orderClosed/${id}`);
  };

  const detailTask = [
    {
      id: 1,
      name_machine: 'Aire CoolMaster',
      marca: 'CoolMaster 2024',
      modelo: 'CM-AC2014',
      Solucion:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, consequatur modi? Cum ex saepe totam, sit architecto quisquam voluptatibus maxime quis, consequatur fuga molestiae officiis dicta numquam repellendus libero magnam?'
    }
  ];

  return (
    <div className={`min-h-screen w-full bg-[#d8d5d5] lg:flex lg:flex-row lg:bg-white ${montserrat.className}`}>
      <NavbarTecnicoMobile />
      <div className='hidden lg:block lg:bg-gradient-to-b lg:from-[#31416d] lg:to-[#232c48]'>
        <LefthTechnician /> {/* Cambiado a LefthTechnician */}
      </div>
      <section className='m-6 flex h-[80vh] max-h-screen flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300 md:m-10 md:p-10 md:h-[85vh]'>
        <HeaderTecnicoMobile />

        <div className='scrollbar-thin scrollbar-thumb-rounded mt-3 flex flex-col gap-3 overflow-y-auto text-sm md:text-lg lg:h-full'>
          {detailTask.map((item) => {
            return (
              <div
                key={`orderDetail-${item.id}`}
                className='mb-2 flex w-full flex-col gap-2 text-sm md:text-lg'
              >
                <span className='rounded bg-slate-300 px-2 font-semibold text-slate-700'>
                  {item.name_machine}
                </span>
                <span className='rounded border bg-slate-300 px-2 font-medium text-slate-700'>
                  {item.marca}
                </span>
                <span className='rounded border bg-slate-300 px-2 font-medium text-slate-700'>
                  {item.modelo}
                </span>
              </div>
            );
          })}
          <span>Solucion de la Incidencia</span>
          <span className={`rounded bg-slate-300 p-2 text-slate-700 ${sourceSans3.className}`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ab
            molestiae accusamus alias id esse eaque aliquid illum ducimus magnam
            quaerat eius dolores, unde obcaecati tempora, quis molestias fugiat
            quam!
          </span>
          <span>Firma de Usuario VoBo Cierre</span>
          <span className='rounded bg-slate-300 p-2 text-slate-700'>...</span>
          <span>Comentario de Usuario (opcional)</span>
          <span className='rounded bg-slate-300 p-2 text-slate-700'>...</span>
          <button
            onClick={() => handleCloseTask(id)}
            className='m-auto mt-8 rounded-lg bg-yellow-300 p-1 px-4 text-lg font-semibold text-blue-950 transition-colors duration-300 hover:from-blue-950 hover:to-blue-600 hover:font-bold md:p-4 md:px-5 md:text-xl'
          >
            Enviar
          </button>
        </div>
      </section>
    </div>
  );
}

