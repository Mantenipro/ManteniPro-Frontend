import React from 'react';
import TempSidebar from '../components/TempSidebar';
import Title from '../components/Title';
import FormEquipment from '../components/FormEquipment';
import BurgerMenu from '../components/BurgerMenu';

const ActualizarEquipo = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      <TempSidebar />

      <main className="flex-1 p-6 flex flex-col">
        
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <BurgerMenu className="text-sm" />
          <Title className="text-2xl mt-4 lg:mt-0">Actualizar equipo</Title>
        </div>
        
        <div className="w-full max-w-2xl">
          <FormEquipment />
        </div>
        
      </main>
    </div>
  );
};

export default ActualizarEquipo;
