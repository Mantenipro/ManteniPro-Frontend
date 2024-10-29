/* eslint-disable @next/next/no-img-element */
import { Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'
import ActivateAccountForm from '../components/ActivateAccountForm'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function ActivateAccountPage() {
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
          <ActivateAccountForm textColor='text-white' bgColor='bg-[#21262D]' />
        </div>
      </div>
      <div className='hidden w-full lg:flex lg:w-[50%] lg:justify-center lg:bg-[#ECECEC]'>
        <ActivateAccountForm textColor='text-black' bgColor='bg-[#ECECEC]' />
      </div>
    </main>
  )
}
