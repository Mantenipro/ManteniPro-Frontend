/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchUserData, fetchUserProfile } from '../pages/api/api' // Asegúrate de que la ruta sea correcta
import { useModal } from '../context/ModalContext'
import useAuth from '../hooks/useAuth'

const MenuItem = ({ icon, title, onClick, children }) => (
  <div
    className='mt-2 flex w-full cursor-pointer items-center justify-start rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-[#2D2F39]'
    onClick={onClick}
  >
    <img src={icon} alt={title} />
    <p className='ml-10 text-sm font-medium'>{title}</p>
    {children}
  </div>
)

export default function LefthDashboard() {
  useAuth()
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false)
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: '',
    role: '',
    photo: ''
  })
  const router = useRouter()
  const { openModal } = useModal()

  useEffect(() => {
    // Función para obtener el estado de la suscripción desde la API de perfil
    const fetchSubscriptionStatus = async () => {
      try {
        const userData = await fetchUserData()
        setIsSubscriptionActive(userData.subscription === true)
      } catch (error) {
        console.error('Error fetching subscription status:', error)
      }
    }

    // Función para obtener el perfil del usuario
    const fetchUserProfileData = async () => {
      try {
        const token = window.localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        const profileData = await fetchUserProfile()
        setUserProfile({
          name: profileData.data.name,
          role: profileData.data.role,
          photo: profileData.data.photo // Añadir la propiedad photo
        })
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

    fetchSubscriptionStatus()
    fetchUserProfileData()
  }, [])

  const handleSignOut = () => {
    window.localStorage.removeItem('token')
    router.push('/inicioSesion')
  }

  const handleSubscriptionRedirect = () => {
    router.push('/Suscription')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <main className='h-screen p-2 text-[#f2f6fc]'>
      <div className='flex flex-col items-center'>
        <div className='flex h-[5rem] w-[10rem]'>
          <img
            className='h-full w-full'
            src='/ManteniProDashboardWhite.svg'
            alt='Logo'
          />
        </div>

        <div className='flex h-[120px] w-[100px] flex-col items-center rounded-[40px] bg-gradient-to-b from-[#232c48] to-[#4361b2] p-4 shadow-sm'>
          {/* Usar la propiedad photo si está disponible */}
          <img
            className='md:h-15 md:w-15 rounded-full'
            src={userProfile.photo || '/profilepic.png'}
            alt='User'
          />
          <p className='text-center text-xs font-bold'>{userProfile.name}</p>
          <p className='text-center text-xs'>
            {capitalizeFirstLetter(userProfile.role)}
          </p>
        </div>
      </div>

      <section className='mt-6 flex h-[63vh] flex-col justify-between'>
        <div className='Seccion1'>
          <p className='font-bold'>MAIN</p>
          <div className='flex flex-col'>
            {userProfile.role === 'admin' && (
              <>
                <Link href='/ticketsDashboard'>
                  <MenuItem icon='/tickets-dash.svg' title='Tickets' />
                </Link>
                <MenuItem
                  icon='/perfile-dash.svg'
                  title='Perfiles'
                  onClick={toggleProfilesMenu} // Usar toggleProfilesMenu para controlar el menú desplegable
                >
                  <button className='ml-5 text-sm font-medium'>
                    {showProfilesMenu ? '˄' : '˅'}{' '}
                    {/* Actualiza según el estado */}
                    {showProfilesMenu}
                  </button>
                </MenuItem>
                {showProfilesMenu && (
                  <div className='relative ml-6 mt-2 flex flex-col border-l-2 border-l-gray-200 pl-5'>
                    <Link href='/catalogoDeEmpleados'>
                      <div className='rounded-md p-1 transition-all duration-300 ease-in-out hover:bg-[#2D2F39]'>
                        <p className='text-sm'>Empleados</p>
                      </div>
                    </Link>
                    <Link href='/catalogoDeUsuariosv2'>
                      <div className='rounded-md p-1 transition-all duration-300 ease-in-out hover:bg-[#2D2F39]'>
                        <p className='text-sm'>Clientes</p>
                      </div>
                    </Link>
                  </div>
                )}
                <Link href='/inventarioEquipos'>
                  <MenuItem icon='/equipos-dash.svg' title='Equipos' />
                </Link>
                {!isSubscriptionActive && (
                  <button
                    className='mt-4 rounded-md bg-gradient-to-r from-[#ffd416] to-[#fbf469] p-2 font-semibold text-gray-900 hover:bg-yellow-500'
                    onClick={handleSubscriptionRedirect}
                  >
                    Suscribirse
                  </button>
                )}
              </>
            )}
            {userProfile.role === 'tecnico' && (
              <>
                <Link href='/ticketsDashboard'>
                  <MenuItem icon='/tickets-dash.svg' title='Tickets' />
                </Link>
              </>
            )}
            {userProfile.role === 'usuario' && (
              <>
                <Link href='/gestionDeTickets'>
                  <MenuItem icon='/tickets-dash.svg' title='Tickets' />
                </Link>
                <Link href='/equiposCliente'>
                  <MenuItem icon='/equipos-dash.svg' title='Reporte' />
                </Link>
              </>
            )}
          </div>
        </div>
        <div className='Seccion2'>
          <Link href='/perfil'>
            <MenuItem icon='/person-filled-dash.svg' title='Perfil' />
          </Link>
          <MenuItem
            icon='/headset.svg'
            title='Contáctanos'
            onClick={openModal} // Botón para abrir el modal
          />
          <MenuItem
            icon='/signuot-dash.svg'
            title='Cerrar sesión'
            onClick={handleSignOut}
          />
        </div>
      </section>
    </main>
  )
}
