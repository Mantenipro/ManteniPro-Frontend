import Image from 'next/image';
import Link from 'next/link';

export default function Nav() {

  return (
    <nav className='flex md:justify-between shadow-lg bg-white h-[80px] p-2'>
    
      <div className='flex justify-center items-center md:w-[17rem] mr-4'>
        <img src='/logoManteniPro.svg' alt='Logo ManteniPro'/>
      </div>

      <div className='flex items-center space-x-2 md:space-x-4'>
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




