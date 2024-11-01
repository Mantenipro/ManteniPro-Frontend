import Image from 'next/image';
import Link from 'next/link';

export default function Nav({ priceSectionRef, keyBenefitsRef, aboutUsRef }) {
 
  const scrollToPriceSection = () => {
    priceSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  
  const scrollToKeyBenefits = () => {
    keyBenefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  
  const scrollToAboutUs = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className='flex justify-between  shadow-lg bg-white h-[80px] p-5'>
    
      <div className='justify-center items-center md:ml-[44px] h-[3rem] w-[10rem] hidden sm:flex'>
        <img src='/logoManteniPro.svg' alt='Logo ManteniPro' />
      </div>

      <div className='flex items-center space-x-4 md:mr-[44px]'>
        
        <button 
          onClick={scrollToKeyBenefits}
          className='md:text-base text-xs font-medium text-gray-700 hover:text-gray-900'
        >
          Beneficios
        </button>

        
        <button 
          onClick={scrollToPriceSection}
          className='md:text-base text-xs font-medium text-gray-700 hover:text-gray-900' 
        >
          Planes
        </button>

       
        <button 
          onClick={scrollToAboutUs}
          className='hidden md:inline-flex md:text-base text-xs font-medium text-gray-700 hover:text-gray-900'
        >
          Acerca de
        </button>

       
        <Link href='/inicioSesion'>
          <button className='rounded-xl text-gray-900 border-[1px] border-gray-700 p-[10px_20px] md:text-base text-xs font-medium whitespace-nowrap hover:bg-gradient-to-r hover:from-[#21262D] hover:to-[#414B66] hover:text-white'>
            Iniciar Sesion
          </button>
        </Link>

       
        <Link href='/registroUsuario'>
          <button className='rounded-xl text-gray-900 border-[1px] border-gray-700 p-[10px_20px] md:text-base text-xs font-medium hover:bg-gradient-to-r hover:from-[#21262D] hover:to-[#414B66] hover:text-white'>
            Registrarme
          </button>
        </Link>
      </div>
    </nav>
  );
}




