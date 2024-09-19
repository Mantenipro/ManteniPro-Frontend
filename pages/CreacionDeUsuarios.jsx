/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */  
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function CreacionDeUsuarios() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => console.log(data)

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
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
            </div>
            <div className='ml-2 mt-1'>
              <Link href='/catalogoDeUsuarios'>
                <button title='Atrás'>
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
                      d='M15 19l-7-7 7-7'
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
                <li className='p-4 border-b border-gray-200'>
                  <a
                    className={`text-base ${montserrat.className} text-white`}
                    href='#home'
                  >
                    Home
                  </a>
                </li>
                <li className='p-4 border-b border-gray-200'>
                  <a
                    className={`text-base ${montserrat.className} text-white`}
                    href='#home'
                  >
                    About
                  </a>
                </li>
                <li className='p-4 border-b border-gray-200'>
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
            Crear Perfil
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-md mx-auto p-4 border border-gray-300 rounded'
          >
            <div className='mb-4'>
              <label
                htmlFor='Id'
                className={`block text-sm font-medium text-gray-700 ${montserrat.className}`}
              >
                Id
              </label>
              <input
                type='text'
                id='id'
                placeholder='6663cd141e150815e43d0a57'
                {...register('id', { required: true })}
                className={`mt-1 p-2 block w-full border border-gray-300 rounded ${montserrat.className}`}
                readOnly
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='nombre'
                className={`block text-sm font-medium text-gray-700 ${montserrat.className}`}
              >
                Nombre Completo
              </label>
              <div className='relative'>
                <img
                  src='/User.svg'
                  className='absolute left-2 top-2.5 w-5 h-5 text-gray-400'
                />
                <input
                  type='text'
                  id='nombre'
                  placeholder='Juanito Perez Gonzalez'
                  {...register('nombre', { required: true })}
                  className={`mt-1 p-2 pl-10 block w-full border border-gray-300 rounded ${montserrat.className}`}
                />
              </div>
              {errors.nombre && (
                <span
                  className={`text-red-500 text-sm ${montserrat.className}`}
                >
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className={`block text-sm font-medium text-gray-700 ${montserrat.className}`}
              >
                Email
              </label>
              <div className='relative'>
                <img
                  src='/Mail.svg'
                  className='absolute left-2 top-2.5 w-5 h-5 text-gray-400'
                />
                <input
                  type='email'
                  id='email'
                  placeholder='Correo@dominio.com'
                  {...register('email', { required: true })}
                  className={`mt-1 p-2 pl-10 block w-full border border-gray-300 rounded ${montserrat.className}`}
                />
              </div>
              {errors.email && (
                <span
                  className={`text-red-500 text-sm ${montserrat.className}`}
                >
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className={`block text-sm font-medium text-gray-700 ${montserrat.className}`}
              >
                Contraseña
              </label>
              <div className='relative'>
                <img
                  src='/Key.svg'
                  className='absolute left-2 top-2.5 w-5 h-5 text-gray-400'
                />
                <input
                  type='password'
                  id='password'
                  placeholder='********'
                  {...register('password', { required: true })}
                  className={`mt-1 p-2 pl-10 block w-full border border-gray-300 rounded ${montserrat.className}`}
                />
              </div>
              {errors.password && (
                <span
                  className={`text-red-500 text-sm ${montserrat.className}`}
                >
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='cargo'
                className={`block text-sm font-medium text-gray-700 ${montserrat.className}`}
              >
                Cargo
              </label>
              <div className='relative'>
                <img
                  src='/Cargo.svg'
                  className='absolute left-2 top-2.5 w-5 h-5 text-gray-400'
                />
                <input
                  type='text'
                  id='cargo'
                  placeholder='Ingeniero'
                  {...register('cargo', { required: true })}
                  className={`mt-1 p-2 block pl-10 w-full border border-gray-300 rounded ${montserrat.className}`}
                />
              </div>
              {errors.cargo && (
                <span
                  className={`text-red-500 text-sm ${montserrat.className}`}
                >
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='foto'
                className={`block text-sm font-medium text-gray-700 ${montserrat.className}`}
              >
                Foto
              </label>
              <input
                type='file'
                id='foto'
                {...register('foto', { required: true })}
                className={`mt-1 p-2 text-xs block w-full border border-gray-300 rounded ${montserrat.className}`}
              />
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className={`p-2 bg-blue-500 text-white rounded ${montserrat.className}`}
              >
                Crear
              </button>
            </div>
          </form>
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
