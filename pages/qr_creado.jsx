import React from 'react';
import TempSidebar from '../components/TempSidebar';
import BurgerMenu from '../components/BurgerMenu';
import QRCodeDisplay from '../components/QRCodeDisplay'; // Importa el nuevo componente

const QRCreado = () => {
  return (
    <div className="min-h-screen bg-white flex relative">
      <TempSidebar />

      <main className="flex-1 p-6 flex flex-col">
        
        <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <BurgerMenu className="text-sm" />
        </div>
        
        <div className="w-full flex justify-center">
          <div className="w-full max-w-sm"> {/* Limita el ancho del contenedor */}
            <QRCodeDisplay />
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default QRCreado;

