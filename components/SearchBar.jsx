import React from 'react';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const SearchBar = () => {
  return (
   <div
  className={`w-[18rem] h-[36px] flex items-center p-1 rounded-lg ${sourceSans3.className} ml-1 mr-1 lg:ml-0 md:ml-1 md:w-[29rem] md:h[36px]`} 
  style={{ background: 'linear-gradient(90deg, #21262D 12%, #414B66 88%)' }}
>
  <input
    type="text"
    placeholder="Buscar..."
    className="w-full bg-transparent focus:outline-none text-white p-1 text-xs" // Se reduce el tamaño del texto
    aria-label="Buscar equipo"
  />
</div>

  );
};

export default SearchBar;














