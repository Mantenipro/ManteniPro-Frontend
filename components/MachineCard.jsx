import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const MachineCard = ({ machine }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter(); 

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    router.push('/detalle_equipo'); 
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    router.push('/actualizar_equipo'); 
  };

  return (
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
        <div className="hidden md:flex flex-col justify-center ml-4">
          <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
            {machine.code}
          </span>
        </div>

        {/* Fabricante */}
        <div className="flex flex-col justify-center ml-4">
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
            alt="QR Code" 
            width={50} 
            height={50} 
            className="mr-4"
          />
        </div>
      </div>

      {/* Iconos de acción */}
      <div className="flex-shrink-0 flex space-x-4 ml-6 "> 
        <button 
          onClick={handleEditClick} 
          className="bg-gray-200 p-2 rounded-lg transition-all duration-300 hover:bg-white hidden sm:block"
        >
          <Image src="/icon/edit-icon.png" alt="Edit" width={20} height={20} />
        </button>
        <button className="bg-gray-200 p-2 rounded-lg transition-all duration-300 hover:bg-white hidden sm:block">
          <Image src="/icon/delete-icon.png" alt="Delete" width={20} height={20} />
        </button>
      </div>

      {/* Iconos de acción responsivos para móvil */}
      <div className="flex-shrink-0 flex space-x-4 ml-6 sm:hidden"> 
        <button 
          onClick={handleEditClick} 
          className="bg-gray-200 p-1 rounded-lg transition-all duration-300 hover:bg-white"
        >
          <Image src="/icon/edit-icon.png" alt="Edit" width={16} height={16} />
        </button>
        <button className="bg-gray-200 p-1 rounded-lg transition-all duration-300 hover:bg-white">
          <Image src="/icon/delete-icon.png" alt="Delete" width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

export default MachineCard;























