import React from 'react';
import TempSidebar from '../components/TempSidebar';
import Title from '../components/Title';
import FormEquipment from '../components/FormEquipment';
import BurgerMenu from '../components/BurgerMenu';

const AgregarEquipos = () => {
  return (
    <div className="min-h-screen flex relative">
      <TempSidebar />
      
      <main className="flex-1 p-6 flex flex-col relative">
        
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <BurgerMenu className="text-sm" />
          <Title className="text-2xl mt-4 lg:mt-0">Agregar equipo</Title>
        </div>
        
        <div className="w-full flex flex-col lg:flex-row lg:space-x-6">
          <div className="w-full lg:w-2/3 max-w-2xl">
            <FormEquipment />
          </div>
        </div>

      </main>
    </div>
  );
};

export default AgregarEquipos;








