import React from 'react';

const TicketsStatus = () => {
  return (
    <div className="flex justify-between items-center mb-6 bg-[#F5F5DC] p-4 rounded-md">
      
      <div className="flex items-center flex-1 justify-center">
        <span className="w-3 h-3 rounded-full bg-blue-800 mr-2"></span>
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-600 underline decoration-blue-800">Por hacer</span>
          <span className="text-xs text-gray-500">3</span>
        </div>
      </div>

      <div className="flex items-center flex-1 justify-center">
        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-600 underline decoration-blue-500">En proceso</span>
          <span className="text-xs text-gray-500">3</span>
        </div>
      </div>

      <div className="flex items-center flex-1 justify-center">
        <span className="w-3 h-3 rounded-full bg-blue-200 mr-2"></span>
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-600 underline decoration-blue-200">Completados</span>
          <span className="text-xs text-gray-500">3</span>
        </div>
      </div>

    </div>
  );
};

export default TicketsStatus;



