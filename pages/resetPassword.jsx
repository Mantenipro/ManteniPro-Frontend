/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { resetPassword } from '../pages/api/api'
import { useRouter } from 'next/router'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const ChangePasswordForm = ({ textColor, bgColor }) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  })
  const [token, setToken] = useState(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch
  } = useForm()

  // Esperar hasta que `router.query` esté disponible
  useEffect(() => {
    if (router.isReady) {
      const { q } = router.query
      setToken(q)
    }
  }, [router.isReady, router.query])

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Las contraseñas no coinciden'
      })
      return
    }

    try {
      const response = await resetPassword({
        token: token, // Usar el token del estado
        newPassword: data.newPassword
      })

      if (response.success) {
        toast.success('Contraseña cambiada exitosamente', {
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
        }, 3000)
      } else {
        toast.error('Error al cambiar la contraseña')
        setError('root.credentials', {
          type: 'manual',
          message: 'Error al cambiar la contraseña'
        })
      }
    } catch (error) {
      toast.error('Error al cambiar la contraseña')
      console.error('[Change password error]', error)
    }
  }

  const handleShowHidePassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }))
  }

  return (
    <form
      className='flex w-[90%] flex-col justify-center md:w-[60%]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col items-center'>
        <h1 className={`text-[24px] font-bold ${textColor}`}>
          Cambia tu contraseña
        </h1>
      </div>
      <div className='mt-8 flex w-full flex-col'>
        <div className='flex flex-col gap-5'>
          <div className='relative flex flex-col'>
            <div className='relative flex items-center'>
              <img src='/iconpassword.svg' alt='' className='absolute left-3' />
              <input
                type={showPassword.newPassword ? 'text' : 'password'}
                placeholder='Nueva contraseña'
                {...register('newPassword', { required: true })}
                className='w-full p-2 pl-10 pr-20'
              />
              <span
                className='absolute right-2 cursor-pointer text-sm text-black/50 hover:text-slate-800'
                onClick={() => handleShowHidePassword('newPassword')}
              >
                {showPassword.newPassword ? ' Ocultar' : 'Mostrar'}
              </span>
            </div>
            {errors.newPassword && (
              <span className='mt-1 text-red-500'>Este campo es requerido</span>
            )}
          </div>
          <div className='relative flex flex-col'>
            <div className='relative flex items-center'>
              <img src='/iconpassword.svg' alt='' className='absolute left-3' />
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                placeholder='Confirmar contraseña'
                {...register('confirmPassword', { required: true })}
                className='w-full p-2 pl-10 pr-20'
              />
              <span
                className='absolute right-2 cursor-pointer text-sm text-black/50 hover:text-slate-800'
                onClick={() => handleShowHidePassword('confirmPassword')}
              >
                {showPassword.confirmPassword ? ' Ocultar' : 'Mostrar'}
              </span>
            </div>
            {errors.confirmPassword && (
              <span className='mt-1 text-red-500'>
                {errors.confirmPassword.message || 'Este campo es requerido'}
              </span>
            )}
            {watch('newPassword') !== watch('confirmPassword') ? (
              <span className='mt-1 text-red-500'>
                Las contraseñas no coinciden
              </span>
            ) : (
              watch('newPassword') &&
              watch('confirmPassword') && (
                <span className='mt-1 text-green-500'>
                  Las contraseñas coinciden
                </span>
              )
            )}
          </div>
        </div>
        <button
          type='submit'
          className='p- my-4 h-10 w-full rounded-lg bg-[#EEE727] text-[#030000]'
        >
          Cambiar contraseña
        </button>
      </div>
    </form>
  )
}

export default function ChangePasswordPage() {
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
          <ChangePasswordForm textColor='text-white' bgColor='bg-[#21262D]' />
        </div>
      </div>
      <div className='hidden w-full lg:flex lg:w-[50%] lg:justify-center lg:bg-[#ECECEC]'>
        <ChangePasswordForm textColor='text-black' bgColor='bg-[#ECECEC]' />
      </div>
    </main>
  )
}
