import React, { useRef } from 'react'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import Nav from '@/components/landingPage/Nav'
import Hero from '@/components/landingPage/Hero'
import KeyBenefits from '@/components/landingPage/KeyBenefits'
import HowWork from '@/components/landingPage/HowWork'
import PriceSection from '@/components/landingPage/PriceSection'
import Footer from '@/components/landingPage/Footer'
import AboutUs from '@/components/landingPage/AboutUs'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function Home() {
  // Crear referencias para las secciones
  const priceSectionRef = useRef(null)
  const keyBenefitsRef = useRef(null)
  const aboutUsRef = useRef(null) // Nueva referencia para AboutUs

  return (
    <main className={`${montserrat.className} h-screen snap-y snap-mandatory overflow-y-scroll`}>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Nav />
      </div>
      <Hero />
      <section ref={keyBenefitsRef}>
        <hr className="my-10 border-t border-gray-300" />
        <KeyBenefits />
      </section>
      <HowWork />
      <section ref={aboutUsRef}>
        <AboutUs />
      </section>
      <section id="price-section" ref={priceSectionRef}>
        <PriceSection />
      </section>
      <Footer />
    </main>
  );
}
