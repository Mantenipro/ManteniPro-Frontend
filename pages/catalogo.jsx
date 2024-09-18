import React from 'react';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar'; 

const Catalogo = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar /> 
      <main className="flex-1 p-6">
        <SearchBar />
      </main>
    </div>
  );
};

export default Catalogo;


