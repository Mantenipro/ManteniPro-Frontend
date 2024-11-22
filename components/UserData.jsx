/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function UserData({
  id,
  time,
  fecha,
  user,
  user_photo,
  email_user,
  direccion,
  compania,
  desc_falla
}) {
  return (
    <section className='md:text-[15]'>
      {/* DATA USER */}

      <hr className='my-2 mt-4 h-1 w-full bg-gray-300 md:hidden' />
      <span className='font-medium'>Reportado por:</span>
      <div className='mt-3 flex items-center'>
        <img
          src={user_photo}
          alt='user-photo'
          className='m-3 h-12 rounded-full'
        />
        <div className='flex flex-col'>
          <span>{user}</span>
          <span>{email_user}</span>
        </div>
      </div>

      <div className='mt-5 flex items-center pl-1 md:mt-1'>
        <span className='m-3'>Direccion:</span>
        <span>{direccion}</span>
      </div>

      <div className='my-5 flex items-center md:mt-1'>
        <span className='m-3'>Compañia:</span>
        <span>{compania}</span>
      </div>

      {/* END DATA USER */}
    </section>
  )
}
