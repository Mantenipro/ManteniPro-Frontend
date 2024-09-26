/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

const TicketCard = ({ title, description, username, date, priority, ticketId }) => {
  
  const [isHovered, setIsHovered] = useState(false);

 
  const priorityClass = {
    Alta: 'text-red-500 bg-red-100',
    Media: 'text-yellow-500 bg-yellow-100',
    Baja: 'text-green-500 bg-green-100',
  }[priority] || 'text-gray-500 bg-gray-100'; 

  return (
    <div
    className={`rounded-lg p-2 mb-2 shadow-md transition-all duration-200 ${
      isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66]' : 'bg-white'
    } 
    md:rounded-xl md:p-3 md:mb-3 md:shadow-lg`} // Para desktop
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{ maxWidth: '300px' }} // Ajusta el ancho máximo de la tarjeta en móvil y tablet
  >
    <div className="flex justify-between items-start">
      <span className={`text-xs px-1 py-0.5 rounded-full ${priorityClass}`}>
        {priority}
      </span>
      <span className={`text-xs ${isHovered ? 'text-white' : 'text-gray-400'}`}>
        {date}
      </span>
    </div>
    <h3 className={`text-base font-semibold mb-1 ${isHovered ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h3>
    <p className={`text-xs mb-2 ${isHovered ? 'text-gray-300' : 'text-gray-600'}`}>
      {description}
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="/profile.jpg"
          alt={username}
          className="w-6 h-6 rounded-full mr-1"
        />
        <span className={`text-xs ${isHovered ? 'text-gray-300' : 'text-gray-700'}`}>
          {username}
        </span>
      </div>
      <span className={`text-xs ${isHovered ? 'text-gray-300' : 'text-gray-500'}`}>
        {ticketId}
      </span>
    </div>
  </div>
  

  );
};

export default TicketCard;














