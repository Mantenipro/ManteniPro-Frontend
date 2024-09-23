import React from 'react'
import DataMachine from './DataMachine'

export default function IdOrderDetail({
  foto,
  titulo,
  marca,
  modelo,
  ult_mnto,
  año,
  tit_Order
}) {
  return (
    <section className='flex flex-col gap-3 p-1'>
      <span className='font-semibold'>{tit_Order}</span>
      <img src={foto} alt='task-photo' className='h-32 w-auto rounded-md' />
      {/* DATA MACHINE */}
      <div className='flex flex-col gap-4 rounded-lg bg-blue-950 p-2 text-[12px] text-slate-200'>
        <span className='m-auto text-xl font-bold text-yellow-300'>
          Datos del equipo
        </span>
        <DataMachine titulo='Nombre' dato={titulo} />
        <DataMachine titulo='Marca' dato={marca} />
        <DataMachine titulo='Modelo' dato={modelo} />
        <DataMachine titulo='Fecha Ultimo Mantenimiento' dato={ult_mnto} />
        <DataMachine titulo='Año' dato={año} />
      </div>
      {/* END DATA MACHINE */}
    </section>
  )
}
