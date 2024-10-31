import React from 'react';
import Title from '../components/Title';
import FormEquipment from '../components/FormEquipment';
import LefthDashboard from '@/components/LefthDashboard';
import { useState, useEffect } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { useRouter } from 'next/router'
import { fetchEquimentById } from '../pages/api/api'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const ActualizarEquipo = () => {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

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

      <main className='ml-3 flex flex-1 flex-col items-center justify-center lg:flex-row'>
        <div className='flex flex-1 flex-col items-center'>
          <div className='mt-2 flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
            <div className='left-4 top-4 z-50 lg:hidden'>
              <button
                onClick={toggleMenu}
                className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
              >
                {isMenuOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>
          <Title className='text-base'>Actualizar equipo</Title>
          <FormEquipment initialData={initialData} />
        </div>
      </main>
    </div>
  )
};

export default ActualizarEquipo;


