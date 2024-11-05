import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const infoButtons = [
  {
    title: 'INICIO',
    link: '#'
  },
  {
    title: 'PLANES',
    link: '#'
  },
  {
    title: 'BENEFICIOS',
    link: '#'
  },
  {
    title: 'ACERCA DE',
    link: '#'
  }
]
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
    <footer className='p-7 shadow-2xl shadow-black md:p-9'>
      <div className='flex justify-between lg:border-b-2'>
        <div className='ml-[-2.7rem] flex items-start justify-start'>
          <img src='/logo.png' alt='Logo' className='h-[8rem]' />
        </div>
        <div className='flex flex-col items-end justify-end gap-4 lg:flex-row lg:items-center'>
          {infoButtons.map((button, index) => (
            <Link
              key={index}
              href={button.link}
              className={`text-lg hover:underline ${sourceSans3.className}`}
            >
              {button.title}
            </Link>
          ))}
        </div>
      </div>

      <div className='my-6 flex justify-between'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          <div className='mt-4 flex gap-4'>
            {socialMedia.map((social, index) => (
              <Link key={index} href={social.link}>
                <div className='bg-red h-8 w-8 transition-all duration-1000 hover:h-9 hover:w-9'>
                  <img
                    className='h-full w-full'
                    src={social.icon}
                    alt='Social Media'
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          className={`mt-4 text-center ${montserrat.className} text-lg font-normal leading-8 tracking-wider`}
        >
          Copyright ©2024
        </div>
      </div>
    </footer>
  )
}
