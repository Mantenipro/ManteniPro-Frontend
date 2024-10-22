import React from 'react';
import { useRouter } from 'next/router';

import UserData from '@/components/UserData';
import ReviewOrderSection from '@/components/ReviewOrderSection';
import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile';
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile';
import EquipmentInfo from '@/components/EquipmentInfo';
import OrderTimeline from '@/components/OrderTimeline';
import LefthTechnician from '@/components/LefthTechnician'; // Importa el nuevo componente

import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;

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
      direccion: 'Av. de la República, 123 Jardines Abril Padrón 6079, San Luis Potosí-Soledad 84132',
      compania: 'Empresa de Servicios',
      desc_falla: 'Cable roto, no se puede conectar',
    },
  ];

  return (
    <div className={`min-h-screen w-full bg-[#d8d5d5] lg:flex lg:flex-row lg:bg-white ${montserrat.className}`}>
      <NavbarTecnicoMobile />
      <div className='hidden lg:block lg:bg-gradient-to-b lg:from-[#31416d] lg:to-[#232c48]'>
        <LefthTechnician />
      </div>
      {/* Se establece la altura a 85vh para coincidir con el componente anterior */}
      <section className='m-6 flex h-[80vh] max-h-screen flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48]
       p-4 text-slate-300 md:m-10 md:p-10 md:h-[85vh]'
      >
        <HeaderTecnicoMobile />
        <span className='m-auto mt-6 font-semibold text-slate-200 md:mt-4 md:text-xl'>
          Detalle de Tarea
        </span>

        {/* ORDER DETAIL SECTION MOBILE */}
        <div className='scrollbar-thin scrollbar-thumb-rounded -mx-2 mt-4 flex flex-col gap-3 overflow-y-auto rounded-md bg-slate-200 p-1 py-3 text-slate-800 md:mx-4 md:hidden'>
          {/* DATA MACHINE */}
          {detailTask.map((item) => (
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
          ))}
          {/* ORDER TIMELINE */}
          {detailTask.map((item) => (
            <OrderTimeline
              key={`orderTimeline-${item.id}`}
              id={id}
              time={item.time}
              fecha={item.fecha}
            />
          ))}
          {/* DATA USER */}
          {detailTask.map((item) => (
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
          ))}
          {/* FOOTER ORDER DETAIL */}
          <ReviewOrderSection />
        </div>

        {/* ORDER DETAIL SECTION DESKTOP */}
        <div className='scrollbar-thin scrollbar-thumb-rounded -mx-2 mt-4 hidden flex-col gap-3 overflow-y-auto rounded-md bg-slate-200 p-1 py-3 pb-7 text-slate-800 md:mx-4 md:flex md:px-5'>
          {/* ORDER TITLE */}
          {detailTask.map((item) => (
            <span
              key={`orderTimeline-${item.id}`}
              className='font-semibold md:text-xl md:font-bold'
            >
              {item.title_task}
              <br />
            </span>
          ))}

          {/* ORDER TIMELINE */}
          {detailTask.map((item) => (
            <OrderTimeline
              key={`orderTimeline-${item.id}`}
              id={id}
              time={item.time}
              fecha={item.fecha}
            />
          ))}

          <div className='flex flex-row-reverse gap-2'>
            {/* DATA MACHINE */}
            {detailTask.map((item) => (
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
            ))}
            {/* DATA USER */}
            {detailTask.map((item) => (
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
            ))}
          </div>

          {/* DESC ORDER */}
          <div className='mt-2 flex w-full items-stretch gap-2 text-lg'>
            {detailTask.map((item, index) => (
              <div key={index} className='flex-1'>
                {item.desc_falla.length > 0 && (
                  <div className='flex h-full flex-col justify-between gap-2'>
                    <span className='font-medium'>Descripción</span>
                    <span className={`flex-1 rounded bg-slate-300 p-1 py-3 ${sourceSans3.className}`}>
                      {item.desc_falla}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {/* IMAGE ORDER */}
            {detailTask.map((item, index) => (
              <div key={index} className='ml-auto h-full'>
                {item.photo.length > 0 && (
                  <img
                    src={item.photo}
                    alt='task-photo'
                    className='h-full rounded-md object-cover'
                  />
                )}
              </div>
            ))}
          </div>

          {/* FOOTER ORDER DETAIL */}
          <ReviewOrderSection />
        </div>
      </section>
    </div>
  );
}




