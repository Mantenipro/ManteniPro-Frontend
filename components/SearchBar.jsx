import React from 'react';
import { Source_Sans_3 } from 'next/font/google';
import Image from 'next/image';
import searchIcon from '../public/icon/search-icon.png'; 

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const SearchBar = () => {
  return (
    <div className={`w-full max-w-lg mx-auto flex items-center p-2 rounded-lg ${sourceSans3.className}`} 
         style={{ background: 'linear-gradient(90deg, #21262D 12%, #414B66 88%)' }}> 
      <Image 
        src={searchIcon} 
        alt="Search Icon" 
        className="w-6 h-6 mr-2" 
      />
      <input 
        type="text" 
        placeholder="Buscar usuario" 
        className="w-full bg-transparent focus:outline-none text-white p-2"
      />
    </div>
  );
};

export default SearchBar;





