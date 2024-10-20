import React from 'react';
import { useRouter } from 'next/router';

import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile';
import LefthTechnician from '@/components/LefthTechnician'; 
import UserDetails from '@/components/UserDetails';

import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const PerfilTecnico = () => {
  const router = useRouter();

  return (
    <div className={`min-h-screen w-full bg-[#d8d5d5] lg:flex lg:flex-row lg:bg-white ${montserrat.className}`}>
      <NavbarTecnicoMobile /> {/* Navbar en la parte superior */}

      {/* LefthTechnician solo visible en dispositivos de escritorio */}
      <div className='hidden lg:block lg:bg-gradient-to-b lg:from-[#31416d] lg:to-[#232c48] lg:w-[15%]'>
        <LefthTechnician /> {/* Componente LefthTechnician */}
      </div>

      <main className='flex-1 flex flex-col'>
        <section className='m-6 flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300 flex justify-center items-center h-[82vh] md:h-[85vh]'>
          {/* Contenedor de detalles del usuario */}
          <div className='flex-grow overflow-y-auto w-full flex items-center justify-center'>
            <div className='w-full max-w-md'>
              <UserDetails /> {/* Componente UserDetails */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PerfilTecnico;







