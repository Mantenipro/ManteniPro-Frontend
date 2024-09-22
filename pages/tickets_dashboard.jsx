import React from 'react';
import SearchBar from '../components/SearchBar';
import TempSidebar from '../components/TempSidebar';
import Title from '../components/Title';
import BurgerMenu from '../components/BurgerMenu';
import InfoPanel from '../components/InfoPanel';
import TicketsStatus from '../components/TicketsStatus';

const TicketsDashboard = () => {
  const ticketsPorHacer = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '13/05/24', priority: 'High', ticketId: '132314' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '13/05/24', priority: 'Low', ticketId: '132315' },
    // Más tickets...
  ];

  const ticketsEnProceso = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '13/05/24', priority: 'Medium', ticketId: '132316' },
    // Más tickets...
  ];

  const ticketsCompletados = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '13/05/24', priority: 'Low', ticketId: '132317' },
    // Más tickets...
  ];

  return (
    <div className="min-h-screen bg-white flex relative">
      <div className="relative">
        <TempSidebar /> 
      </div>

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <BurgerMenu className="text-sm" /> 
          <SearchBar className="w-1/2 md:w-1/3" />
        </div>

        <div className="mb-4">
          <Title className="text-2xl">Tickets</Title> 
        </div>

        <InfoPanel />
        
        <TicketsStatus 
          ticketsPorHacer={ticketsPorHacer} 
          ticketsEnProceso={ticketsEnProceso} 
          ticketsCompletados={ticketsCompletados} 
        />

      </main>
    </div>
  );
};

export default TicketsDashboard;
  



