import React from 'react';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const SearchBar = () => {
  return (
    <div
      className={`w-full max-w-sm flex items-center p-1 rounded-lg ${sourceSans3.className} flex-grow ml-2 mr-2 lg:ml-0 md:ml-2 sm:ml-0`} 
      style={{ background: 'linear-gradient(90deg, #21262D 12%, #414B66 88%)' }}>
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full bg-transparent focus:outline-none text-white p-1 text-xs md:text-sm" // Changed text size
        aria-label="Buscar equipo"
      />
    </div>
  );
};

export default SearchBar;














