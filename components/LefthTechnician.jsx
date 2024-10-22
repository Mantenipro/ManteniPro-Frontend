/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuItem = ({ icon, title, onClick, children }) => (
  <div
    className='flex items-center justify-start mt-2 cursor-pointer p-2 w-full hover:bg-[#2D2F39] transition-all duration-300 ease-in-out rounded-md'
    onClick={onClick}
  >
    <img src={icon} alt={title} />
    <p className='font-medium text-sm ml-10'>{title}</p>
    {children}
  </div>
);

export default function LefthTechnician() {
  const router = useRouter();

  const handleSignOut = () => {
    window.localStorage.removeItem('token');
    router.push('/inicioSesion');
  };

  return (
    <main className='h-screen p-4 text-[#f2f6fc]'>
      <div className='flex flex-col items-center'>
        <div className='flex h-[5rem] w-[10rem]'>
          <img
            className='h-full w-full'
            src='/ManteniProDashboardWhite.svg'
            alt='Logo'
          />
        </div>

        <div className='my-1 flex h-[120px] w-[100px] flex-col items-center rounded-[40px] bg-gradient-to-b from-[#232c48] to-[#4361b2] p-4 shadow-sm'>
          <img className='h-10 w-10' src='/userphoto.svg' alt='User' />
          <p className='text-sm font-bold'>Name</p>
          <p className='text-center text-xs'>Technician</p> 
        </div>
      </div>

      <section className='mt-6 flex h-2/3 flex-col justify-between md:h-2/3 2xl:h-3/4'>
        <div className='Seccion1'>
          <p className='font-bold'>MAIN</p>
          <div className='flex flex-col'>
            <Link href='/homeTecnico'> 
              <MenuItem icon='/tickets-dash.svg' title='Tickets' />
            </Link>
          </div>
        </div>
        <div className='Seccion2'>
          <Link href='/perfilTecnico'> 
            <MenuItem icon='/person-filled-dash.svg' title='Profile' />
          </Link>
          <MenuItem
            icon='/signuot-dash.svg'
            title='Sign Out'
            onClick={handleSignOut}
          />
        </div>
      </section>
    </main>
  );
}
