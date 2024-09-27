/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useState } from 'react'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function AsignaciondeTicket() {

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
              Asignacion de Ticket
            </h1>
          </div>

          <form className='mx-auto max-w-lg overflow-y-auto rounded bg-[#F5F5F5] p-4 text-sm shadow-md md:h-[595px] md:w-2/3'>
            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='images'
              >
                Imágenes (Arrastrar o agregar imagenes)
              </label>
              <input
                type='file'
                id='images'
                className='w-full rounded border p-2'
                multiple
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='description'
              >
                Descripción
              </label>
              <textarea
                id='description'
                className='w-full rounded border p-2'
                rows='4'
                placeholder='Equipo cuenta con el problema.....'
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='location'
              >
                Localización
              </label>
              <input
                type='text'
                id='location'
                className='w-full rounded border p-2'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='assignTo'
              >
                Asignar a
              </label>
              <input
                type='text'
                id='assignTo'
                className='w-full rounded border p-2'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='startDate'
              >
                Fecha de Inicio
              </label>
              <input
                type='date'
                id='startDate'
                className='w-full rounded border p-2'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='priority'
              >
                Prioridad
              </label>
              <select id='priority' className='w-full rounded border p-2'>
                <option value='baja'>Baja</option>
                <option value='media'>Media</option>
                <option value='alta'>Alta</option>
              </select>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='rounded bg-[#121d2c] px-4 py-2 font-bold text-white hover:bg-[#223857]'
              >
                Asignar
              </button>
            </div>
          </form>
        </main>
      </div>
    )
 }