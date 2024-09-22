import React from 'react';

const TicketCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-gray-800">Aire acondicionado no enfría adecuadamente.</h3>
        <span className="text-xs text-gray-500">13/05/24</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        La unidad hace ruidos extraños y el flujo de aire es débil.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/path/to/profile.jpg"
            alt="Profile"
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">Username</span>
        </div>
        <span className="text-sm text-gray-500">#132314</span>
      </div>
    </div>
  );
};

export default TicketCard;

