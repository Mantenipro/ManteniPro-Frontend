/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function HowWork() {
  const works = [
    {
      title: 'Escanea el QR',
      description:
        'Cada equipo tiene un código QR único. Los clientes solo necesitan escanear el código para acceder instantáneamente a todos los detalles del equipo.',
      number: '1',
      color: 'bg-[#31416D]',
      text: 'text-white'
    },
    {
      title: 'Información Instantánea',
      description:
        'Al escanear el código QR, la información completa del equipo se envía automáticamente a tu sistema, permitiéndote visualizar todos los datos relevantes sin demora',
      number: '2',
      color: 'bg-[#618CD0]',
      text: 'text-white'
    },
    {
      title: 'Soporte Rápido',
      description:
        'Reduce significativamente el tiempo dedicado a llamadas o chats de soporte. Con la información al alcance, tus clientes disfrutan de un servicio más rápido y efectivo, aumentando su satisfacción',
      number: '3',
      color: 'bg-[#E2EBF7]',
      text: 'text-black'
    }
  ]

  return (
    <section className='py-16 md:flex md:h-screen md:items-center md:justify-center'>
      <div className='container mx-auto text-center'>
        <h2
          className={`mb-14 text-2xl font-medium md:text-4xl ${montserrat.className}`}
        >
          ¿Como Funciona?
        </h2>
        <div className='flex flex-wrap justify-center gap-6 mx-5 md:mx-0 md:space-x-10'>
          {works.map((work, index) => (
            <div
              key={index}
              className={`${work.color} ${work.text} md:flex md:h-[433px] md:w-[373px] flex-col rounded-[30px] p-6 text-left shadow-lg`}
            >
              <img
                className='hidden lg:absolute lg:right-0 lg:top-0 lg:h-1/2 lg:w-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:opacity-10'
                src='/line.howtowork.svg'
                alt=''
              />
              <div className='relative mb-4 flex items-start'>
                <div className='relative mb-4 flex items-start'>
                  <div className='relative flex h-20 w-20 items-center justify-center rounded-[20px] bg-white shadow-md'>
                    <div className='absolute inset-0 h-full w-full bg-[#F2F6FC] opacity-30 blur-[40px]' />
                    <div
                      className={`flex items-center justify-center text-6xl text-black ${montserrat.className}`}
                    >
                      {work.number}
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5'>
                <h3
                  className={`text-2xl font-semibold ${montserrat.className} `}
                >
                  {work.title}
                </h3>
                <p
                  className={`text-gray-600 ${sourceSans3.className} ${work.text} mt-9`}
                >
                  {work.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
