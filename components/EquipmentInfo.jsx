/* eslint-disable @next/next/no-img-element */
import React from 'react'
import DataMachine from './DataMachine'

export default function EquipmentInfo({
  foto,
  titulo,
  marca,
  modelo,
  ult_mnto,
  año,
  tit_Order
}) {
  return (
    <section className='flex flex-col gap-3 p-1 text-[12px] md:text-sm'>
      <span className='font-semibold md:hidden md:text-lg'>{tit_Order}</span>
      <img
        src={foto}
        alt='task-photo'
        className='h-32 w-auto rounded-md object-cover md:hidden'
      />
      {/* DATA MACHINE */}
      <div className='flex flex-col gap-4 rounded-lg bg-blue-950 p-2 text-slate-200'>
        <span className='m-auto text-base font-bold text-yellow-300 md:text-lg'>
          Datos del equipo
        </span>
        <DataMachine titulo='Nombre' dato={titulo} />
        <DataMachine titulo='Marca' dato={marca} />
        <DataMachine titulo='Modelo' dato={modelo} />
        <DataMachine
          titulo='Ultimo Mantenimiento'
          dato={ult_mnto}
          estilo={'md:py-2 md:ml-9 ml-4 py-2'}
        />
        <DataMachine titulo='Año' dato={año} />
      </div>
      {/* END DATA MACHINE */}
    </section>
  )
}
