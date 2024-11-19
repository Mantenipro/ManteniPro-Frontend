/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Title from '../components/Title'
import FormDetailsTicket from '../components/FormDetailsTicket'
import { useState, useEffect } from 'react'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { getReportById } from './api/api'
import { useRouter } from 'next/router'
import { MdArrowBackIosNew } from "react-icons/md";

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })


export default function StatusDetailLayout() {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false) 
  const router = useRouter()
  const [initialData, setInitialData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (router.query.ticketId) {
        console.log('router.query.ticketId:', router.query.ticketId)
        const data = await getReportById(router.query.ticketId)
        setInitialData(data)
      }
    }
    fetchData()
  }, [router.query.ticketId])

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

const handleBack = () => {
  router.back()
}

  return (
    <div
      className={`${montserrat.className} relative flex h-dvh flex-row lg:flex-grow`}
    >
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>
      <main className='flex-1 p-6'>
        <div className='flex items-center justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='flex h-10 w-10 items-center justify-center rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
          <button
            onClick={handleBack}
            className='absolute right-[1.5rem] top-[1.5rem] z-50 flex h-10 w-10 items-center justify-center rounded-md bg-[#21262D] p-2 text-white focus:outline-none lg:static lg:ml-4'
          >
            <MdArrowBackIosNew className='h-5 w-5' />
          </button>
        </div>
        <div className='flex justify-center'>
          <Title className='mt-2 text-2xl lg:mt-0'>Estado del Ticket</Title>
        </div>
        <FormDetailsTicket initialData={initialData} />
      </main>
    </div>
  )
}
