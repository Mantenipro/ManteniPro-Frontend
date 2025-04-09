import React, { useRef } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Nav from '@/components/landingPage/Nav'
import Hero from '@/components/landingPage/Hero'
import KeyBenefits from '@/components/landingPage/KeyBenefits'
import HowWork from '@/components/landingPage/HowWork'
import PriceSection from '@/components/landingPage/PriceSection'
import Footer from '@/components/landingPage/Footer'
import AboutUs from '@/components/landingPage/AboutUs'
import UserHistories from '@/components/landingPage/UserHistories'
import SEO from '@/components/SEO' // ✅ Importación del componente SEO

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function Home() {
  const priceSectionRef = useRef(null)
  const keyBenefitsRef = useRef(null)
  const aboutUsRef = useRef(null)

  return (
    <>
      <SEO
        title='Mantenipro - Software de Gestión de Mantenimiento'
        description='Gestiona el mantenimiento de equipos como aire acondicionado, computadoras, impresoras, bombas de agua, grúas y más con Mantenipro.'
        image='https://www.mantenipro.net/images/og-image.jpg'
        url='https://www.mantenipro.net'
      />

      <main
        className={`${montserrat.className} h-screen snap-y snap-mandatory overflow-y-scroll`}
      >
        <div className='sticky top-0 z-50 bg-white shadow-md'>
          <Nav />
        </div>
        <div className='md:h-screen'>
          <Hero />
        </div>
        <div className='md:h-screen' ref={keyBenefitsRef}>
          <KeyBenefits />
        </div>
        <div className='md:h-screen'>
          <HowWork />
        </div>
        <div className='md:flex md:h-screen md:justify-center' ref={aboutUsRef}>
          <AboutUs />
        </div>
        <div className='md:h-screen'>
          <UserHistories />
        </div>
        <div className='md:h-auto'>
          <Footer />
        </div>
      </main>
    </>
  )
}
