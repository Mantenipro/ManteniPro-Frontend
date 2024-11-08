import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import Title from '../components/Title'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import ChangePasswordForm from '../components/ChangePasswordForm'

const montserrat = Montserrat({ subsets: ['latin'] })

const TicketsDashboard = () => {
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
      className={`relative flex min-h-screen bg-white ${montserrat.className}`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>

      <main className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>
        <div>
          <ChangePasswordForm />
        </div>
      </main>
    </div>
  )
}

export default TicketsDashboard
