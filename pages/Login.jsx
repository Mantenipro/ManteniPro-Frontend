/* eslint-disable @next/next/no-img-element */

import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function Login() {
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-950 to-blue-400 flex items-center justify-center'>
      <div className='absolute top-4 left-4'>
        <button
          className={`text-2xl text-yellow-400 font-medium ${montserrat.className}`}
        >
          ManteniPro
        </button>
      </div>
      <div className='absolute top-4 right-4'>
        <button
          className={`text-2xl text-yellow-400 font-medium ${montserrat.className}`}
        >
          Login
        </button>
      </div>
      <main className=' p-8 rounded w-full max-w-md'>
        <h1
          className={`text-2xl text-white font-medium mb-6 text-center ${montserrat.className} `}
        >
          Ingresa a tu cuenta
        </h1>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className={`block text-sm font-normal text-white ${montserrat.className}`}
            >
              Ingresa tu correo electrónico
            </label>
            <input
              type='email'
              id='email'
              className='mt-1 p-2 block w-full border border-gray-300 rounded'
              placeholder='Correo@dominio.com'
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className={`block text-sm font-normal text-white ${montserrat.className}`}
            >
              Ingresa tu contraseña
            </label>
            <input
              type='password'
              id='password'
              className='mt-1 p-2 block w-full border border-gray-300 rounded'
              placeholder='********'
              required
            />
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className={`w-full p-2 font-medium bg-yellow-400 text-black rounded hover:bg-yellow-600  
                 ${montserrat.className}`}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div>
          <div className='mt-7 text-white'>
            {' '}
            Olvidaste tu contraseña?{' '}
            <a href='#' className='text-yellow-400'>
              Recuperar
            </a>{' '}
          </div>
          <div className='mt-7 text-white'>
            {' '}
            No tienes cuenta?{' '}
            <a href='#' className='text-yellow-400'>
              Registrate
            </a>{' '}
          </div>
        </div>
      </main>
    </div>
  )
}
