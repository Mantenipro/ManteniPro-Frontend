import React from 'react';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import AddButton from '../components/AddButton';
import SortTeams from '../components/SortTeams';
import Title from '../components/Title';
import MachineCard from '../components/MachineCard';

const dummyMachines = [
  {
    model: 'AC-100',
    code: '1234AC5678XYZ',
    manufacturer: 'FrioTech',
    location: 'Delegación Cuauhtémoc, Ciudad de México',
    qr: '/qr.jpg' 
  },
  {
    model: 'AC-200',
    code: '5678AC1234XYZ',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg' 
  },
  {
    model: 'AC-200',
    code: '5678AC1234XYZ',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg' 
  },
  {
    model: 'AC-200',
    code: '5678AC1234XYZ',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg'  
  }
];

const Catalogo = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-6">
        
        <div className="flex justify-between items-center">
          <SearchBar />
          <AddButton />
        </div>

       
        <div className="mt-4">
          <Title />
          <div className="mt-4 flex justify-between items-center">
            <SortTeams />
          </div>
        </div>

        
        <div className="mt-6 space-y-4">
          {dummyMachines.map((machine, index) => (
            <MachineCard key={index} machine={machine} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalogo;









