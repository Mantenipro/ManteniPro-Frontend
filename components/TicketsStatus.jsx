import React from 'react';
import TicketCard from './TicketCard'; 

const TicketsStatus = ({ ticketsPorHacer, ticketsEnProceso, ticketsCompletados, selectedPriorities }) => {
  const filterTicketsByPriority = (tickets) => {
    if (selectedPriorities.length === 0) return tickets; 
    return tickets.filter((ticket) => 
      selectedPriorities.includes(ticket.priority) || (ticket.priority === 'Sin prioridad' && selectedPriorities.includes('Sin prioridad'))
    );
  };

  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
     
        <StatusColumn title="Por hacer" tickets={filterTicketsByPriority(ticketsPorHacer)} />

        
        <StatusColumn title="En proceso" tickets={filterTicketsByPriority(ticketsEnProceso)} />

        
        <StatusColumn title="Completados" tickets={filterTicketsByPriority(ticketsCompletados)} />
      </div>
    </div>
  );
};


const StatusColumn = ({ title, tickets }) => (
  <div className="flex flex-col items-center group">
    <div className="flex items-center mb-4">
      <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#21262D] to-[#414B66] mr-2"></span>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>

    
    <div className="w-full h-1 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#21262D] to-[#414B66]"></div>

    
    <div className="w-full mt-4 group-hover:bg-opacity-100">
      {tickets.length === 0 ? (
        <p>No hay tickets para mostrar</p>
      ) : (
        tickets.map((ticket) => (
          <TicketCard 
            key={ticket.ticketId} 
            title={ticket.title}
            description={ticket.description}
            username={ticket.username}
            date={ticket.date}
            priority={ticket.priority}
            ticketId={ticket.ticketId}
          />
        ))
      )}
    </div>
  </div>
);

export default TicketsStatus;








  










