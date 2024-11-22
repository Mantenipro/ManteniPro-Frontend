/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { registerForm } from './api/api'
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  { icon: '/iconemail.svg', placeholder: 'Correo electrónico', name: 'email' },
  { icon: '/iconuser.svg', placeholder: 'Nombre completo', name: 'fullname' },
  { icon: '/iconorganization.svg', placeholder: 'Nombre de compañia', name: 'companyName' },
  { icon: '/iconlocation.svg', placeholder: 'ZIP code', name: 'zipCode' },
  { icon: '/iconpassword.svg', placeholder: 'Contraseña', name: 'password' },
  { icon: '/iconpassword.svg', placeholder: 'Confirmar contraseña', name: 'confirmPassword' }
]

const RegisterForm = ({ textColor, bgColor }) => {
  const router = useRouter()

const [showPassword, setShowPassword] = useState({
  password: false,
  confirmPassword: false,
})
const [termsAccepted, setTermsAccepted] = useState(false)

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
    if (!termsAccepted) {
      toast.error('Debes aceptar los términos y condiciones para continuar', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw', // Ajuste para pantallas pequeñas
          width: 'auto'
        }
      })
      return
    }
    try {
      const register = await registerForm(data.email, data.password, data.fullname, data.companyName, data.zipCode)

      console.log(register)

      toast.success('Registro exitoso, favor de revisar tu correo electronico para activar tu cuenta', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw', // Ajuste para pantallas pequeñas
          width: 'auto'
        }
      })
      setTimeout(() => {
        router.push('/inicioSesion') // Redirige al login después de enviar el correo
      }, 4000) // Espera 2 segundos antes de redirigir
    } catch (error) {
      toast.error('Error al registrar', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw', // Ajuste para pantallas pequeñas
          width: 'auto'
        }, duration: 5000
      })
      console.error('[Register error]', error)
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
        <h1 className={`text-[24px] font-bold ${textColor}`}>Crea tu cuenta</h1>
        <h3 className={textColor}>Registrate para comenzar.</h3>
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
                  {...register(item.name, { required: true })}
                  className='w-full p-2 pl-10 pr-20'
                />
                {(item.name === 'password' ||
                  item.name === 'confirmPassword') && (
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={() => handleShowHidePassword(item.name)}
                  >
                    {showPassword[item.name] ? (
                      <FaEye className='h-5 w-5 text-gray-400' />
                    ) : (
                      <FaEyeSlash className='h-5 w-5 text-gray-400' />
                    )}
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
            </div>
          ))}
        </div>
        <div className='my-5 flex gap-3'>
          <input
            className='mb-6'
            type='checkbox'
            name='terms'
            id='terms'
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <p className={textColor}>
            By registering, you are agreeing with our
            <Link href=''>Terms of Use</Link> and{' '}
            <Link href=''>Privacy Policy</Link>
          </p>
        </div>
        <button
          type='submit'
          className='p- my-4 h-10 w-full rounded-lg bg-[#EEE727] text-[#030000]'
        >
          Registrarse
        </button>
        <div className='my-7 flex justify-between'>
          <p className={textColor}>¿Ya tienes cuenta?</p>
          <Link href='/inicioSesion' className='text-white md:text-[#030000]'>
            Inicia sesión
          </Link>
        </div>
      </div>
    </form>
  )
}

export default function RegisterPage() {
  return (
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
  )
}
