import React from 'react';
import EquipmentDetails from '../components/EquipmentDetails';
import QRCodeDisplay from '../components/QRCodeDisplay';
import LefthDashboard from '@/components/LefthDashboard';
import { useState, useEffect } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { useRouter } from 'next/router'
import { fetchEquimentById } from '../pages/api/api'

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const DetalleEquipo = () => {

  const [showProfilesMenu, setShowProfilesMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const router = useRouter()
   const [initialData, setInitialData] = useState(null)

   useEffect(() => {
     const fetchData = async () => {
       if (router.query.id) {
         const data = await fetchEquimentById(router.query.id)
         setInitialData(data)
       }
     }
     fetchData()
   }, [router.query.id])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu);
  };

  return (
    <div
      className={`relative flex min-h-screen bg-gray-100 ${montserrat.className}`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>

      <main className='flex flex-1 flex-col items-center justify-center lg:flex-row'>
        <div className='flex flex-1 flex-col'>
          <div className='ml-3 mt-2 flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
            <div className='left-4 top-4 z-50 lg:hidden'>
              <button
                onClick={toggleMenu}
                className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
              >
                {isMenuOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>

          {/* Contenedor común para EquipmentDetails y QRCodeDisplay centrado */}
          <div className='flex flex-col items-center justify-center space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0'>
            <EquipmentDetails initialData={initialData} />
            <QRCodeDisplay />
          </div>
        </div>
      </main>
    </div>
  )
};

export default DetalleEquipo;







