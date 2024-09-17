import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function LoginPage() {
  return (
    <main className={`${montserrat.className}, flex flex-row h-dvh `}>
      <div className='bg-[#31416d]  lg:w-[50%]'>
        <p className=' hidden lg:flex'>ManteniPro</p>
      </div>
      <div className='bg-gradient-to-b from-[#21262D] to-[#31416d] lg:bg-[#ECECEC] w-full lg:w-[50%] flex  justify-center'>
        <div className="absolute mr-[18rem]">
            <img
                src='/logoManteniPro.png'
                alt='logo'
                className='w-[90px] h-[40px] lg:w-[200px] lg:h-[200px] my-10'
            />
        </div>
        <form className='flex justify-center flex-col w-[90%]' action=''>
          <div className='flex flex-col items-center'>
            <h1 className='text-[24px] font-bold text-white'>
              Ingresa a tu cuenta
            </h1>
          </div>
          <div className='flex flex-col w-full mt-8'>
            <label className='text-white text-lg' htmlFor=''>
              Ingresa tu correo electronico
            </label>
            <input
              type='text'
              placeholder='Correo electrónico'
              className='w-full h-9 border-2 border-[#31416d] rounded-lg p-4 my-4'
            />
            <label className='text-white text-lg' htmlFor=''>
              Ingresa tu contraseña
            </label>
            <input
              type='password'
              placeholder='Contraseña'
              className='w-full h-9 border-2 border-[#31416d] rounded-lg p-4 my-4'
            />
            <div>
              <a href='#' className='text-[#EEE727]'>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
              Iniciar sesión
            </button>

            <div className="flex gap-32 my-7">
              <p className='text-white'>
                ¿No tienes cuenta?{' '} 
              </p>
              <Link href='' className='text-[#EEE727]'>
                  Registrate
                </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
