import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const socialMedia = [
  {
    icon: '/Facebook.svg',
    link: '#'
  },
  {
    icon: '/Instagram.svg',
    link: '#'
  },
  {
    icon: '/Twitter.svg',
    link: '#'
  }
]

export default function Footer() {
  return (
    <footer className='p-7 md:p-9 shadow-2xl shadow-black'>
      <div className='flex justify-between lg:border-b-2'>
        <div className='flex justify-start items-start ml-[-2.7rem] '>
          <img src='/logoManteniPro.svg' alt='Logo' className='h-[8rem]' />
        </div>
      </div>

      <div className='flex justify-between my-6'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex gap-4 mt-4'>
            {socialMedia.map((social, index) => (
              <Link key={index} href={social.link}>
                <div className='bg-red h-8 w-8 hover:h-9 hover:w-9 transition-all duration-1000'>
                  <img className="w-full h-full" src={social.icon} alt='Social Media' />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`text-center mt-4 ${montserrat.className} leading-8 tracking-wider font-normal text-lg`}
        >
          Copyright ©2024
        </div>
      </div>
    </footer>
  )
}

