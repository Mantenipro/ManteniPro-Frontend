/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Link from 'next/link'

export default function CatalogoDeUsuarios() {
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
          <nav className='flex items-center justify-between p-4 bg-gray-100'>
            <div className='flex items-center space-x-4 w-full'>
              <button className='p-2 focus:outline-none' onClick={toggleMenu}>
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
                    d='M4 6h16M4 12h16m-7 6h7'
                  ></path>
                </svg>
              </button>
              <input
                type='text'
                placeholder='Buscar...'
                className='w-full p-2 border border-gray-300 rounded'
              />
              <Link href='/CreacionDeUsuarios'>
                <button className=' text-blue-500 hover:text-blue-700'>
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
                      d='M15 12H9m4 0V8m0 4v4m-4-4h4m0 0H9m4 0h4'
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </nav>
          {isOpen && (
            <div className='absolute top-0 left-0 w-full bg-white shadow-md'>
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
                <li className='p-4 border-b border-gray-200'>
                  <a href='#home'>Home</a>
                </li>
                <li className='p-4 border-b border-gray-200'>
                  <a href='#home'>Plan</a>
                </li>
                <li className='p-4 border-b border-gray-200'>
                  <a href='#contact'>About</a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <div className='text-2xl font-semibold text-center my-4'>
            Catálogo de Usuarios
          </div>
          <div className='flex justify-center my-4'>
            <div className='flex items-center space-x-4'>
              <label htmlFor='sort' className='text-sm'>
                Ordenar por:
              </label>
              <select id='sort' className='p-2 border border-gray-300 rounded'>
                <option value='date'>Fecha de creación</option>
                <option value='name'>Nombre</option>
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
                <div className='text-lg font-semibold'>Nombre del Usuario</div>
                <div className='text-sm text-gray-600'>correo@ejemplo.com</div>
              </div>
              <div className='ml-auto flex space-x-4 mt-4 sm:mt-0'>
                <Link href='ActualizarUsuario'>
                  <button className='p-2 text-blue-500 hover:text-blue-700'>
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
                        d='M15 12H9m4 0V8m0 4v4m-4-4h4m0 0H9m4 0h4'
                      ></path>
                    </svg>
                  </button>
                </Link>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='p-2 text-red-500 hover:text-red-700'
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
                {isModalOpen && (
                  <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white p-4 rounded'>
                      <p>¿Estás seguro de que deseas borrar este usuario?</p>
                      <div className='flex justify-end mt-4'>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className='mr-2 p-2 bg-gray-300 rounded'
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleDelete}
                          className='p-2 bg-red-500 text-white rounded'
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
      <footer className='mt-8 p-4 bg-gray-200 text-center'>
        <p className='text-sm text-gray-600'>
          © 2024 ManteniPro. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  )
}
