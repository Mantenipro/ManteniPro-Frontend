/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function StatusTicket() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

 const [isModalOpen, setIsModalOpen] = useState(false)

 const handleDelete = () => {
   // Lógica para borrar el usuario
   console.log('Usuario borrado')
   setIsModalOpen(false)
 }

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow'>
        <div className='relative'>
          <nav className='flex items-center justify-between p-4 bg-indigo-500'>
            <div className='flex items-center space-x-4 w-full'>
              <button className='p-2 focus:outline-none' onClick={toggleMenu}>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='White'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16m-7 6h7'
                  ></path>
                </svg>
              </button>
              <input
                type='text'
                placeholder='Buscar...'
                className='w-full p-2 border border-gray-300 rounded'
              />
              <Link href='/StatusTicket'>
                <button title='Status Ticket'>
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='white'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 12H9m4 0V8m0 4v4m-4-4h4m0 0H9m4 0h4'
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </nav>
          {isOpen && (
            <div className='absolute top-0 left-0 w-full bg-indigo-500 shadow-md'>
              <button
                className='absolute top-2 right-2 p-2 focus:outline-none'
                onClick={toggleMenu}
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
              <ul>
                <li className='p-4 border-b border-gray-200 hover:bg-blue-700'>
                  <a
                    className={`text-base ${montserrat.className} text-white`}
                    href='#home'
                  >
                    Home
                  </a>
                </li>
                <li className='p-4 border-b border-gray-200 hover:bg-blue-700'>
                  <a
                    className={`text-base ${montserrat.className} text-white`}
                    href='#home'
                  >
                    About
                  </a>
                </li>
                <li className='p-4 border-b border-gray-200 hover:bg-blue-700'>
                  <a
                    className={`text-base ${montserrat.className} text-white`}
                    href='#contact'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <div
            className={`text-2xl font-medium text-center my-4 ${montserrat.className}`}
          >
            Status Ticket
          </div>
          <div className='flex justify-center my-4'>
            <div className='flex items-center space-x-4'>
              <label
                htmlFor='sort'
                className={`text-sm ${montserrat.className}`}
              >
                Ordenar por:
              </label>
              <select id='sort' className='p-2 border border-gray-300 rounded'>
                <option
                  className={`text-sm ${montserrat.className}`}
                  value='date'
                >
                  Ticket ID
                </option>
                <option
                  className={`text-sm ${montserrat.className}`}
                  value='name'
                >
                  Fecha de creación
                </option>
              </select>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-2 items-center'>
            <div className='flex flex-row sm:flex-row sm:mb-0 items-center p-4 border mx-0.5 border-gray-300 rounded mb-4 w-full max-w-full'>
              <img
                src='https://via.placeholder.com/50'
                alt='User'
                className='w-12 h-12 rounded-full'
              />
              <div className='ml-4'>
                <div className={`text-lg font-medium ${montserrat.className}`}>
                  Ticket ID
                </div>
                <div
                  className={`text-sm text-gray-700 ${montserrat.className}`}
                >
                  Status
                </div>
              </div>
              <div className='ml-auto flex space-x-4 mt-4 sm:mt-0'>
                <Link href='ActualizarUsuario'>
                  <button
                    title='Actualizar'
                    className='p-2 text-blue-500 hover:text-blue-700'
                  >
                    <img src='Pencil.svg' alt='' />
                  </button>
                </Link>
                <button
                  title='Borrar'
                  onClick={() => setIsModalOpen(true)}
                  className='p-2 text-red-500 hover:text-red-700'
                >
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 12 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M11.2504 1.81266L7.2872 5.7759L6.93365 6.12946L7.2872 6.48301L11.2504 10.4463L10.6493 11.0473L6.6861 7.08411L6.33255 6.73055L5.979 7.08411L2.01575 11.0473L1.41466 10.4463L5.3779 6.48301L5.73145 6.12946L5.3779 5.7759L1.41466 1.81266L2.01575 1.21156L5.979 5.17481L6.33255 5.52836L6.6861 5.17481L10.6493 1.21156L11.2504 1.81266Z'
                      fill='#FF0707'
                      stroke='#FF0707'
                    />
                  </svg>
                </button>
                {isModalOpen && (
                  <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white p-4 rounded'>
                      <p className={`text-xs ${montserrat.className}`}>
                        ¿Estás seguro de que deseas borrar este usuario?
                      </p>
                      <div className='flex justify-end mt-4'>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className={`text-xs mr-2 p-2 bg-gray-300 rounded ${montserrat.className}`}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleDelete}
                          className={`text-xs p-2 bg-red-500 text-white rounded ${montserrat.className}`}
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className='mt-8 p-4 bg-indigo-500 text-center'>
        <p className={`text-xs ${montserrat.className} text-white `}>
          © 2024 ManteniPro. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
