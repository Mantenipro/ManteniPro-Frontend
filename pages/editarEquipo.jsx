import React from 'react';
import TempSidebar from '../components/TempSidebar';
import Title from '../components/Title';
import FormEquipment from '../components/FormEquipment';
import BurgerMenu from '../components/BurgerMenu';
import LefthDashboard from '@/components/LefthDashboard';
import { useState } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const ActualizarEquipo = () => {

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
      className={`min-h-screen bg-white flex relative ${montserrat.className}`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full  fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      <main className='flex-1 ml-5 flex flex-col'>
        <div className='w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mt-2'>
          <div className='lg:hidden top-4 left-4 z-50'>
            <button
              onClick={toggleMenu}
              className='text-white bg-[#21262D] p-2 rounded-md focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <Title className='text-2xl mt-4 lg:mt-0'>Actualizar equipo</Title>
        </div>

        <div className='w-full max-w-2xl'>
          <FormEquipment />
        </div>
      </main>
    </div>
  )
};

export default ActualizarEquipo;

