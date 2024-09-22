import React from 'react';

const TicketCard = ({ title, description, username, date, priority, ticketId }) => {
  const priorityClass = {
    Alta: 'text-red-500 bg-red-100',
    Media: 'text-yellow-500 bg-yellow-100',
    Baja: 'text-green-500 bg-green-100',
  }[priority] || 'text-white bg-white';

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-4">
      <div className="flex justify-between items-start">
        <span className={`text-xs px-2 py-1 rounded-full ${priorityClass}`}>{priority}</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/profile.jpg" alt="Username" className="w-8 h-8 rounded-full mr-2" />
          <span className="text-sm text-gray-700">{username}</span>
        </div>
        <span className="text-sm text-gray-500">{ticketId}</span>
      </div>
    </div>
  );
};

export default TicketCard;



