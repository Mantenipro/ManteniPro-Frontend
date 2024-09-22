import React from 'react';
import SearchBar from '../components/SearchBar';
import TempSidebar from '../components/TempSidebar';
import Title from '../components/Title';
import BurgerMenu from '../components/BurgerMenu';
import InfoPanel from '../components/InfoPanel';
import TicketsStatus from '../components/TicketsStatus';

const TicketsDashboard = () => {
  const ticketsPorHacer = [
    // Tickets Por Hacer (sin prioridad)
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '13/05/24', priority: 'Sin prioridad', ticketId: '132314' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '14/05/24', priority: 'Sin prioridad', ticketId: '132315' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '15/05/24', priority: 'Sin prioridad', ticketId: '132316' },
  ];

  const ticketsEnProceso = [
    // Tickets En Proceso (cambiando la prioridad y fechas)
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '16/05/24', priority: 'Baja', ticketId: '132317' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '17/05/24', priority: 'Media', ticketId: '132318' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '18/05/24', priority: 'Alta', ticketId: '132319' },
  ];

  const ticketsCompletados = [
    // Tickets Completados (cambiando la prioridad y fechas)
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '19/05/24', priority: 'Baja', ticketId: '132320' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '20/05/24', priority: 'Media', ticketId: '132321' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '21/05/24', priority: 'Alta', ticketId: '132322' },
  ];

  return (
    <div className="min-h-screen bg-white flex relative">
      <div className="relative ">
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
        <div className="mb-4">
        <InfoPanel />
        </div>
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




  



