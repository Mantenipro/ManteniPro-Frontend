/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Montserrat } from 'next/font/google'
import { useForm } from 'react-hook-form'

const montserrat = Montserrat({ subsets: ['latin'] })


export default function Login() {

   const {
     register,
     handleSubmit,
     formState: { errors }
   } = useForm()

   const onSubmit = (data) => {
     console.log(data)
   }

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-950 to-blue-400 flex items-center justify-center'>
      <div className='absolute top-4 left-4'>
        <img
          src='/logoManteniPro.png'
          alt='logo'
          className='w-24 h-10 lg:w-52 lg:h-52 my-5'
        />
      </div>
      <div className='absolute top-4 right-4'>
        <button
          className={`text-2xl text-yellow-400 font-medium w-24 h-10 lg:w-52 lg:h-10 my-5 ${montserrat.className}`}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className={`block text-sm font-normal text-white ${montserrat.className}`}
            >
              Ingresa tu correo electrónico
            </label>
            <div className='relative'>
              <img
                src='/Mail.svg'
                className='absolute left-2 top-2.5 w-5 h-5 text-gray-400'
              />
              <input
                type='email'
                id='email'
                className={`mt-1 p-2 pl-10 block w-full border border-gray-300 rounded ${montserrat.className}`}
                placeholder='Correo@dominio.com'
                {...register('email', {
                  required: 'Este campo es obligatorio'
                })}
              />
            </div>
            {errors.email && (
              <p className={`text-red-500 ${montserrat.className}`}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className={`block text-sm font-normal text-white ${montserrat.className}`}
            >
              Ingresa tu contraseña
            </label>
            <div className='relative'>
              <img
                src='/Key.svg'
                className='absolute left-2 top-2.5 w-5 h-5 text-gray-400'
              />
              <input
                type='password'
                id='password'
                className={`mt-1 p-2 pl-10 block w-full border border-gray-300 rounded ${montserrat.className}`}
                placeholder='Contraseña'
                {...register('password', {
                  required: 'Este campo es obligatorio'
                })}
              />
            </div>
            {errors.password && (
              <p className={`text-red-500 ${montserrat.className}`}>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className={`bg-yellow-500 text-white p-2 rounded text-sm hover:bg-yellow-600 ${montserrat.className}`}
          >
            Iniciar sesión
          </button>
        </form>
        <div>
          <div className={`text-sm mt-7 text-white ${montserrat.className}`}>
            {' '}
            Olvidaste tu contraseña?{' '}
            <a
              href='#'
              className={`text-sm text-yellow-400 hover:text-white ${montserrat.className}`}
            >
              Recuperar
            </a>{' '}
          </div>
          <div className={`text-sm mt-7 text-white ${montserrat.className}`}>
            {' '}
            No tienes cuenta?{' '}
            <a
              href='#'
              className={`text-sm text-yellow-400 hover:text-white ${montserrat.className}`}
            >
              Registrate
            </a>{' '}
          </div>
        </div>
      </main>
    </div>
  )
}
