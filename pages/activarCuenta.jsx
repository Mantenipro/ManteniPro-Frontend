/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { activateAccount } from '../pages/api/api'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  {
    placeholder: 'Digito 1',
    name: 'digit1'
  },
  {
    placeholder: 'Digito 2',
    name: 'digit2'
  },
  {
    placeholder: 'Digito 3',
    name: 'digit3'
  },
  {
    placeholder: 'Digito 4',
    name: 'digit4'
  },
  {
    placeholder: 'Digito 5',
    name: 'digit5'
  },
  {
    placeholder: 'Digito 6',
    name: 'digit6'
  }
]

const ActivateAccountForm = ({ textColor, bgColor }) => {
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const activate = await activateAccount(data)// Lógica para activar la cuenta
      toast.success('Cuenta activada')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Error al activar la cuenta')
      console.error('[Activate Account error]', error)
    }
  }

  return (
    <form
      className='flex w-[90%] flex-col justify-center md:w-[60%]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col items-center'>
        <h1 className={`text-[24px] font-bold ${textColor}`}>
          Activa tu cuenta
        </h1>
        <h3 className={textColor}>
          Agrega los 6 dígitos que se enviaron a tu correo
        </h3>
      </div>
      <div className='mt-8 flex w-full flex-col'>
        <div className='flex flex-row gap-2 justify-center'>
          {inputData.map((item, index) => (
            <div key={index} className='relative flex flex-col'>
              <input
                type='text'
                {...register(item.name, { required: true })}
                className='w-12 p-1 text-center'
              />
              {errors[item.name] && (
                <span className='mt-1 text-red-500'>
                  Este campo es requerido
                </span>
              )}
            </div>
          ))}
        </div>
        <div className='my-5'>
          <Link href='#' className={textColor}>
            Volver a mandar
          </Link>
        </div>
        <button
          type='submit'
          className='p- my-4 h-10 w-full rounded-lg bg-[#EEE727] text-[#030000]'
        >
          Activar
        </button>
      </div>
    </form>
  )
}

export default function ActivateAccountPage() {
  return (
    <main className={`${montserrat.className} flex min-h-dvh flex-row`}>
      <Toaster />
      <div className='w-full bg-gradient-to-b from-[#21262D] to-[#31416d] lg:w-[50%]'>
        <img
          src='/ManteniProLogoWhite.svg'
          alt='logo'
          className='my-4 h-[140px] w-[200px] lg:my-[-20px] lg:ml-[-100px] lg:h-[150px] lg:w-[440px]'
        />
        <div className='flex justify-center lg:hidden'>
          <ActivateAccountForm textColor='text-white' bgColor='bg-[#21262D]' />
        </div>
      </div>
      <div className='hidden w-full lg:flex lg:w-[50%] lg:justify-center lg:bg-[#ECECEC]'>
        <ActivateAccountForm textColor='text-black' bgColor='bg-[#ECECEC]' />
      </div>
    </main>
  )
}
