import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import CustomersMachine from '../components/CustomersMachine';
import LefthCustomer from '../components/LefthCustomer';
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
    <div className={`${montserrat.className} flex flex-row lg:flex-grow relative h-screen`}>
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}
      >
        <LefthCustomer />
      </div>
      <main className='flex-1 p-6'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='lg:hidden top-4 left-4 z-50'>
            <button
              onClick={toggleMenu}
              className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'>
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar className='w-1/2 md:w-1/3 ' />
        </div>

        <div className='mt-8 mb-4'>
          <Title className='text-2xl'>Catálogo de equipos</Title>
        </div>

        <div className='flex flex-col mt-8 space-y-2 h-[70vh] md:h-[75vh] overflow-y-auto'>
          {dummyMachines.map((machine, index) => (
            <CustomersMachine key={index} machine={machine} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default EquiposCliente;








