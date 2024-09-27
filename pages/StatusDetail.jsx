/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useState } from 'react'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'


const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function StatusDetailLayout() {

  
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
            Estado del Ticket
          </h1>
        </div>

        <div className='flex items-center justify-center'>
          <div className='max-h-screen space-y-4 overflow-y-auto md:h-[595px] md:w-2/3'>
            <div className='rounded border p-2 shadow-lg'>
              <div className='flex flex-col justify-between rounded border-b-2 p-2 md:flex-row'>
                <div>
                  <h3 className='p-2 text-lg font-bold'>Reparar Cable</h3>
                </div>
                <div className='flex flex-wrap space-x-2'>
                  <div className='flex cursor-pointer items-center rounded border bg-white p-2 hover:bg-gray-200 sm:w-full md:w-auto'>
                    <img
                      src='/comment.svg'
                      alt='icon'
                      className='mr-2 h-4 w-4 object-cover'
                    />
                    Comentarios
                  </div>
                  <div className='flex cursor-pointer items-center rounded border bg-white p-2 hover:bg-gray-200 sm:w-full md:w-auto'>
                    <img
                      src='/Pencil.svg'
                      alt='icon'
                      className='mr-2 h-5 w-5 object-cover'
                    />
                    Editar
                  </div>
                  <Link
                    href='/AsignaciondeTicket'
                    className='flex cursor-pointer items-center rounded border bg-white p-2 hover:bg-gray-200 sm:w-full md:w-auto'
                  >
                    <img
                      src='/Cargo.svg'
                      alt='icon'
                      className='mr-2 h-4 w-4 object-cover'
                    />
                    Asignar
                  </Link>
                  <Link
                    href='/CierreTicket'
                    className='flex cursor-pointer items-center rounded border bg-white p-2 hover:bg-gray-200 sm:w-full md:w-auto'
                  >
                    <img
                      src='/Close.svg'
                      alt='icon'
                      className='mr-2 h-4 w-4 object-cover'
                    />
                    Cerrar
                  </Link>
                </div>
              </div>

              <div className='mt-4 flex flex-col justify-around space-y-2 md:flex-row md:space-y-0'>
                <div className='flex items-center rounded border-2 border-[#21262D] p-2 text-[#21262D]'>
                  <img
                    src='candado.svg'
                    alt='icon'
                    className='mr-2 h-5 w-5 object-cover'
                  />
                  Abierto
                </div>
                <div className='flex items-center rounded border bg-[#051540] p-2 text-[#EEE727]'>
                  <img
                    src='pause.svg'
                    alt='icon'
                    className='mr-2 h-5 w-5 object-cover'
                  />
                  En Progreso
                </div>
                <div className='flex items-center rounded border-2 border-[#21262D] p-2 text-[#21262D]'>
                  <img
                    src='paloma.svg'
                    alt='icon'
                    className='mr-2 h-5 w-5 object-cover'
                  />
                  Completado
                </div>
              </div>

              <div className='mt-2 flex flex-col justify-around space-y-2 md:flex-row md:space-y-0'>
                <div className='flex flex-col p-2 text-center'>
                  <div>ID Orden de Trabajo:</div>
                  <span>#120</span>
                </div>
                <div className='flex flex-col p-2 text-center'>
                  <div>Tiempo estimado:</div>
                  <span>3h 30min</span>
                </div>
                <div className='flex flex-col p-2 text-center'>
                  <div>Fecha:</div>
                  <span>16/08/2024</span>
                </div>
              </div>

              <div className='flex flex-col justify-between border-t-2 p-2 md:flex-row'>
                <div>
                  <div className='mb-2'>
                    <span className='font-semibold'>Reportado por:</span>
                  </div>
                  <div className='mb-2 flex flex-row items-center'>
                    <img
                      src='/profile.jpg'
                      alt='user-photo'
                      className='m-2 h-8 w-8 rounded-full object-cover'
                    />
                    <div className='flex flex-col justify-center'>
                      <div className='font-bold'>Gabriela Romero</div>
                      <div className='text-xs text-gray-600'>
                        Gabriela55@yahoo.com
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mx-4 h-auto border-l-2'></div>
                <div>
                  <div className='mb-2 mt-2 flex flex-col p-2'>
                    <span className='font-semibold'>Direccion:</span>
                    <span>Jardines Abril Padrón 6079, San Luis</span>
                    <span>Potosí-Soledad 84132</span>
                  </div>
                  <div className='mb-2 p-2'>
                    <span className='font-semibold'>Compañia: Welch Group</span>
                  </div>
                </div>
              </div>

              <div>
                <div className='text-md mb-2 font-semibold'>Descripción:</div>
                <div className='mx-2 rounded bg-gray-200 p-2 md:mx-6'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Exercitationem accusantium cum ea, repellendus quam laborum
                  mollitia officia qui eligendi eos doloremque maxime!
                  Perferendis doloremque unde dignissimos odit quos libero
                  deleniti!
                </div>
              </div>
              <div className='my-2 flex justify-center'>
                <img
                  src='/airConditioning.jpg'
                  alt='user-photo'
                  className='m-1 h-24 w-24 rounded-lg object-cover shadow-md'
                />
              </div>

              <div className='mx-4 h-auto border-b-2'></div>

              <div className='mb-2 flex flex-col items-center rounded-lg bg-white p-2 shadow-md md:flex-row'>
                <img
                  src='/profile.jpg'
                  alt='user-photo'
                  className='m-2 h-12 w-12 rounded-full object-cover'
                />
                <div className='ml-2 flex flex-col justify-center'>
                  <div className='text-md font-bold'>Jane Doe</div>
                  <div className='text-xs text-gray-600'>Técnico</div>
                  <div className='text-xs text-gray-600'>Comentarios:</div>
                  <div className='mt-1 rounded bg-gray-200 p-2 text-xs'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Exercitationem accusantium cum ea, repellendus quam laborum
                    mollitia officia qui eligendi eos doloremque maxime!
                    Perferendis doloremque unde dignissimos odit quos libero
                    deleniti!
                  </div>
                  <button className='px- mt-2 rounded bg-blue-500 py-2 text-white hover:bg-blue-700'>
                    Agregar comentario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
