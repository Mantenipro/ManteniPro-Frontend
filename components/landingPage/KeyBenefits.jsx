/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const KeyBenefits = forwardRef((props, ref) => {
  const benefits = [
    {
      title: 'Acceso a Datos en Tiempo Real',
      description:
        'Los usuarios pueden acceder a información actualizada sobre el estado de los equipos y el progreso de las tareas de mantenimiento, facilitando la toma de decisiones informadas.',
      icon: '/icon2/cube-icon.png'
    },
    {
      title: 'Optimización del Mantenimiento',
      description:
        'Nuestra solución ayuda a planificar y llevar a cabo mantenimientos de forma más eficiente, evitando interrupciones inesperadas y optimizando los recursos disponibles.',
      icon: '/icon2/gear-icon.png'
    },
    {
      title: 'Reducción de Costos',
      description:
        'Al mejorar la eficiencia operativa y prevenir fallos inesperados, nuestra solución ayuda a minimizar los costos asociados con reparaciones de emergencia y reemplazos prematuros.',
      icon: '/icon2/money-icon.png'
    }
  ]

  return (
    <section ref={ref}>
      <div className='container mx-auto text-center mt-10 md:mt-1'>
        <h2
          className={`mb-6 p-2 text-2xl font-medium md:text-4xl ${montserrat.className}`}
        >
          Simplifica las solicitudes de trabajo y resuélvelas más rápido
        </h2>
        <div className='flex flex-wrap justify-center gap-4 mx-5 md:mx-0'>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className='flex h-[450px] w-[361px] flex-col rounded-lg border-t-4 border-transparent bg-white p-6 text-left shadow-lg transition-all duration-300 ease-in-out hover:border-sky-800 lg:w-[405px]'
            >
              <div className='mb-4 flex items-start'>
                <img
                  className='w-22 h-22 mr-4'
                  src={benefit.icon}
                  alt='Icono de beneficio'
                />
              </div>
              <h3
                className={`mb-2 text-2xl font-semibold ${montserrat.className}`}
              >
                {benefit.title}
              </h3>
              <p className={`text-gray-600 ${sourceSans3.className}`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default KeyBenefits
