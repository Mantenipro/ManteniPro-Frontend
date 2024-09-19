import React, { useState } from 'react';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const SortTeams = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState('Antiguo a reciente');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectSortOrder = (order) => {
    setSortOrder(order);
    setShowDropdown(false); 
  };

  return (
    <div className={`relative w-full flex justify-between items-center bg-gradient-to-r from-[#21262D] to-[#414B66] px-4 py-1 rounded-lg ${sourceSans3.className}`}>
      <span className="text-white">Ordenar por:</span>
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-lg relative"
      >
        {sortOrder}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      
      {showDropdown && (
        <ul className="absolute right-0 top-10 bg-white text-black rounded-lg shadow-lg w-48">
          <li 
            onClick={() => selectSortOrder('Antiguo a reciente')}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            Antiguo a reciente
          </li>
          <li 
            onClick={() => selectSortOrder('Reciente a antiguo')}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            Reciente a antiguo
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortTeams;




