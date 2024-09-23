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
    <section>
      {/* DATA USER */}
      <div className='flex flex-col items-center justify-center'>
        <span>ID Orden de Trabajo</span>
        <span>#{id}</span>
      </div>
      <div className='mt-2 flex items-center justify-evenly'>
        <div className='flex flex-col items-center justify-center'>
          <span>Tiempo estimado</span>
          <span>{time}</span>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span>Fecha</span>
          <span>{fecha}</span>
        </div>
      </div>
      <hr className='my-2 mt-4 h-1 w-full bg-gray-300' />
      <span>Reportado por:</span>
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

      <div className='mt-5 flex items-center pl-1'>
        <span className='m-3'>Direccion:</span>
        <span>{direccion}</span>
      </div>

      <div className='my-5 flex items-center'>
        <span className='m-3'>Compañia:</span>
        <span>{compania}</span>
      </div>

      <div className='flex flex-col gap-2'>
        <span className=''>Descripción</span>
        <span className='rounded bg-slate-300 p-1 py-3'>{desc_falla}</span>
      </div>
      {/* END DATA USER */}
    </section>
  )
}
