/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { recoverPassword } from '../pages/api/api' // Importa la función API

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const PasswordRecoveryForm = ({ textColor, bgColor }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  // Lógica de envío de formulario
  const onSubmit = async (data) => {
    try {
      // Llamada a la función recoverPassword con el email ingresado
      const response = await recoverPassword(data.email)

      if (response.message) {
        // Mensaje de éxito
        toast.success('Correo de recuperación enviado, revisa tu correo electronico para ingresar al link y reestablecer tu contraseña', {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw', // Ajuste para pantallas pequeñas
            width: 'auto'
          },
        })
        setTimeout(() => {
          router.push('/') // Redirige al resetPassword después de enviar el correo
        }, 4000) // Espera 2 segundos antes de redirigir// Redirige al login después de enviar el correo
      } else {
        // Si hay error en la respuesta
        toast.error(`${response.message}`)
        setError('email', {
          type: 'manual',
          message: response.message
        })
      }
    } catch (error) {
      // Manejo de errores de red o API
      toast.error(`${error.message}, favor de revisar el correo electronico para reestablecimiento de contraseña`, {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw', // Ajuste para pantallas pequeñas
          width: 'auto'
        }
      })
      setTimeout(() => {
        router.push('/inicioSesion') // Redirige al resetPassword después de enviar el correo
      }, 5000)
      setError('email', {
        type: 'manual',
        message: error.message
      })
    }
  }

  return (
    <form
      className='flex w-[90%] flex-col justify-center md:w-[60%]'
      onSubmit={handleSubmit(onSubmit)} // Conecta el envío del formulario con onSubmit
    >
      <div className='flex flex-col items-center'>
        <h1 className={`text-[24px] font-bold ${textColor}`}>
          Recupera tu contraseña
        </h1>
      </div>
      <div className='mt-8 flex w-full flex-col'>
        <div className='flex flex-col gap-5'>
          <div className='relative flex flex-col'>
            <div className='relative flex items-center'>
              <img src='/iconemail.svg' alt='' className='absolute left-3' />
              <input
                type='email'
                placeholder='Correo electrónico'
                {...register('email', { required: true })} // Registro del campo email
                className='w-full p-2 pl-10 pr-20'
              />
            </div>
            {errors.email && (
              <span className='mt-1 text-red-500'>Este campo es requerido</span>
            )}
          </div>
        </div>
        <button
          type='submit'
          className='p- my-4 h-10 w-full rounded-lg bg-[#EEE727] text-[#030000]'
        >
          Enviar correo de recuperación
        </button>
      </div>
    </form>
  )
}

export default function PasswordRecoveryPage() {
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
          <PasswordRecoveryForm textColor='text-white' bgColor='bg-[#21262D]' />
        </div>
      </div>
      <div className='hidden w-full lg:flex lg:w-[50%] lg:justify-center lg:bg-[#ECECEC]'>
        <PasswordRecoveryForm textColor='text-black' bgColor='bg-[#ECECEC]' />
      </div>
    </main>
  )
}
