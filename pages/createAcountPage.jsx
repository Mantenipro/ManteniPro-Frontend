/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import InputsLogin from '@/components/Inputs.login'
const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })
import { useForm } from 'react-hook-form'

const inputData = [
  {
    icon: '/iconemail.svg',
    placeholder: 'Correo electrónico'
  },
  { icon: '/iconuser.svg', placeholder: 'Nombre completo' },
  { icon: '/iconorganization.svg', placeholder: 'Nombre de compañia' },
  { icon: '/iconlocation.svg', placeholder: 'ZIP code' },
  {
    icon: '/iconpassword.svg',
    placeholder: 'Contraseña'
  },
  { icon: '/iconpassword.svg', placeholder: 'Confirmar contraseña' }
]

export default function LoginPage() {
  // Paso 3: Inicializar useForm
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // Paso 4: Función para manejar el envío del formulario
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <main
      className={`min-h-screen flex flex-col lg:flex-row ${montserrat.className}`}
    >
      <div className='bg-gradient-to-b from-[#21262D] to-[#31416d] lg:flex w-full lg:w-1/2 flex-col'>
        <img
          src='/Logo.png'
          alt='logo'
          className='w-44 h-25 lg:w-36 lg:h-20 my-5 ml-5'
        />
        <div className='  w-full lg:w-[50%] flex lg:hidden justify-center'>
          <form
            className='flex justify-center md:w-[60%] flex-col w-[90%]'
            action=''
          >
            <div className='flex flex-col mb-5'>
              <h1 className='text-[24px] font-bold text-white'>
                Crea tu cuenta
              </h1>
              <h3 className='text-white'>Registrate para comenzar.</h3>
            </div>
            <div className='flex flex-col w-full mt-8'>
              <div className='flex flex-col gap-5'>
                {inputData.map((item, index) => (
                  <InputsLogin
                    key={index}
                    icon={item.icon}
                    placeholder={item.placeholder}
                  />
                ))}
              </div>

              <div className='flex gap-3 my-5'>
                <input className='mb-6' type='checkbox' name='' id='' />
                <p className='text-white'>
                  By registering, you are agreeing with our
                  <Link href=''>Terms of Use</Link> and{' '}
                  <Link href=''>Privacy Policy</Link>
                </p>
              </div>
              <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
                Registrarse
              </button>

              <div className='flex justify-between my-7'>
                <p className='text-white'>¿Ya tienes cuenta? </p>
                <Link href='/loginPage' className='text-[#EEE727]'>
                  Inicia sesión
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='lg:bg-[#ECECEC]   w-full lg:w-[50%] hidden lg:flex  justify-center'>
        <form className='flex justify-center flex-col w-[60%]' action=''>
          <div className='flex flex-col mb-5'>
            <h1 className='text-[24px] font-bold text-black'>Crea tu cuenta</h1>
            <h3 className='text-black'>Registrate para comenzar.</h3>
          </div>
          <div className='flex flex-col w-full mt-8'>
            <div className='flex flex-col gap-5'>
              {inputData.map((item, index) => (
                <InputsLogin
                  key={index}
                  icon={item.icon}
                  placeholder={item.placeholder}
                />
              ))}
            </div>

            <div className='flex gap-3 my-5'>
              <input className='mb-6' type='checkbox' name='' id='' />
              <p className='text-black'>
                By registering, you are agreeing with our
                <Link href=''>Terms of Use</Link> and{' '}
                <Link href=''>Privacy Policy</Link>
              </p>
            </div>
            <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
              Registrarse
            </button>

            <div className='flex justify-between my-7'>
              <p className='text-black'>¿Ya tienes cuenta? </p>
              <Link href='/loginPage' className='text-[#31426D]'>
                Inicia sesión
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
