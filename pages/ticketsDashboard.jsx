import React, {
  useState,
  useEffect,
  Suspense,
  lazy,
  useMemo,
  startTransition
} from 'react'
import SearchBar from '../components/SearchBar'
import Title from '../components/Title'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { fetchUserData } from '../pages/api/api'

const montserrat = Montserrat({ subsets: ['latin'] })

// Lazy loading de componentes
const InfoPanel = lazy(() => import('../components/InfoPanel'))
const TicketsStatus = lazy(() => import('../components/TicketsStatus'))

const useTickets = () => {
  const [tickets, setTickets] = useState({
    porHacer: [],
    enProceso: [],
    completados: []
  })

  useEffect(() => {
    // Se pueden cargar desde una API aquí, por ahora los simulamos.
    setTickets({
      porHacer: [
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '13/05/24',
          priority: 'Sin prioridad',
          ticketId: '132314'
        },
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '14/05/24',
          priority: 'Sin prioridad',
          ticketId: '132315'
        },
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '15/05/24',
          priority: 'Sin prioridad',
          ticketId: '132316'
        }
      ],
      enProceso: [
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '16/05/24',
          priority: 'Baja',
          ticketId: '132317'
        },
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '17/05/24',
          priority: 'Media',
          ticketId: '132318'
        },
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '18/05/24',
          priority: 'Alta',
          ticketId: '132319'
        }
      ],
      completados: [
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '19/05/24',
          priority: 'Baja',
          ticketId: '132320'
        },
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '20/05/24',
          priority: 'Media',
          ticketId: '132321'
        },
        {
          title: 'Aire acondicionado no enfría adecuadamente.',
          description:
            'La unidad hace ruidos extraños y el flujo de aire es débil.',
          username: 'Username',
          date: '21/05/24',
          priority: 'Alta',
          ticketId: '132322'
        }
      ]
    })
  }, [])

  return tickets
}

const TicketsDashboard = () => {
  const [selectedPriorities, setSelectedPriorities] = useState([])
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false)
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false) // Controla la hidratación
  const tickets = useTickets() // Hook para gestionar tickets

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

  // Verificar si el componente está completamente montado
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  // Memorizar el componente TicketsStatus para evitar renders innecesarios
  const MemoizedTicketsStatus = useMemo(
    () => (
      <TicketsStatus
        ticketsPorHacer={tickets.porHacer}
        ticketsEnProceso={tickets.enProceso}
        ticketsCompletados={tickets.completados}
        selectedPriorities={selectedPriorities}
      />
    ),
    [tickets, selectedPriorities]
  )

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
        <div className='mb-6 flex flex-wrap items-center justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md bg-[#21262D] p-2 text-sm text-white focus:outline-none sm:text-base lg:text-lg'
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>

          <SearchBar />

          <div className='flex flex-col md:mt-0 md:flex-row md:items-center'>
            {!isSubscriptionActive && (
              <div className='fixed bottom-0 left-0 right-0 mx-auto h-[36px] w-full max-w-[20rem] overflow-hidden rounded bg-red-500 py-2 text-center text-white md:relative md:w-auto md:max-w-none md:text-left lg:ml-4'>
                <div className='animate-marquee whitespace-nowrap'>
                  Suscripción inactiva. Suscríbase para disfrutar de todas las
                  funcionalidades.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='mb-2'>
          <Title className='text-2xl'>Tickets</Title>
        </div>

        <div className='mb-2'>
          {isHydrated ? (
            <Suspense fallback={<div>Cargando InfoPanel...</div>}>
              <InfoPanel
                selectedPriorities={selectedPriorities}
                setSelectedPriorities={setSelectedPriorities}
              />
            </Suspense>
          ) : null}
        </div>

        {isHydrated ? (
          <Suspense fallback={<div>Cargando Tickets...</div>}>
            {MemoizedTicketsStatus}
          </Suspense>
        ) : null}
      </main>
    </div>
  )
}

export default TicketsDashboard