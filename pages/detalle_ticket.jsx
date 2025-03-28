import React from 'react';
import TempSidebar from '../components/TempSidebar';
import BurgerMenu from '../components/BurgerMenu';
import TicketDetails from '../components/TicketDetails';
import QRCodeDisplay from '../components/QRCodeDisplay';

const DetalleTicket = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex relative">
      <TempSidebar />

      <main className="flex-1 p-6 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <BurgerMenu className="text-sm" />
          </div>
          <TicketDetails/>
        </div>

        <div className="flex-shrink-0  lg:mt-5 lg:ml-8 ">
          <QRCodeDisplay />
        </div>
      </main>
    </div>
  );
};

export default DetalleTicket;





