/* eslint-disable @next/next/no-img-element */
import React from 'react'
import EquipmentInfo from './EquipmentInfo'
import OrderTimeline from './OrderTimeline'
import UserData from './UserData'
import ReviewOrderSection from './ReviewOrderSection'

export default function TaskDetailLayout() {
  const detailTask = [
    {
      id: 1,
      title_task: 'Reparar cable',
      photo: 'https://picsum.photos/200',
      name_machine: 'Aire CoolMaster',
      marca: 'CoolMaster 2024',
      modelo: 'CM-AC2014',
      ult_mnto: '12/03/2024',
      año: '2014',
      time: '3h 30m',
      fecha: '12/04/2024',
      user: 'Alejandro',
      user_photo: 'https://picsum.photos/200',
      email_user: 'alejandro@gmail.com',
      direccion:
        'Av. de la República, 123 Jardines Abril Padrón 6079, San Luis Potosí-Soledad 84132',
      compania: 'Empresa de Servicios',
      desc_falla: 'Cable roto, no se puede conectar'
    }
  ]

  // ORDER DETAIL SECTION DESKTOP
  return (
    <div className='scrollbar-thin scrollbar-thumb-rounded -mx-2 mt-4 hidden flex-col gap-3 overflow-y-auto rounded-md bg-slate-200 p-1 py-3 pb-7 text-slate-800 md:mx-4 md:flex md:px-5'>
      {/* ORDER TITLE */}
      {detailTask.map((item) => {
        return (
          <span
            key={`orderTimeline-${item.id}`}
            className='font-semibold md:text-xl md:font-bold'
          >
            {item.title_task}
            <br />
          </span>
        )
      })}

      {/* ORDER TIMELINE */}
      {detailTask.map((item) => {
        return (
          <OrderTimeline
            key={`orderTimeline-${item.id}`}
            id={id}
            time={item.time}
            fecha={item.fecha}
          />
        )
      })}

      <div className='flex flex-row-reverse gap-2'>
        {/* DATA MACHINE */}
        {detailTask.map((item) => {
          return (
            <EquipmentInfo
              key={`orderDetail-${item.id}`}
              foto={item.photo}
              tit_Order={item.title_task}
              titulo={item.name_machine}
              marca={item.marca}
              modelo={item.modelo}
              ult_mnto={item.ult_mnto}
              año={item.año}
            />
          )
        })}
        {/* DATA USER */}
        {detailTask.map((item) => {
          return (
            <UserData
              key={`useData-${item.id}`}
              id={id}
              time={item.time}
              fecha={item.fecha}
              user={item.user}
              user_photo={item.user_photo}
              email_user={item.email_user}
              direccion={item.direccion}
              compania={item.compania}
              desc_falla={item.desc_falla}
            />
          )
        })}
      </div>

      {/* DESC ORDER h-[10vh]*/}
      <div className='mt-2 flex w-full items-stretch gap-2 text-lg'>
        {detailTask.map((item, index) => {
          return (
            <div key={index} className='flex-1'>
              {item.desc_falla.length > 0 && (
                <div className='flex h-full flex-col justify-between gap-2'>
                  <span className='font-medium'>Descripción</span>
                  <span className='flex-1 rounded bg-slate-300 p-1 py-3'>
                    {item.desc_falla}
                  </span>
                </div>
              )}
            </div>
          )
        })}
        {/* IMGE ORDER */}
        {detailTask.map((item, index) => {
          return (
            <div key={index} className='ml-auto h-full'>
              {item.photo.length > 0 && (
                <img
                  src={item.photo}
                  alt='task-photo'
                  className='h-full rounded-md object-cover'
                />
              )}
            </div>
          )
        })}
      </div>

      {/* FOTTER ORDER DETAIL */}
      <ReviewOrderSection />
    </div>
  )
}
