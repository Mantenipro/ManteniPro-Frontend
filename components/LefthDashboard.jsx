/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link'

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
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  return (
    <main className='p-4 text-[#f2f6fc] h-screen'>
      <div className='flex flex-col items-center'>
        <div className='flex w-[10rem] h-[5rem]'>
          <img
            className='w-full h-full'
            src='/ManteniProDashboardWhite.svg'
            alt='Logo'
          />
        </div>

        <div className='my-1 shadow-sm flex flex-col items-center p-4 bg-gradient-to-b from-[#232c48] to-[#4361b2] rounded-[40px] w-[100px] h-[120px]'>
          <img className='w-10 h-10' src='/userphoto.svg' alt='User' />
          <p className='font-bold text-sm'>Name</p>
          <p className='text-xs text-center'>Product Manager</p>
        </div>
      </div>

      <section className='flex flex-col justify-between 2xl:h-3/4 md:h-2/3 h-2/3 mt-6'>
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
              <button className='font-medium text-sm ml-5'>
                {isMenuOpen ? '˄' : '˅'}
              </button>
            </MenuItem>
            {showProfilesMenu && (
              <div className='relative ml-6 mt-2 flex flex-col border-l-gray-200 border-l-2 pl-5'>
                <Link href='/catalogoDeTecnicos'>
                  <div className='hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md p-1'>
                    <p className='text-sm'>Técnicos</p>
                  </div>
                </Link>
                <Link href='/catalogoDeUsuariosv2'>
                  <div className='hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md p-1'>
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
        <div className='Seccion2'>
          <MenuItem icon='/settings-filled-Dash.svg' title='Settings' />
          <MenuItem icon='/person-filled-dash.svg' title='Profile' />
          <MenuItem icon='/signuot-dash.svg' title='Sign Out'>
            <Link href='/inicioSesion'>
              <p className='font-medium text-sm'></p>
            </Link>
          </MenuItem>
        </div>
      </section>
    </main>
  )
}
