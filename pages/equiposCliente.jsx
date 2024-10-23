import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import CustomersMachine from '../components/CustomersMachine';
import LefthDashboard from '../components/LefthDashboard';
import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const dummyMachines = [
  {
    model: 'AC-100',
    owner: 'Hugo Lozano',
    manufacturer: 'FrioTech',
    location: 'Delegación Cuauhtémoc, Ciudad de México',
    qr: '/qr.jpg'
  },
  {
    model: 'AC-200',
    owner: 'Hugo Lozano',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg'
  },
  {
    model: 'AC-200',
    owner: 'Hugo Lozano',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg'
  },
  {
    model: 'AC-200',
    owner: 'Hugo Lozano',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg'
  },
  {
    model: 'AC-200',
    owner: 'Hugo Lozano',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg'
  },
  {
    model: 'AC-200',
    owner: 'Hugo Lozano',
    manufacturer: 'FrioTech',
    location: 'Delegación Benito Juárez, Ciudad de México',
    qr: '/qr.jpg'
  },
  // Agrega más máquinas aquí según sea necesario
];

const EquiposCliente = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`${montserrat.className} relative flex h-screen flex-row lg:flex-grow`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>
      <main className='flex-1 p-6'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar className='w-1/2 md:w-1/3' />
        </div>

        <div className='mb-4 mt-8'>
          <Title className='text-2xl'>Catálogo de equipos</Title>
        </div>

        <div className='mt-8 flex h-[70vh] flex-col space-y-2 overflow-y-auto md:h-[75vh]'>
          {dummyMachines.map((machine, index) => (
            <CustomersMachine key={index} machine={machine} />
          ))}
        </div>
      </main>
    </div>
  )
};

export default EquiposCliente;








