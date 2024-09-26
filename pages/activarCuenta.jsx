/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import InputsLogin from '@/components/Inputs.login'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const inputData = [
  {
    placeholder: ''
  },
  {
    placeholder: ''
  },
  {
    placeholder: ''
  },
  {
    placeholder: ''
  },
  {
    placeholder: ''
  },
  {
    placeholder: ''
  },
]

export default function ActivateAccountPage() {
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
            <div className='flex flex-col items-center gap-4'>
              <h1 className='text-[24px] font-bold text-white'>
                Activa tu cuenta
              </h1>
              <h3 className='text-white'>
                Agrega los 6 digitos que se enviaron a tu correo
              </h3>
            </div>
            <div className='flex flex-col w-full mt-8'>
              <div className='flex flex-row gap-5'>
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
                  Volver a mandar
                </a>
              </div>
              <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
                Activar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='lg:bg-[#ECECEC] w-full lg:w-[50%]   lg:justify-center hidden lg:flex'>
        <form className='flex justify-center flex-col w-[60%]' action=''>
          <div className='flex flex-col items-center'>
            <h1 className='text-[24px] font-bold text-black'>
              Activa tu cuenta
            </h1>
          </div>
          <div className='flex flex-col w-full mt-8'>
            <div className='flex flex-row gap-5'>
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
                Volver a mandar
              </Link>
            </div>
            <button className='w-full h-10 bg-[#EEE727] text-[#030000] rounded-lg p- my-4'>
              Activar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
