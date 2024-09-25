import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import InfoPanel from '../components/InfoPanel';
import TicketsStatus from '../components/TicketsStatus';
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const TicketsDashboard = () => {
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  const ticketsPorHacer = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '13/05/24', priority: 'Sin prioridad', ticketId: '132314' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '14/05/24', priority: 'Sin prioridad', ticketId: '132315' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '15/05/24', priority: 'Sin prioridad', ticketId: '132316' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '15/05/24', priority: 'Sin prioridad', ticketId: '132316' },
  ];

  const ticketsEnProceso = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '16/05/24', priority: 'Baja', ticketId: '132317' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '17/05/24', priority: 'Media', ticketId: '132318' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '18/05/24', priority: 'Alta', ticketId: '132319' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '18/05/24', priority: 'Alta', ticketId: '132319' },
  ];

  const ticketsCompletados = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '19/05/24', priority: 'Baja', ticketId: '132320' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '20/05/24', priority: 'Media', ticketId: '132321' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '21/05/24', priority: 'Alta', ticketId: '132322' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '21/05/24', priority: 'Alta', ticketId: '132322' },
  ];

  return (
    <div className={`min-h-screen bg-white flex relative ${montserrat.className}`}>
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full  fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      <main className='flex-1 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div className='lg:hidden top-4 left-4 z-50'>
            <button
              onClick={toggleMenu}
              className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar className='w-1/2 md:w-1/3' />
        </div>

        <div className='mb-4'>
          <Title className='text-2xl'>Tickets</Title>
        </div>
        <div className='mb-4'>
          <InfoPanel
            selectedPriorities={selectedPriorities}
            setSelectedPriorities={setSelectedPriorities}
          />
        </div>

        <TicketsStatus
          ticketsPorHacer={ticketsPorHacer}
          ticketsEnProceso={ticketsEnProceso}
          ticketsCompletados={ticketsCompletados}
          selectedPriorities={selectedPriorities}
        />
      </main>
    </div>
  )
};

export default TicketsDashboard;






  









  










  









  



