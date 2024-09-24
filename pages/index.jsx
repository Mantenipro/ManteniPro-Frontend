import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import InputsLogin from '@/components/Inputs.login'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  {
    icon: '/iconemail.svg',
    placeholder: 'Correo electrónico'
  },
  {
    icon: '/iconpassword.svg',
    placeholder: 'Contraseña'
  }
]

export default function LoginPage() {
  return (
    <main className={`${montserrat.className}, flex flex-row min-h-dvh `}>
      <div className='bg-gradient-to-b from-[#21262D] to-[#31416d] w-full lg:w-[50%]'>
        <img
          src='/ManteniProLogoWhite.svg'
          alt='logo'
          className='w-[200px] h-[140px] lg:w-[440px] lg:h-[150px] my-4 lg:my-[-20px] lg:ml-[-100px]'
        />
        <div className='lg:bg-[#ECECEC]   w-full lg:w-[50%] flex lg:hidden  justify-center'>
          <form
            className='flex justify-center md:w-[60%] flex-col w-[90%]'
            action=''
          >
            <div className='flex flex-col items-center'>
              <h1 className='text-[24px] font-bold text-white'>
                Ingresa a tu cuenta
              </h1>
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
              <div className='my-5'>
                <a href='#' className='text-[#EEE727]'>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
                Iniciar sesión
              </button>

              <div className='flex justify-between my-7'>
                <p className='text-white'>¿No tienes cuenta? </p>
                <Link href='createAcountPage' className='text-[#EEE727]'>
                  Registrate
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='lg:bg-[#ECECEC] w-full lg:w-[50%]   lg:justify-center hidden lg:flex'>
        <form className='flex justify-center flex-col w-[60%]' action=''>
          <div className='flex flex-col items-center'>
            <h1 className='text-[24px] font-bold text-black'>
              Ingresa a tu cuenta
            </h1>
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
            <div className='my-5'>
              <Link href='#' className='text-black'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Link href='/ticketsDashboard'>
              <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
                Iniciar sesión
              </button>
            </Link>

            <div className='flex gap-32 my-7'>
              <p className='text-black'>¿No tienes cuenta? </p>
              <Link href='/registroUsuario' className='text-[#31416d]'>
                Registrate
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}