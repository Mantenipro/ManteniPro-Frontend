import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

// Función para truncar texto
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const MachineCard = ({ machine }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detectar si está en una pantalla móvil (menos de 768px)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Ejecutar una vez cuando el componente se monta
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleCardClick = () => router.push(`/equipment2/${machine._id}`);

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
            src={machine.image}
            alt="Imagen del equipo"
            className="w-12 h-12 rounded-full object-cover bg-gray-300"
          />
        </div>

        {/* Información del equipo */}
        <div className="flex flex-grow justify-between ml-4 space-x-6">
          <div className="flex flex-col items-start md:w-24 w-[1vh]">
            <span className={`md:text-lg text-xs font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
              {truncateText(machine.model, isMobile ? 10 : 10)}
            </span>
          </div>

          <div className="flex flex-col items-start md:w-24 w-[1vh]">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
              {truncateText(machine.owner, isMobile ? 20 : 15)}
            </span>
          </div>

          <div className="hidden md:flex flex-col items-start md:w-24">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
              {truncateText(machine.brand, 10)}
            </span>
          </div>

          <div className="hidden lg:flex flex-col items-start md:w-24">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
              {truncateText(machine.location, 20)}
            </span>
          </div>

          {/* Código QR */}
          <div className="hidden lg:flex justify-center items-center mr-6">
            <img src={machine.qr} alt="Código QR" className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineCard;

