import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const CustomersMachine = ({ machine }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter(); 

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    router.push('/reporteCliente'); 
  };

  return (
    <div>
      {/* Tarjeta de la máquina */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick} 
        className={`flex items-center justify-between bg-[#FAFAFA] shadow-md p-4 md:p-4 rounded-lg mb-4 transition-all duration-300 
        ${isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66] text-white' : ''} ${sourceSans3.className} 
        ${isHovered ? 'shadow-lg' : ''} cursor-pointer`} 
      >
        {/* Imagen del equipo */}
        <div className="flex-shrink-0">
          <Image 
            src="/airConditioning.jpg" 
            alt={machine.model} 
            width={isHovered ? 60 : 50} 
            height={isHovered ? 60 : 50}
            className="object-cover rounded-full" 
          />
        </div>
        
        {/* Información del equipo */}
        <div className="flex flex-grow justify-between ml-4">
          <div className="flex flex-col justify-center">
            <span className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
              {machine.model}
            </span>
          </div>

          {/* Código del equipo */}
          <div className="flex flex-col justify-center ml-4">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
              {machine.owner}
            </span>
          </div>
          
          {/* Fabricante */}
          <div className="hidden md:flex flex-col justify-center ml-4">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
              {machine.manufacturer}
            </span>
          </div>

          <div className="flex-col justify-center ml-4 hidden lg:flex">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
              {machine.location}
            </span>
          </div>

          <div className="hidden lg:flex justify-center items-center mr-6"> 
            <Image 
              src={machine.qr} 
              alt="QR owner" 
              width={50} 
              height={50} 
              className="mr-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersMachine;

