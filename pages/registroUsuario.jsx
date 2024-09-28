/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  { icon: '/iconemail.svg', placeholder: 'Correo electrónico', name: 'email' },
  { icon: '/iconuser.svg', placeholder: 'Nombre completo', name: 'fullName' },
  { icon: '/iconorganization.svg', placeholder: 'Nombre de compañia', name: 'companyName' },
  { icon: '/iconlocation.svg', placeholder: 'ZIP code', name: 'zipCode' },
  { icon: '/iconpassword.svg', placeholder: 'Contraseña', name: 'password' },
  { icon: '/iconpassword.svg', placeholder: 'Confirmar contraseña', name: 'confirmPassword' }
]

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
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    // Aquí iría la lógica para registrar al usuario
    try {
      // Simulación de registro exitoso
      toast.success('Registro exitoso')
      router.push('/inicioSesion')
    } catch (error) {
      toast.error('Error al registrar')
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
                    (item.name === 'password' ||
                      item.name === 'confirmPassword') &&
                    showPassword[item.name]
                      ? 'text'
                      : item.name.includes('password')
                        ? 'password'
                        : 'text'
                  }
                  placeholder={item.placeholder}
                  {...register(item.name, { required: true })}
                  className='w-full p-2 pl-10 pr-20'
                />
                {(item.name === 'password' ||
                  item.name === 'confirmPassword') && (
                  <span
                    className='absolute right-2 cursor-pointer text-sm text-black/50 hover:text-slate-800'
                    onClick={() => handleShowHidePassword(item.name)}
                  >
                    {showPassword[item.name] ? ' Ocultar' : 'Mostrar'}
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
        <div className='my-5 flex gap-3'>
          <input className='mb-6' type='checkbox' name='' id='' />
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
          <Link href='/inicioSesion' className='text-[#030000]'>
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
