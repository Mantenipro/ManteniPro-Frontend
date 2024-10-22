/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Today } from '@mui/icons-material';

export default function TaskCard({ picture, title, status, date, idOrder, onClick, className }) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center rounded-xl border-2 bg-[#FAFAFA] p-2 text-sm transition duration-300 ease-in-out hover:bg-gradient-to-r 
       hover:from-[#21262D] hover:to-[#414B66] hover:text-white md:text-xl cursor-pointer ${className}`} // Se agregó className
    >
      <img
        src={picture}
        alt='task-photo'
        className='w-11 rounded-full border'
      />
      <div className='flex flex-col gap-3 pl-3'>
        <div>
          <p className='font-medium'>{title}</p>
          <p className='mt-1'>{idOrder}</p>
        </div>
        <div className='flex items-start gap-1'>
          <Today fontSize='small' />
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}



