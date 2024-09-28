/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from "react"
import { login } from '../pages/api/api'
import { useRouter } from 'next/router'

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
      const token = await login(data.email, data.password)

      if (token) {
        window.localStorage.setItem('token', token)
        toast.success('Bienvenido')
        router.push('/ticketsDashboard')
      } else {
        toast.error('Usuario o contraseña incorrectos')
        setError('root.credentials', {
          type: 'manual',
          message: 'Credenciales Invalidas'
        }) // en dado caso de que sea general

        // setError("username", {type: "manual", message: "Usuario invalido"}) en caso de que eñ backend indique que el error es de un input
      }
    } catch (error) {
      toast.error('Error al iniciar sesion')
      console.error('[Login error]', error)
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
        <h1 className={`text-[24px] font-bold ${textColor}`}>
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
                  <span
                    className='absolute right-2 cursor-pointer text-sm text-black/50 hover:text-slate-800'
                    onClick={handleShowHidePassword}
                  >
                    {showPassword ? ' Ocultar' : 'Mostrar'}
                  </span>
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
          <Link href='#' className={textColor}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <button
          type='submit'
          className='p- my-4 h-10 w-full rounded-lg bg-[#EEE727] text-[#030000]'
        >
          Iniciar sesión
        </button>
        <div className='my-7 flex justify-between'>
          <p className={textColor}>¿No tienes cuenta?</p>
          <Link href='/registroUsuario' className='text-[#31416d]'>
            Registrate
          </Link>
        </div>
      </div>
    </form>
  )
}

export default function LoginPage() {
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
          <LoginForm textColor='text-white' bgColor='bg-[#21262D]' />
        </div>
      </div>
      <div className='hidden w-full lg:flex lg:w-[50%] lg:justify-center lg:bg-[#ECECEC]'>
        <LoginForm textColor='text-black' bgColor='bg-[#ECECEC]' />
      </div>
    </main>
  )
}
