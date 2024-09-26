import React from 'react'
import SearchBar from '../components/SearchBar'
import SortTeams from '../components/SortTeams'
import Title from '../components/Title'
import UserCard from '../components/UserCard'
import LefthDashboard from '@/components/LefthDashboard'
import { useState } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import AddUser from '@/components/AddUser'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const dummys = [
  {
    name: 'HUIKJJASJDKKASDK',
    email: 'ASDAS@JUHASDH.COM',
    contraseña: 'ASD5246ASD',
    cargo: 'Tecnico',
    foto: '/qr.jpg',
    verificado: 'verificado'
  },
  {
    name: 'HUIKJJASJDKKASDK',
    email: 'ASDAS@JUHASDH.COM',
    contraseña: 'ASD5246ASD',
    cargo: 'Tecnico',
    foto: '/qr.jpg'
  },
  {
    name: 'HUIKJJASJDKKASDK',
    email: 'ASDAS@JUHASDH.COM',
    contraseña: 'ASD5246ASD',
    cargo: 'Tecnico',
    foto: '/qr.jpg'
  },
  {
    name: 'HUIKJJASJDKKASDK',
    email: 'ASDAS@JUHASDH.COM',
    contraseña: 'ASD5246ASD',
    cargo: 'Tecnico',
    foto: '/qr.jpg',
    verificado: 'verificado'
  }
]

const Catalogo = () => {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  return (
    <div
      className={`${montserrat.className} h-dvh flex flex-row lg:flex-grow relative`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full  fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>
      <main className='flex-1 p-6'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='lg:hidden top-4 left-4 z-50'>
            <button
              onClick={toggleMenu}
              className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <SearchBar className='w-1/2 md:w-1/3 ' />
          <AddUser className='text-sm' />
        </div>

        <div className='mt-8 mb-4'>
          <Title className='text-2xl'>Catálogo de Usuarios</Title>
          <div className='mt-4 flex justify-between items-center'>
            <SortTeams />
          </div>
        </div>

        <div className='mt-8 space-y-6'>
          {dummys.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Catalogo
