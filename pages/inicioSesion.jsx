import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { login } from '../pages/api/api'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import SEOLogin from '@/components/SEOLogin'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  {
    icon: '/iconemail.svg',
    placeholder: 'Correo electrónico',
    name: 'email'
  },
  {
    icon: '/iconpassword.svg',
    placeholder: 'Contraseña',
    name: 'password'
  }
]

const LoginForm = ({ textColor, bgColor }) => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password)

      if (response) {
        const { token, mustChangePassword, role } = response

        localStorage.setItem('email', data.email)
        window.localStorage.setItem('token', token)

        if (mustChangePassword && role !== 'admin') {
          toast.warning('Debes cambiar tu contraseña.', {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto'
            }
          })
          setTimeout(() => {
            router.push('/changePasswordFirst')
          }, 2000)
        } else {
          toast.success('Bienvenido', {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto'
            }
          })

          if (role === 'usuario') {
            setTimeout(() => {
              router.push('/equiposCliente')
            }, 2000)
          } else {
            setTimeout(() => {
              router.push('/ticketsDashboard')
            }, 2000)
          }
        }
      } else {
        toast.error(response.message)
        setError('root.credentials', {
          type: 'manual',
          message: 'Credenciales inválidas'
        })
      }
    } catch (error) {
      toast.error(error.message, {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        }
      })
      setError('root.credentials', {
        type: 'manual',
        message: error.message
      })
    }
  }

  function handleShowHidePassword() {
    setShowPassword(!showPassword)
  }

  return (
    <form
      className='flex w-[90%] flex-col justify-center md:w-[60%]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col items-center'>
        <h1 className='animate-fade-in bg-gradient-to-r from-[#ffffff] to-[#f0f1f3] bg-clip-text text-[32px] font-extrabold tracking-wide text-transparent md:from-[#21262D] md:to-[#414B66]'>
          Ingresa a tu cuenta
        </h1>
      </div>
      <div className='mt-8 flex w-full flex-col'>
        <div className='flex flex-col gap-5'>
          {inputData.map((item, index) => (
            <div key={index} className='relative flex flex-col'>
              <div className='relative flex items-center'>
                <img src={item.icon} alt='' className='absolute left-3' />
                <input
                  type={
                    item.name === 'password' && showPassword
                      ? 'text'
                      : item.name
                  }
                  placeholder={item.placeholder}
                  {...register(item.name, { required: true })}
                  className='w-full p-2 pl-10 pr-20'
                />
                {item.name === 'password' && (
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={() => handleShowHidePassword(!showPassword)}
                  ></button>
                )}
              </div>
              {errors[item.name] && (
                <span className='mt-1 text-red-500'>
                  Este campo es requerido
                </span>
              )}
            </div>
          ))}
        </div>
        <div className='my-5'>
          <Link
            href='/recuperacionDePassword'
            className='text-white duration-200 md:text-gray-700 md:hover:font-medium md:hover:text-gray-800'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <button
          type='submit'
          className='p- my-4 h-10 w-full rounded-lg bg-[#f4ed2d] font-semibold text-sky-950 transition-colors duration-200 hover:bg-[#D6CF15]'
        >
          Log in
        </button>
        <div className='my-7 flex items-center justify-between'>
          <p className={textColor}>¿No tienes cuenta?</p>

          <Link href='/registroUsuario'>
            <motion.span
              className='bg-gradient-to-r from-[#21262D] via-[#7B8DBA] to-[#414B66] bg-[length:200%_100%] bg-clip-text bg-left font-semibold text-transparent'
              animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }}
            >
              Regístrate
            </motion.span>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default function LoginPage() {
  return (
    <>
      <SEOLogin />
      <main className={`${montserrat.className} flex min-h-dvh flex-row`}>
        <Toaster />
        <div className='w-full bg-gradient-to-b from-[#21262D] to-[#31416d] lg:w-[50%]'>
          <img
            src='/ManteniProLogoWhite.svg'
            alt='logo'
            className='my-4 h-[140px] w-[200px] lg:my-[-20px] lg:ml-[-100px] lg:h-[150px] lg:w-[440px]'
          />
          <div className='flex justify-center lg:hidden'>
            <LoginForm textColor='text-white' bgColor='bg-[#21262D]' />
          </div>
        </div>
        <div className='hidden w-full lg:flex lg:w-[50%] lg:justify-center lg:bg-[#ECECEC]'>
          <LoginForm textColor='text-black' bgColor='bg-[#ECECEC]' />
        </div>
      </main>
    </>
  )
}
