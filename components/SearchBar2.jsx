import React from 'react';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const SearchBar2 = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div
      className={`flex h-[36px] w-[16rem] items-center rounded-lg p-1 ${sourceSans3.className} md:h[36px] ml-1 mr-1 md:ml-1 md:w-[30rem] lg:ml-0`}
      style={{ background: 'linear-gradient(90deg, #21262D 12%, #414B66 88%)' }}
    >
      <input
        type='text'
        placeholder='Buscar por modelo...'
        value={searchTerm}
        onChange={handleChange}
        className='w-full bg-transparent p-1 text-xs text-white focus:outline-none'
        aria-label='Buscar equipo'
      />
    </div>
  );
}

export default SearchBar2;

