// pages/reporteCliente.js

import React, { useState } from 'react';
import LefthDashboard from '../components/LefthDashboard'; // Ajusta la ruta según tu estructura de carpetas
import GetInfoMachine from '../components/GetInfoMachine'; // Ajusta la ruta según tu estructura de carpetas
import Title from '../components/Title'; // Asegúrate de tener este componente
import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const ReporteCliente = () => {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu);
  };

  return (
    <div className={`relative flex min-h-screen bg-white ${montserrat.className}`}>
      {/* Barra Lateral */}
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>

      {/* Contenido Principal */}
      <main className="flex-1 px-6 mt-2">
        {/* Botón de Menú para Pantallas Pequeñas */}
        <div className="mb-6 flex items-center justify-between">
          <div className="left-4 top-4 z-50 lg:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-md bg-[#21262D] p-2 text-white focus:outline-none"
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Título de la Página */}
        <div className="mb-4">
          <Title className="text-2xl">Reporte de incidente</Title>
        </div>

        {/* Componente GetInfoMachine */}
        <div className="mb-4">
          <GetInfoMachine />
        </div>
      </main>
    </div>
  );
};

export default ReporteCliente;
