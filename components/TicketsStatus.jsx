import React from 'react';
import TicketCard from './TicketCard';

const TicketsStatus = ({ ticketsPorHacer, ticketsEnProceso, ticketsCompletados }) => {
  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatusColumn title="Por hacer" color="bg-red-500" underlineColor="border-red-500" tickets={ticketsPorHacer} />
        <StatusColumn title="En proceso" color="bg-yellow-500" underlineColor="border-yellow-500" tickets={ticketsEnProceso} />
        <StatusColumn title="Completados" color="bg-green-500" underlineColor="border-green-500" tickets={ticketsCompletados} />
      </div>
    </div>
  );
};

const StatusColumn = ({ title, color, underlineColor, tickets }) => (
  <div>
    <div className="flex items-center mb-4">
      <span className={`w-3 h-3 rounded-full ${color} mr-2`}></span>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className={`w-full h-1 mt-2 ${underlineColor}`}></div>
    </div>
    {tickets.map((ticket) => (
      <TicketCard key={ticket.ticketId} {...ticket} />
    ))}
  </div>
);

export default TicketsStatus;





