import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { registerForm } from './api/api'
import SEORegister from '@/components/SEORegister'
const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  { icon: '/iconemail.svg', placeholder: 'Correo electrónico', name: 'email' },
  { icon: '/iconuser.svg', placeholder: 'Nombre completo', name: 'fullname' },
  {
    icon: '/iconorganization.svg',
    placeholder: 'Nombre de compañia',
    name: 'companyName'
  },
  { icon: '/iconlocation.svg', placeholder: 'CP', name: 'zipCode' },
  { icon: '/iconpassword.svg', placeholder: 'Contraseña', name: 'password' },
  {
    icon: '/iconpassword.svg',
    placeholder: 'Confirmar contraseña',
    name: 'confirmPassword'
  }
]
const validatePassword = (value) => {
  // Regla: mínimo 8 caracteres, al menos una letra mayúscula, un número y un carácter especial
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
  return (
    passwordRegex.test(value) ||
    'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.'
  )
}

// Función que verifica si la contraseña es fuerte
const isPasswordStrong = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
  return passwordRegex.test(password)
}

const RegisterForm = ({ textColor, bgColor }) => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  const onSubmit = async (data) => {
    try {
      const register = await registerForm(
        data.email,
        data.password,
        data.fullname,
        data.companyName,
        data.zipCode
      )

      toast.success(
        'Registro exitoso, favor de revisar tu correo electronico para activar tu cuenta',
        {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto'
          }
        }
      )
      setTimeout(() => {
        router.push('/inicioSesion')
      }, 4000)
    } catch (error) {
      toast.error('Error al registrar', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        },
        duration: 5000
      })
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
        <h1 className='animate-fade-in bg-gradient-to-r from-[#ffffff] to-[#f0f1f3] bg-clip-text text-[32px] font-extrabold tracking-wide text-transparent md:from-[#21262D] md:to-[#414B66]'>
          Crea tu cuenta
        </h1>
        <h3 className={textColor}>Regístrate para comenzar.</h3>
      </div>
      <div className='mt-8 flex w-full flex-col'>
        <div className='flex flex-col gap-5'>
          {inputData.map((item, index) => (
            <div key={index} className='relative flex flex-col'>
              <div className='relative flex items-center'>
                <img src={item.icon} alt='' className='absolute left-3' />
                <input
                  type={
                    item.name === 'password' || item.name === 'confirmPassword'
                      ? showPassword[item.name]
                        ? 'text'
                        : 'password'
                      : 'text'
                  }
                  placeholder={item.placeholder}
                  {...register(item.name, {
                    required: true,
                    validate:
                      item.name === 'password' ? validatePassword : undefined
                  })}
                  className='w-full p-2 pl-10 pr-20'
                />
                {(item.name === 'password' ||
                  item.name === 'confirmPassword') && (
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={() => handleShowHidePassword(item.name)}
                  >
                    {/* Aquí puedes agregar un ícono de mostrar/ocultar */}
                  </button>
                )}
              </div>
              {errors[item.name] && (
                <span className='mt-1 text-red-500'>
                  {errors[item.name].message || 'Este campo es requerido'}
                </span>
              )}
              {item.name === 'confirmPassword' &&
                password !== confirmPassword && (
                  <span className='mt-1 text-red-500'>
                    Las contraseñas no coinciden
                  </span>
                )}
              {item.name === 'confirmPassword' &&
                password === confirmPassword &&
                password && (
                  <span className='mt-1 text-green-500'>
                    Las contraseñas coinciden
                  </span>
                )}
              {item.name === 'password' &&
                password &&
                !isPasswordStrong(password) && (
                  <span className='mt-1 text-red-500'>
                    La contraseña debe tener al menos 8 caracteres, una letra
                    mayúscula, un número y un carácter especial.
                  </span>
                )}
            </div>
          ))}
        </div>

        <button
          type='submit'
          className='p- my-4 h-10 w-full rounded-lg bg-[#f4ed2d] font-semibold text-sky-950 hover:bg-[#D6CF15]'
        >
          Registrarse
        </button>
        <div className='my-7 flex justify-between'>
          <p className={textColor}>¿Ya tienes cuenta?</p>
          <Link
            href='/inicioSesion'
            className='font-medium text-white md:text-gray-600 md:hover:font-semibold md:hover:text-gray-700'
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </form>
  )
}

export default function RegisterPage() {
  return (
    <>
      <SEORegister />
      <main className={`${montserrat.className} flex min-h-dvh flex-row`}>
        <Toaster />
        <div className='w-full bg-gradient-to-b from-[#21262D] to-[#31416d] lg:w-[50%]'>
          <img
            src='/ManteniProLogoWhite.svg'
            alt='logo'
            className='my-4 h-[10px] w-[200px] lg:my-[-20px] lg:ml-[-100px] lg:h-[150px] lg:w-[440px]'
          />
          <div className='flex justify-center lg:hidden'>
            <RegisterForm textColor='text-white' bgColor='bg-[#21262D]' />
          </div>
        </div>
        <div className='hidden w-full lg:flex lg:w-[50%] lg:justify-center lg:bg-[#ECECEC]'>
          <RegisterForm textColor='text-black' bgColor='bg-[#ECECEC]' />
        </div>
      </main>
    </>
  )
}
