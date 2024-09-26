import React from 'react';
import SearchBar from '../components/SearchBar';
import TempSidebar from '../components/TempSidebar';
import AddButton from '../components/AddButton';
import SortTeams from '../components/SortTeams';
import Title from '../components/Title';
import TicketCard from '../components/TicketCard';
import BurgerMenu from '../components/BurgerMenu';

const dummyTickets = [
  {
    model: 'AC-100',
    code: '1234AC5678XYZ',
    manufacturer: 'FrioTech',
    location: 'Delegación Cuauhtémoc, Ciudad de México',
    qr: '/qr.jpg',
    ticket:'TI001'

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
const tableHeaders = ['Folio', 'Modelo', 'Código', 'Fabricante', 'Ubicación'];


const Catalogo = () => {
  return (
    <div className="min-h-screen bg-white flex relative">
      <TempSidebar />
      <main className="flex-1 p-6">
        
        <div className="flex items-center justify-between ">
          <BurgerMenu className="text-sm" /> 
          <SearchBar className="w-1/2 md:w-1/3" />
          <AddButton className="text-sm" /> 
        </div>

        <div className="mt-8 mb-4">
          <Title className="text-2xl">Listado de Tickets</Title> 
          <div className="mt-4 flex justify-between items-center">
            <SortTeams />
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {dummyTickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalogo;




















