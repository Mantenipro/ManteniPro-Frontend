/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchUserData } from '../pages/api/api'; // Asegúrate de que la ruta sea correcta

const MenuItem = ({ icon, title, onClick, children }) => (
  <div
    className='flex items-center justify-start mt-2 cursor-pointer p-2 w-full hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'
    onClick={onClick}
  >
    <img src={icon} alt={title} />
    <p className='font-medium text-sm ml-10'>{title}</p>
    {children}
  </div>
)

export default function LefthDashboard() {
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Función para obtener el estado de la suscripción desde la API de perfil
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
   
  const handleSignOut = () => {
    window.localStorage.removeItem('token')
    router.push('/inicioSesion')
  }

  const handleSubscriptionRedirect = () => {
    router.push('/Suscription')
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  return (
    <main className='h-screen p-4 text-[#f2f6fc]'>
      <div className='flex flex-col items-center'>
        <div className='flex h-[5rem] w-[10rem]'>
          <img
            className='h-full w-full'
            src='/ManteniProDashboardWhite.svg'
            alt='Logo'
          />
        </div>

        <div className='my-1 flex h-[120px] w-[100px] flex-col items-center rounded-[40px] bg-gradient-to-b from-[#232c48] to-[#4361b2] p-4 shadow-sm'>
          <img className='h-10 w-10' src='/userphoto.svg' alt='User' />
          <p className='text-sm font-bold'>Name</p>
          <p className='text-center text-xs'>Product Manager</p>
        </div>
      </div>

      <section className='mt-6 flex h-2/3 flex-col justify-between md:h-2/3 2xl:h-3/4'>
        <div className='Seccion1'>
          <p className='font-bold'>MAIN</p>
          <div className='flex flex-col'>
            <Link href='/ticketsDashboard'>
              <MenuItem icon='/tickets-dash.svg' title='Tickets' />
            </Link>
            <MenuItem
              icon='/perfile-dash.svg'
              title='Perfiles'
              onClick={toggleProfilesMenu}
            >
              <button className='ml-5 text-sm font-medium'>
                {isMenuOpen ? '˄' : '˅'}
              </button>
            </MenuItem>
            {showProfilesMenu && (
              <div className='relative ml-6 mt-2 flex flex-col border-l-2 border-l-gray-200 pl-5'>
                <Link href='/catalogoDeTecnicos'>
                  <div className='rounded-md p-1 transition-all duration-300 ease-in-out hover:bg-[#2D2F39]'>
                    <p className='text-sm'>Técnicos</p>
                  </div>
                </Link>
                <Link href='/catalogoDeUsuariosv2'>
                  <div className='rounded-md p-1 transition-all duration-300 ease-in-out hover:bg-[#2D2F39]'>
                    <p className='text-sm'>Usuarios</p>
                  </div>
                </Link>
              </div>
            )}
            <Link href='/inventarioEquipos'>
              <MenuItem icon='/equipos-dash.svg' title='Equipos' />
            </Link>
          </div>
        </div>
        {!isSubscriptionActive && (
          <button onClick={handleSubscriptionRedirect}>Suscribirse</button>
        )}
        <div className='Seccion2'>
          <MenuItem icon='/settings-filled-Dash.svg' title='Settings' />
          <Link href='/perfil'>
            <MenuItem icon='/person-filled-dash.svg' title='Profile' />
          </Link>
          <MenuItem
            icon='/signuot-dash.svg'
            title='Sign Out'
            onClick={handleSignOut}
          />
        </div>
      </section>
    </main>
  )
}
