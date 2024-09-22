import React from 'react';
import TicketCard from './TicketCard';

const TicketsStatus = ({ ticketsPorHacer, ticketsEnProceso, ticketsCompletados }) => {
  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusHeader title="Por hacer" tickets={ticketsPorHacer} />
        <StatusHeader title="En proceso" tickets={ticketsEnProceso} />
        <StatusHeader title="Completados" tickets={ticketsCompletados} />
      </div>
    </div>
  );
};

const StatusHeader = ({ title, tickets }) => (
  <div className="flex flex-col items-center group">
    {/* Título con círculo */} 
    <div className="flex items-center mb-4">
      <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#21262D] to-[#414B66] mr-2"></span>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>

    {/* Subrayado con hover activado por toda la columna */}
    <div className="w-full h-1 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#21262D] to-[#414B66]"></div>

    {/* Contenedor de tickets con hover aplicado al grupo completo */}
    <div className="w-full mt-4 group-hover:bg-opacity-100">
      {tickets.map((ticket) => (
        <TicketCard 
          key={ticket.ticketId} 
          title={ticket.title}
          description={ticket.description}
          username={ticket.username}
          date={ticket.date}
          priority={ticket.priority}
          ticketId={ticket.ticketId}
        />
      ))}
    </div>
  </div>
);

export default TicketsStatus;



  










