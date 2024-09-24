import React from 'react'

export default function OrderTimeline({ id, time, fecha }) {
  return (
    <div>
      <hr className='my-2 mt-4 hidden h-1 w-full bg-gray-300 md:flex' />
      {/* MOBILE */}
      <div className='justify-between gap-4 md:hidden'>
        <div className='flex flex-col items-center justify-center md:ml-2'>
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
      </div>
      {/* TABLET/DESKTOP */}
      <div className='hidden justify-around gap-4 md:flex'>
        <div className='flex flex-col items-center justify-center md:ml-2'>
          <span>ID Orden de Trabajo</span>
          <span>#{id}</span>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span>Tiempo estimado</span>
          <span>{time}</span>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span>Fecha</span>
          <span>{fecha}</span>
        </div>
      </div>
      <hr className='my-2 mt-4 hidden h-1 w-full bg-gray-300 md:flex' />
    </div>
  )
}
