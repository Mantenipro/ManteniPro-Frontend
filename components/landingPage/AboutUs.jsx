import { Source_Sans_3 } from 'next/font/google'
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function AboutUs() {
  return (
    <div className='mx-5 md:flex md:justify-center'>
      <section className='mx-auto mb-20 flex w-full flex-col items-center justify-center gap-10 bg-[#e6eef8] p-4 md:px-10 lg:mt-36 lg:flex-row'>
        <h2 className='mb-5 text-center text-2xl font-medium text-slate-800 lg:hidden'>
          Acerca de Mantenipro
        </h2>
        <div className='min-w-56 lg:-mt-28'>
          <img
            src='/img-aboutUs.png'
            alt='about us'
            className='h-full w-full'
          />
        </div>
        <div className='max-w-screen-md'>
          <h2 className='mb-8 hidden text-center text-4xl font-medium text-slate-800 lg:block'>
            Acerca de Mantenipro
          </h2>
          <p
            className={`text-center text-lg text-slate-700 md:mx-10 md:text-xl ${sourceSans3.className}`}
          >
            En Mantenipro, simplificamos el mantenimiento de equipos con
            tecnología eficiente, reduciendo costos y optimizando procesos. Nos
            enfocamos en soluciones fáciles de usar que eliminan la necesidad de
            largas llamadas para obtener datos, permitiéndote concentrarte en el
            crecimiento de tu negocio. Nuestro software está diseñado para
            atender una amplia gama de sectores, cubriendo equipos de
            climatización, energía, tecnología, construcción, elevación,
            seguridad e industriales. Lo que nos diferencia es que no solo
            ofrecemos soluciones fáciles, sino que también te proporcionamos un
            historial detallado para tomar decisiones informadas. En un mercado
            donde pocos softwares están tan dedicados como el nuestro,
            Mantenipro se posiciona como la solución ideal para la gestión de
            mantenimiento en sectores industriales y comerciales. <br />
            Ingresa a la{' '}
            <a
              href='https://drive.google.com/file/d/1KiukB2Eacy1CVe79EIvpoLmGSpDFCuAe/view?usp=sharing'
              target='_blank'
              className='text-blue-500'
            >
              lista completa de los equipos
            </a>{' '}
            para conocer todos los equipos que puedes registrar.
          </p>
        </div>
      </section>
    </div>
  )
}
