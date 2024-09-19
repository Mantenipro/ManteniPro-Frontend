import React from 'react';
import { Source_Sans_3 } from 'next/font/google';
import Image from 'next/image';
import searchIcon from '../public/icon/search-icon.png'; 

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const SearchBar = () => {
  return (
    <div 
      className={`w-full max-w-xs flex items-center p-1 rounded-lg ${sourceSans3.className}`} 
      style={{ background: 'linear-gradient(90deg, #21262D 12%, #414B66 88%)' }}
    > 
      <Image 
        src={searchIcon} 
        alt="Ícono de búsqueda" 
        width={18} 
        height={18} 
        className="mx-1" 
      />
      <input 
        type="text" 
        placeholder="Buscar equipo" 
        className="w-full bg-transparent focus:outline-none text-white p-1" 
        aria-label="Buscar usuario"
      />
    </div>
  );
};

export default SearchBar;










