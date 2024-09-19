import React from 'react';
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const QRCodeDisplay = () => {
  return (
    <div className={`${sourceSans3.className} bg-white rounded-lg px-4 max-w-[34rem] flex flex-col justify-between min-h-[36rem] -mt-4 shadow-lg`}> {/* Aumentado min-h a 36rem */}
      
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

      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-4">
          QR <span className="underline decoration-[#FDB623]">Equipo</span>
        </h2>
        <p className="text-gray-500">
          ¡Haz que tu cliente disfrute la comodidad de aplicar este QR en su equipo ahora mismo!
        </p>
      </div>
      <div className="text-center mb-6">
      <button className="bg-[#333333] text-white font-semibold inline-flex items-center justify-center rounded-md py-3 px-6 shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap pb-5"> {/* Aumentado py a 3 para mayor altura */}
        <span className="flex items-center"> {/* Añadido flex y items-center para centrar verticalmente */}
          Imprimir
          <span className="ml-2 text-[#FDB623]">→</span>
        </span>
      </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;












