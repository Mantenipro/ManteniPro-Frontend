import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });


const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const MachineCard = ({ machine }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleCardClick = () => router.push(`/ReporteDeEquipo/${machine._id}`);

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
          <img
            src={machine.image || '/noimg3.jpg' }
            alt="Imagen del equipo"
            className="w-12 h-12 rounded-full object-cover bg-gray-300"
          />
        </div>

        {/* Información del equipo */}
        <div className="flex flex-grow justify-between ml-2 space-x-0 md:space-x-4">
  <div className="flex flex-col items-start w-16 md:w-24">
    <span className={`text-xs md:text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
      {truncateText(machine.model, isMobile ? 8 : 10)}
    </span>
  </div>

  <div className="flex flex-col items-start w-20 md:w-24">
    <span className={`text-xs md:text-base transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
      {truncateText(machine.owner, isMobile ? 12 : 15)}
    </span>
  </div>

  <div className="flex flex-col items-start w-16 md:w-24">
    <span className={`text-xs md:text-base transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
      {truncateText(machine.brand, isMobile ? 8 : 10)}
    </span>
  </div>

  <div className="hidden md:flex flex-col items-start w-20 md:w-24">
    <span className={`text-xs md:text-base transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
      {truncateText(machine.location, isMobile ? 12 : 20)}
    </span>
  </div>


  {/* Código QR */}
  <div className="hidden lg:flex justify-center items-center w-10 h-10 md:w-12 md:h-12 rounded-lg">
    <img src={machine.qr} alt="Código QR" className="w-full h-full rounded-lg" />
  </div>
</div>
      </div>
    </div>
  );
};

export default MachineCard;

