import React from 'react';

const SortTeams = () => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-2 rounded-lg">
      <span className="text-gray-700">Ordenar por:</span>
      <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg">
        Más recientes 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default SortTeams;

