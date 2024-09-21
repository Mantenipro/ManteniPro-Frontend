/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link'
import { space } from 'postcss/lib/list'

const infoButton = [
  {
    icon: '/iconemail.svg',
    title: 'Correo electrónico',
    space: ''
  },
  {
    icon: '/iconpassword.svg',
    title: 'Contraseña',
    space: ''
  }
]

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
    <main className='p-4 text-[#f2f6fc]'>
      <div className='flex justify-center items-center flex-col p-0'>
        <div className='flex w-[10rem] h-[5rem]'>
          <img
            className='w-full h-full '
            src='/ManteniProDashboardWhite.svg'
            alt='Logo'
          />
        </div>

        <div className='my-1 shadow-sm flex flex-col items-center p-4 bg-gradient-to-b from-[#232c48] to-[#4361b2] rounded-[40px] w-[100px] h-[120px]'>
          <img className='w-10 h-10' src='/userphoto.svg' alt='' />
          <p className='font-bold text-sm'>Name</p>
          <p className='text-xs text-center'>Product Manager</p>
        </div>
      </div>

      <section className='flex flex-col mt-6 gap-[7rem] md:gap-[15rem]'>
        <div className='Seccion1'>
          <p className='font-bold'>MAIN</p>
          <div className=' flex flex-col justify-around'>
            <div className='mb-8'>
              <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full  hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'>
                <img src='/tickets-dash.svg' alt='' />
                <p className='font-medium text-sm'>Tickets</p>
                <p></p>
              </div>
              <div
                className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full  hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'
                onClick={toggleProfilesMenu}
              >
                <img src='/perfile-dash.svg' alt='' />
                <p className='font-medium text-sm'>Perfiles</p>
                <button className='font-medium text-sm' onClick={toggleMenu}>
                  {' '}
                  {isMenuOpen ? '˄' : '˅'}
                </button>
              </div>
              {showProfilesMenu && (
                <div className='relative ml-6 mt-2 flex flex-col border-l-gray-200 border-l-2 pl-5'>
                  <Link href='/tecnicos'>
                    <div className='hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md p-1'>
                      <p className='text-sm'>Técnicos</p>
                    </div>
                  </Link>
                  <Link href='/usuarios'>
                    <div className='hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md p-1'>
                      <p className='text-sm'>Usuarios</p>
                    </div>
                  </Link>
                </div>
              )}
              <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full  hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'>
                <img src='/equipos-dash.svg' alt='' />
                <p className='font-medium text-sm'>Equipos</p>
                <p></p>
              </div>
            </div>

            <div className='Seccion 2 mt-8'>
              <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full  hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'>
                <img src='/settings-filled-Dash.svg' alt='' />
                <p className='font-medium text-sm'>Settings</p>
                <p></p>
              </div>

              <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full  hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'>
                <img src='/person-filled-dash.svg' alt='' />
                <p className='font-medium text-sm'>Profile</p>
                <p></p>
              </div>

              <div className='flex items-center justify-between mt-2 cursor-pointer p-2 w-full  hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'>
                <img src='/signuot-dash.svg' alt='' />
                <Link href='/loginPage'>
                  <p className='font-medium text-sm'>Sign Out</p>
                </Link>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
