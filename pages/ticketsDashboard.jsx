import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import InfoPanel from '../components/InfoPanel';
import TicketsStatus from '../components/TicketsStatus';
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { fetchUserData } from '../pages/api/api'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const TicketsDashboard = () => {
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const userData = await fetchUserData()
        setIsSubscriptionActive(userData.subscription === 'Activa')
      } catch (error) {
        console.error('Error fetching subscription status:', error)
      }
    }

    fetchSubscriptionStatus()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  const ticketsPorHacer = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '13/05/24', priority: 'Sin prioridad', ticketId: '132314' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '14/05/24', priority: 'Sin prioridad', ticketId: '132315' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '15/05/24', priority: 'Sin prioridad', ticketId: '132316' }
  ];
  
  const ticketsEnProceso = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '16/05/24', priority: 'Baja', ticketId: '132317' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '17/05/24', priority: 'Media', ticketId: '132318' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '18/05/24', priority: 'Alta', ticketId: '132319' }
  ];
  
  const ticketsCompletados = [
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '19/05/24', priority: 'Baja', ticketId: '132320' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '20/05/24', priority: 'Media', ticketId: '132321' },
    { title: 'Aire acondicionado no enfría adecuadamente.', description: 'La unidad hace ruidos extraños y el flujo de aire es débil.', username: 'Username', date: '21/05/24', priority: 'Alta', ticketId: '132322' }
  ];
  

  return (
    <div
      className={`relative flex min-h-screen bg-white ${montserrat.className}`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>

      <main className='mt-2 flex-1 px-6'>
        <div className='mb-6 flex items-center justify-between'>
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
        {!isSubscriptionActive && (
          <div className='fixed right-1 top-2 h-[36px] w-full max-w-[20rem] overflow-hidden rounded bg-red-500 py-2 text-white md:max-w-[44rem]'>
            <div className='animate-marquee whitespace-nowrap'>
              Suscripción inactiva. Suscríbase para disfrutar de todas las
              funcionalidades.
            </div>
          </div>
        )}
        <div className='mb-2'>
          <Title className='text-2xl'>Tickets</Title>
        </div>
        <div className='mb-2'>
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






  









  










  









  



