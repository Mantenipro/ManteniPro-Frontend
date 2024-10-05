/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react'
import { useState } from 'react'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import SignatureCanvas from 'react-signature-canvas'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function CierreTicket() {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  const sigCanvas = useRef(null)

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
        <div className='flex lg:items-center lg:justify-between'>
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
          <h1
            className={`mb:text-left mb-2 ml-3 text-center text-3xl font-bold ${montserrat.className}`}
            style={{ color: '#2E3A59' }}
          >
            Cierre de Ticket
          </h1>
        </div>

        <form className='mx-auto max-w-lg overflow-y-auto rounded bg-[#F5F5F5] p-4 text-sm shadow-md md:h-[595px] md:w-2/3'>
          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='orderId'>
              Id de la Orden
            </label>
            <input
              type='text'
              id='orderId'
              className='w-full rounded border p-2'
              placeholder='Ingrese el ID de la orden'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='solution'>
              Solución elaborada por el ingeniero
            </label>
            <textarea
              id='solution'
              className='w-full rounded border p-2'
              rows='4'
              placeholder='Describa la solución elaborada'
            ></textarea>
          </div>

          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='startDate'>
              Fecha de Inicio
            </label>
            <input
              type='date'
              id='startDate'
              className='w-full rounded border p-2'
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='endDate'>
              Fecha de Término
            </label>
            <input
              type='date'
              id='endDate'
              className='w-full rounded border p-2'
            />
          </div>

          <div className='flex flex-col'>
            <label
              className='mb-2 font-bold text-gray-700'
              htmlFor='clientApproval'
            >
              VoBo del Cliente
            </label>
            <SignatureCanvas
              ref={sigCanvas}
              penColor='black'
              canvasProps={{ className: 'w-full rounded border p-2' }}
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            >
              Cerrar Ticket
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
