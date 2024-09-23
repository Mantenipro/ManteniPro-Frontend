import React from 'react';
import TempSidebar from '../components/TempSidebar';
import BurgerMenu from '../components/BurgerMenu';
import EquipmentDetails from '../components/EquipmentDetails';
import QRCodeDisplay from '../components/QRCodeDisplay';
import LefthDashboard from '@/components/LefthDashboard'
import { useState } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const DetalleEquipo = () => {

  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  return (
    <div className='min-h-screen bg-gray-100 flex relative'>
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full  fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      <main className='flex-1 p-6 flex flex-col lg:flex-row'>
        <div className='flex-1 flex flex-col'>
          <div className='w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
            <BurgerMenu className='text-sm' />
          </div>
          <EquipmentDetails />
        </div>

        <div className='flex-shrink-0  lg:mt-5 lg:ml-8 '>
          <QRCodeDisplay />
        </div>
      </main>
    </div>
  )
};

export default DetalleEquipo;





