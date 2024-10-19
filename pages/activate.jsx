/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { activateAccount } from './api/api'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  { placeholder: 'Digito 1', name: 'digit1' },
  { placeholder: 'Digito 2', name: 'digit2' },
  { placeholder: 'Digito 3', name: 'digit3' },
  { placeholder: 'Digito 4', name: 'digit4' },
  { placeholder: 'Digito 5', name: 'digit5' },
  { placeholder: 'Digito 6', name: 'digit6' }
]

const ActivateAccountForm = ({ textColor, bgColor }) => {
  const router = useRouter()
const [token, setToken] = useState(null)
  const inputRefs = useRef([])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    trigger
  } = useForm()

  useEffect(() => {
    if (router.isReady && router.query.token) {
      const { token } = router.query
      setToken(token) // En este caso setUserId debería ser setToken para mayor claridad
    }
  }, [router.isReady, router.query])

  const concatDigits = (data) => {
    return `${data.digit1}${data.digit2}${data.digit3}${data.digit4}${data.digit5}${data.digit6}`
  }

  const onSubmit = async (data) => {

    if (!token) {
      toast.error('No se ha encontrado el token.')
      return
    }
    const activationCode = concatDigits(data)

    try {
      const activate = await activateAccount({ token, activationCode })

      toast.success('Cuenta activada', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        }
      })

      setTimeout(() => {
        router.push('/inicioSesion')
      }, 2000)
    } catch (error) {
      toast.error('Error al activar la cuenta')
      console.error('[Activate Account error]', error)
    }
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target

    // Solo permitir números
    if (!/^\d*$/.test(value)) {
      return
    }

    setValue(inputData[index].name, value)
    trigger(inputData[index].name)

    // Mover el foco al siguiente input si se ingresa un valor
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    // Si se presiona Backspace y el campo está vacío, mover el foco al campo anterior
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputRefs.current[index - 1].focus()
    }
  }

  // Función para reenviar el código de activación
  const handleResend = async () => {
    try {
      await resendActivationCode({ id: userId })
      toast.success('Código de activación reenviado.')
    } catch (error) {
      toast.error('Error al reenviar el código.')
      console.error('[Resend Activation Code error]', error)
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
        <div className='flex flex-row justify-center gap-2'>
          {inputData.map((item, index) => (
            <div key={index} className='relative flex flex-col'>
              <input
                type='text'
                maxLength={1}
                {...register(item.name, { required: true })}
                className={`w-12 border p-1 text-center ${
                  errors[item.name] ? 'border-red-500' : 'border-gray-300'
                }`}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            </div>
          ))}
        </div>
        <div className='my-5'>
          <button type='button' onClick={handleResend} className={textColor}>
            Reenviar código
          </button>
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
