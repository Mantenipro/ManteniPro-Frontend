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
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className={`mb-14 text-2xl font-medium md:text-4xl ${montserrat.className}`}>¿Cómo Funciona?</h2>
        <div className="grid grid-cols-1 gap-6 mx-5 md:mx-0 md:grid-cols-3 lg:grid-cols-3">
          {works.map((work, index) => (
            <figure key={index} className={`relative ${work.color} ${work.text} rounded-[30px] p-6 text-left shadow-lg`}>          
            <img
                src="/line.howtowork.svg"
                alt=""
                className="absolute top-0 right-0 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-10 md:hidden lg:block"
              />
              <div className="flex items-start mb-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-white shadow-md">
                  <div className="absolute inset-0 h-full w-full bg-[#F2F6FC] opacity-30 blur-[40px]" />
                  <div className={`flex items-center justify-center text-6xl text-black ${montserrat.className}`}>{work.number}</div>
                </div>
              </div>
              <figcaption>
                <h3 className={`text-2xl font-semibold ${montserrat.className}`}>{work.title}</h3>
                <p className={`text-gray-600 ${sourceSans3.className} ${work.text} mt-9`}>{work.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
