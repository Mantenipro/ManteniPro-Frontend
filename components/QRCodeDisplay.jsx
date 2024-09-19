import React from 'react';
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const QRCodeDisplay = () => {
  return (
    <div className={`${sourceSans3.className} bg-white rounded-lg px-4 max-w-[34rem] flex flex-col justify-between min-h-[32rem] -mt-4 shadow-lg`}>
      
      <div className="w-full mb-4">
        <Image
          src="/curved-shape.png"
          alt="Curved Shape"
          width={300}
          height={100}
          className="w-full object-cover"
        />
      </div>
      
      <div className="mb-5">
        <Image
          src="/qr.jpg"
          alt="QR Code"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold">
          QR <span className="underline decoration-[#FDB623]">Equipo</span>
        </h2>
        <p className="text-gray-500 mt-2">¡Haz que tu cliente disfrute la comodidad de aplicar este QR en su equipo ahora mismo!</p>
      </div>
      
      <button className="bg-[#333333] text-white font-semibold inline-flex items-center justify-center rounded-full py-1 px-6 shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap">
        Imprimir
        <span className="ml-2 text-[#FDB623]">→</span>
      </button>
    </div>
  );
};

export default QRCodeDisplay;










