import React, { useState } from 'react';
import TicketCard from './TicketCard';

const TicketsStatus = ({ ticketsPorHacer, ticketsEnProceso, ticketsCompletados }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: 'Por hacer', tickets: ticketsPorHacer },
    { title: 'En proceso', tickets: ticketsEnProceso },
    { title: 'Completados', tickets: ticketsCompletados },
  ];

  const handleNextSection = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  };

  const handlePrevSection = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length);
  };

  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusColumn 
          title={sections[currentSection].title} 
          tickets={sections[currentSection].tickets} 
          handleNextSection={handleNextSection}
          handlePrevSection={handlePrevSection}
          showNavigation={true} 
        />
        
        <div className="hidden md:block">
          <StatusColumn title="En proceso" tickets={ticketsEnProceso} />
        </div>
        <div className="hidden md:block">
          <StatusColumn title="Completados" tickets={ticketsCompletados} />
        </div>
      </div>
    </div>
  );
};

const StatusColumn = ({ title, tickets, handleNextSection, handlePrevSection, showNavigation }) => (
  <div className="flex flex-col items-center group">
    <div className="flex items-center justify-between w-full mb-4">
      {showNavigation && (
        <button 
          onClick={handlePrevSection} 
          className="block md:hidden bg-gray-200 p-2 rounded-full"
        >
          <img src="/icon/left-arrow-icon.png" alt="Left arrow" className="w-4 h-4" />
        </button>
      )}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#21262D] to-[#414B66] mr-2"></span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      
      {showNavigation && (
        <button 
          onClick={handleNextSection} 
          className="block md:hidden bg-gray-200 p-2 rounded-full"
        >
          <img src="/icon/right-arrow-icon.png" alt="Right arrow" className="w-4 h-4" />
        </button>
      )}
    </div>

    <div className="w-full h-1 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#21262D] to-[#414B66]"></div>

    {/* Contenedor scrollable para los tickets */}
    <div className="w-full mt-4 group-hover:bg-opacity-100 h-[500px] md:h-[385px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
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

















  

























  


































  

























  


























  

























  










