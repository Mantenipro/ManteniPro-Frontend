import React from 'react';
import TempSidebar from '../components/TempSidebar';
import BurgerMenu from '../components/BurgerMenu';
import EquipmentDetails from '../components/EquipmentDetails';
import QRCodeDisplay from '../components/QRCodeDisplay';

const DetalleEquipo = () => {
  return (
    <div className="min-h-screen bg-white flex relative">
      <TempSidebar />

      <main className="flex-1 p-6 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <BurgerMenu className="text-sm" />
          </div>
          <EquipmentDetails />
        </div>

        <div className="flex-shrink-0 mt-8 max-w-96 lg:mt-0 lg:ml-8"> {/* Espaciado entre el formulario y el QR */}
          <QRCodeDisplay />
        </div>
      </main>
    </div>
  );
};

export default DetalleEquipo;




