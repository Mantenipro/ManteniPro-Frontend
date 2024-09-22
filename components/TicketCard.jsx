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
      className={`rounded-xl p-4 mb-4 shadow-lg transition-all duration-200 ${
        isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66]' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
       
        <span className={`text-xs px-2 py-1 rounded-full ${priorityClass}`}>
          {priority}
        </span>
        {/* Fecha del ticket */}
        <span className={`text-xs ${isHovered ? 'text-white' : 'text-gray-400'}`}>{date}</span>
      </div>
      {/* Título del ticket */}
      <h3 className={`text-lg font-semibold mb-2 ${isHovered ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      {/* Descripción del ticket */}
      <p className={`text-sm mb-4 ${isHovered ? 'text-white' : 'text-gray-600'}`}>{description}</p>
      <div className="flex items-center justify-between">
        {/* Información del usuario asignado */}
        <div className="flex items-center">
          <img
            src="/profile.jpg"
            alt={username}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className={`text-sm ${isHovered ? 'text-white' : 'text-gray-700'}`}>{username}</span>
        </div>
        {/* ID del ticket */}
        <span className={`text-sm ${isHovered ? 'text-white' : 'text-gray-500'}`}>{ticketId}</span>
      </div>
    </div>
  );
};

export default TicketCard;






