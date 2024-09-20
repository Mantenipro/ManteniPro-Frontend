/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { Montserrat } from 'next/font/google'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

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
    <div className='min-h-screen flex flex-col lg:flex-row'>
      <div className='lg:flex lg:bg-gradient-to-b from-[#21262D] to-[#31416d] w-full lg:w-1/2 flex-col'>
        <div className='p-4'>
          <img
            src='/logoManteniPro.png'
            alt='logo'
            className='w-24 h-10 lg:w-36 lg:h-20'
          />
        </div>
      </div>
      <div className='w-full lg:w-1/2 flex items-center justify-center'>
        <main className='p-8 rounded w-full max-w-md'>
          <h1
            className={`text-2xl text-white font-medium mb-6 text-center ${montserrat.className}`}
          >
            Ingresa a tu cuenta
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col items-center mb-5'>
              <h1 className='text-[24px] font-bold text-black'>
                Ingresa a tu cuenta
              </h1>
            </div>
            <div className='mb-4'>
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
            <div className='my-5'>
              <Link href='#' className='text-black'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
              Iniciar sesión
            </button>
            <div className='flex gap-32 my-7'>
              <p className='text-black'>¿No tienes cuenta? </p>
              <Link href='createAcountPage' className='text-[#31416d]'>
                Registrate
              </Link>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
