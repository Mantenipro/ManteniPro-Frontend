import React from 'react';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import AddButton from '../components/AddButton'; // Importar el componente AddButton

const Catalogo = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar /> 
      <main className="flex-1 p-6">
        <SearchBar />
        <div className="mt-6 flex justify-end">
          <AddButton /> 
        </div>
      </main>
    </div>
  );
};

export default Catalogo;



