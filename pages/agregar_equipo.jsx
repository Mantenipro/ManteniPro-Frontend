import React from 'react';
import TempSidebar from '../components/TempSidebar';
import Title from '../components/Title';
import FormEquipment from '../components/FormEquipment';
import BurgerMenu from '../components/BurgerMenu';

const AgregarEquipos = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      <TempSidebar />

      {/* Contenedor principal */}
      <main className="flex-1 p-6 flex flex-col">
        
        {/* Contenedor del BurgerMenu y Title */}
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <BurgerMenu className="text-sm" />
          <Title className="text-2xl mt-4 lg:mt-0">Agregar equipos</Title>
        </div>

        {/* Formulario por debajo del título y pegado a la izquierda */}
        <div className="w-full max-w-2xl">
          <FormEquipment />
        </div>
        
      </main>
    </div>
  );
};

export default AgregarEquipos;




