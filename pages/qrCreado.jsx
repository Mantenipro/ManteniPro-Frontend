import React from 'react';
import TempSidebar from '../components/TempSidebar';
import BurgerMenu from '../components/BurgerMenu';
import QRCodeDisplay from '../components/QRCodeDisplay'; 
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const QRCreado = () => {
  return (
    <div className={`min-h-screen bg-white flex relative ${montserrat.className}`}>
      <TempSidebar />

      <main className='flex-1 p-6 flex flex-col'>
        <div className='w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
          <BurgerMenu className='text-sm' />
        </div>

        <div className='w-full flex justify-center'>
          <div className='w-full max-w-sm'>
            <QRCodeDisplay />
          </div>
        </div>
      </main>
    </div>
  )
};

export default QRCreado;

