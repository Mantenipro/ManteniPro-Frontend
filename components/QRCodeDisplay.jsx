import React from 'react';
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const QRCodeDisplay = () => {
  return (
    <div
      className={`${sourceSans3.className} lg:mt-6 lg:mr-4 bg-white rounded-lg px-6 py-4 max-w-[25rem] mt-3 flex flex-col justify-between min-h-[32rem] shadow-lg mx-3`}
    >
      <div className='w-full mb-4'>
        <Image
          src='/curved-shape.png'
          alt='Curved Shape'
          width={300}
          height={100}
          className='w-full object-cover'
        />
      </div>

      <div className='mb-5'>
        <Image
          src='/qr.jpg'
          alt='QR Code'
          width={150}
          height={150}
          className='mx-auto'
        />
      </div>

      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-4'>
          QR <span className='underline decoration-[#FDB623]'>Equipo</span>
        </h2>
        <p className='text-gray-500'>
          ¡Haz que tu cliente disfrute la comodidad de aplicar este QR en su
          equipo ahora mismo!
        </p>
      </div>

      <div className='text-center'>
        <button className='bg-[#333333] text-white font-semibold inline-flex items-center justify-center rounded-md py-3 px-6 shadow-lg hover:shadow-xl transition-shadow'>
          Imprimir
          <span className='ml-2 text-[#FDB623]'>→</span>
        </button>
      </div>
    </div>
  )
};

export default QRCodeDisplay;

























