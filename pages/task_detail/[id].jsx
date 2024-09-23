import React from 'react'
import { useRouter } from 'next/router'

import UserData from '@/components/UserData'
import FotterOrderDetail from '@/components/FotterOrderDetail'
import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile'
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile'
import IdOrderDetail from '@/components/IdOrderDetail'

export default function TaskDetail() {
  const router = useRouter()
  const { id } = router.query

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

  return (
    <div className='min-h-screen w-full bg-[#d8d5d5]'>
      <NavbarTecnicoMobile />
      <section className='m-6 flex h-[85vh] max-h-screen flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300 md:mx-12 md:p-8'>
        <HeaderTecnicoMobile />
        <span className='m-auto mt-6 font-semibold text-slate-200 md:mt-4 md:text-xl'>
          Detalle de Tarea
        </span>
        <div className='scrollbar-thin scrollbar-thumb-rounded -mx-2 mt-4 flex flex-col gap-3 overflow-y-auto rounded-md bg-slate-200 p-1 py-3 text-slate-800 md:mx-4'>
          {/* DATA MACHINE */}
          {detailTask.map((item) => {
            return (
              <IdOrderDetail
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
              <div className='md:hidden'>
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
              </div>
            )
          })}
          {/* FOTTER ORDER DETAIL */}
          <FotterOrderDetail />
        </div>
      </section>
    </div>
  )
}
