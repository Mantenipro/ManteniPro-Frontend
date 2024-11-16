import React, { useState, useEffect } from 'react';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { motion } from 'framer-motion';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const EstadoDeAsignacion = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [technicians, setTechnicians] = useState([
    { id: 1, name: '', img: '/tec4.png' },
    { id: 2, name: '', img: '/tec4.png' },
    { id: 3, name: '', img: '/tec3.png' },
  ]);
  const [activeIndex, setActiveIndex] = useState(0); 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % technicians.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [technicians]);

  return (
    <div className={`min-h-screen bg-white flex relative ${montserrat.className}`}>
      {/* Sidebar */}
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-3 flex flex-col lg:flex-row items-center justify-center">
      <div className="relative flex flex-col items-center justify-center space-y-8 mt-10 h-[50vh]">
  {/* Animación de técnicos */}
  <div className="flex items-center space-x-10 relative">
    {technicians.map((tech, index) => (
      <div key={tech.id} className="flex flex-col items-center relative">
        <img src={tech.img} alt={tech.name} className="w-16 h-16" />
        <span className="text-center mt-2">{tech.name}</span>

      
        {activeIndex === index && (
          <>
            {index === 2 ? ( 
              <motion.span
                className="absolute top-[-10px] right-[-10px] text-green-600 text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ✔
              </motion.span>
            ) : ( 
              <motion.span
                className="absolute top-[-10px] right-[-10px] text-red-600 text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ✘
              </motion.span>
            )}
          </>
        )}
      </div>
    ))}
  </div>

  {/* Título y Descripción */}
  <div className="text-center mt-8 p-4 bg-gray-200 rounded-md shadow-md w-[40vh] md:w-full">
    <h2 className="text-xl font-bold">Tu ticket está siendo asignado a un técnico</h2>
    <p className="mt-2 text-sm text-gray-700">
      Se te notificará cuando este terminado el proceso.
    </p>
  </div>
</div>
      </main>

      <div className="absolute top-4 left-4 z-50 lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white bg-[#21262D] p-2 rounded-md focus:outline-none"
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
    </div>
  );
};

export default EstadoDeAsignacion;


