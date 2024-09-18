/* eslint-disable @next/next/no-img-element */  
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'


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
            </div>
            <div className='ml-2 mt-1'>
              <Link href='/catalogoDeUsuarios'>
                <button className='text-blue-500 hover:text-blue-700'>
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
                      d='M15 19l-7-7 7-7'
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
                  <a href='#about'>About</a>
                </li>
                <li className='p-4 border-b border-gray-200'>
                  <a href='#contact'>Contact</a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <div className='text-2xl font-semibold text-center my-4'>
            Actualizar Perfil
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-md mx-auto p-4 border border-gray-300 rounded'
          >
            <div className='mb-4'>
              <label
                htmlFor='Id'
                className='block text-sm font-medium text-gray-700'
              >
                Id
              </label>
              <input
                type='text'
                id='id'
                placeholder='6663cd141e150815e43d0a57'
                {...register('id', { required: true })}
                className='mt-1 p-2 block w-full border border-gray-300 rounded'
                readOnly
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='nombre'
                className='block text-sm font-medium text-gray-700'
              >
                Nombre Completo
              </label>
              <input
                type='text'
                id='nombre'
                placeholder='Juanito Perez Gonzalez'
                {...register('nombre', { required: true })}
                className='mt-1 p-2 block w-full border border-gray-300 rounded'
              />
              {errors.nombre && (
                <span className='text-red-500 text-sm'>
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='Correo@dominio.com'
                {...register('email', { required: true })}
                className='mt-1 p-2 block w-full border border-gray-300 rounded'
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Contraseña
              </label>
              <input
                type='password'
                id='password'
                placeholder='********'
                {...register('password', { required: true })}
                className='mt-1 p-2 block w-full border border-gray-300 rounded'
              />
              {errors.password && (
                <span className='text-red-500 text-sm'>
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='cargo'
                className='block text-sm font-medium text-gray-700'
              >
                Cargo
              </label>
              <input
                type='text'
                id='cargo'
                placeholder='Ingeniero'
                {...register('cargo', { required: true })}
                className='mt-1 p-2 block w-full border border-gray-300 rounded'
              />
              {errors.cargo && (
                <span className='text-red-500 text-sm'>
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='foto'
                className='block text-sm font-medium text-gray-700'
              >
                Foto
              </label>
              <input
                type='file'
                id='foto'
                {...register('foto', { required: false })}
                className='mt-1 p-2 block w-full border border-gray-300 rounded'
              />
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='p-2 bg-blue-500 text-white rounded'
              >
                Actualizar
              </button>
            </div>
          </form>
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
