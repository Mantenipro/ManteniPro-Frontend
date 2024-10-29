import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import Title from '../components/Title'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { fetchUserData, fetchUserProfile } from '../pages/api/api'

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
  const [loadingTickets, setLoadingTickets] = useState(true)

  useEffect(() => {
    // Simulamos la carga de los tickets
    const loadTickets = () => {
      setLoadingTickets(true)
      setTimeout(() => {
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
        setLoadingTickets(false)
      }, 2000) // Simula 2 segundos de carga
    }

    loadTickets()
  }, [])

  return { tickets, loadingTickets }
}

const TicketsDashboard = () => {
  const [selectedPriorities, setSelectedPriorities] = useState([])
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false)
  const [isSubscriptionSuspended, setIsSubscriptionSuspended] = useState(false)
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [userDataDate, setUserDataDate] = useState({ endDate: ''})

  // Hook personalizado que gestiona los tickets
  const { tickets, loadingTickets } = useTickets()

  useEffect(() => {
   const fetchSubscriptionStatus = async () => {
     try {
       const userData = await fetchUserData()
       console.log('User Data:', userData) // Agrega este log
       setIsSubscriptionActive(userData.subscription === 'Activa')
       setIsSubscriptionSuspended(userData.cancelAtPeriodEnd)
       setUserDataDate(userData.endDate)
     } catch (error) {
       console.error('Error fetching subscription status:', error)
       setApiError(error.message)
     } finally {
       setLoading(false)
     }
   }

    const fetchUserProfileData = async () => {
      try {
        const token = window.localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        const profileData = await fetchUserProfile()
        setUserRole(profileData.data.role)
      } catch (error) {
        console.error('Error fetching user profile:', error)
        setApiError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfileData()
    fetchSubscriptionStatus()
  }, [])

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  const filteredTickets = useMemo(() => {
    switch (userRole) {
      case 'admin':
        return tickets
      case 'usuario':
        return {
          enProceso: tickets.enProceso,
          completados: tickets.completados
        }
      case 'tecnico':
        return {
          porHacer: tickets.porHacer,
          completados: tickets.completados
        }
      default:
        return tickets
    }
  }, [tickets, userRole])

  const MemoizedTicketsStatus = useMemo(
    () => (
      <TicketsStatus
        ticketsPorHacer={filteredTickets.porHacer || []}
        ticketsEnProceso={filteredTickets.enProceso || []}
        ticketsCompletados={filteredTickets.completados || []}
        selectedPriorities={selectedPriorities}
      />
    ),
    [filteredTickets, selectedPriorities]
  )

  return (
    <div
      className={`relative flex min-h-screen bg-white ${montserrat.className}`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[53%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out sm:w-[30%] md:w-[25%] lg:static lg:w-[18%] lg:translate-x-0 xl:w-[15%] 2xl:w-[13%]`}
      >
        <LefthDashboard />
      </div>

      <main className='mt-1 flex-1 px-6'>
        <div className='mb-4 flex flex-wrap items-center justify-between'>
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
            {userRole === 'admin' &&
              !isSubscriptionActive &&
              !isSubscriptionSuspended && (
                <div className='fixed bottom-0 left-0 right-0 mx-auto h-[36px] w-auto rounded bg-red-500 py-2 text-center text-white'>
                  <div className='animate-marquee whitespace-nowrap'>
                    Suscripción inactiva. Suscríbase para disfrutar de todas las
                    funcionalidades.
                  </div>
                </div>
              )}
            {userRole === 'admin' && isSubscriptionSuspended && (
              <div className='fixed bottom-0 left-0 right-0 mx-auto h-[36px] w-auto rounded bg-yellow-500 py-2 text-center text-white'>
                <div className='animate-marquee whitespace-nowrap'>
                  Suscripción suspendida. Se encuentra activa hasta{' '}
                  {userDataDate}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='mb-1'>
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

        <div className='mb-2'>
          {loading || loadingTickets ? (
            <div>Cargando Tickets...</div>
          ) : apiError ? (
            <div>Error: {apiError}</div>
          ) : (
            <Suspense fallback={<div>Cargando Tickets...</div>}>
              {MemoizedTicketsStatus}
            </Suspense>
          )}
        </div>
      </main>
    </div>
  )
}

export default TicketsDashboard
