import React, { useRef } from 'react';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import Nav from '@/components/landingPage/Nav';
import Hero from '@/components/landingPage/Hero';
import KeyBenefits from '@/components/landingPage/KeyBenefits';
import HowWork from '@/components/landingPage/HowWork';
import PriceSection from '@/components/landingPage/PriceSection';
import Footer from '@/components/landingPage/Footer';
import AboutUs from '@/components/landingPage/AboutUs';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function Home() {
  // Crear referencias para las secciones
  const priceSectionRef = useRef(null);
  const keyBenefitsRef = useRef(null);
  const aboutUsRef = useRef(null); // Nueva referencia para AboutUs

  return (
    <main className={`${montserrat.className}`}>
      <Nav 
        priceSectionRef={priceSectionRef} 
        keyBenefitsRef={keyBenefitsRef} 
        aboutUsRef={aboutUsRef} // Pasar la referencia a Nav
      />
      <div className='h-dvh'>
        <Hero />
        <KeyBenefits ref={keyBenefitsRef} />
        <HowWork />
        <AboutUs ref={aboutUsRef} /> {/* Pasar la referencia */}
        <PriceSection id="price-section" ref={priceSectionRef} />
        <Footer />
      </div>
    </main>
  );
}

