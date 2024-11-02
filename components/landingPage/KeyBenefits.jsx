import React, { forwardRef } from 'react';
import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const KeyBenefits = forwardRef((props, ref) => {
  const benefits = [
    {
      title: 'Acceso a Datos en Tiempo Real',
      description:
        'Los usuarios pueden acceder a información actualizada sobre el estado de los equipos y el progreso de las tareas de mantenimiento, facilitando la toma de decisiones informadas.',
      icon: '/icon2/cube-icon.png',
    },
    {
      title: 'Optimización del Mantenimiento',
      description:
        'Nuestra solución ayuda a planificar y llevar a cabo mantenimientos de forma más eficiente, evitando interrupciones inesperadas y optimizando los recursos disponibles.',
      icon: '/icon2/gear-icon.png',
    },
    {
      title: 'Reducción de Costos',
      description:
        'Al mejorar la eficiencia operativa y prevenir fallos inesperados, nuestra solución ayuda a minimizar los costos asociados con reparaciones de emergencia y reemplazos prematuros.',
      icon: '/icon2/money-icon.png',
    },
  ];

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto text-center">
        <h2 className={`text-2xl md:text-4xl font-medium mb-6 p-2 ${montserrat.className}`}>
          Simplifica las solicitudes de trabajo y resuélvelas más rápido
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-[361px] lg:w-[405px] h-[350px] text-left border-t-4 border-transparent hover:border-sky-800 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-start mb-4">
                <img
                  className="w-22 h-22 mr-4"
                  src={benefit.icon}
                  alt="Icono de beneficio"
                />
              </div>
              <h3 className={`text-2xl font-semibold mb-2 ${montserrat.className}`}>
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
  );
});

export default KeyBenefits;





