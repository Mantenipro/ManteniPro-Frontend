import React from 'react'
import { useRouter } from 'next/router'

import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile'
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile'
import SearchInputTecnico from '@/components/SearchInputTecnico'
import LefthDashboard from '@/components/LefthDashboard'
import TaskCard from '@/components/TaskCard'

export default function HomeTecnico() {
  const dummyFails = [
    {
      id: 1,
      id_order: '123456789',
      picture: 'https://picsum.photos/200',
      title: 'Aire Acondicionado que no enfria adecuadamente',
      status: 'En proceso',
      date: '12/04/2024'
    },
    {
      id: 2,
      id_order: '985214745',
      picture: 'https://picsum.photos/200',
      title: 'Panel Solar requiere mantenimiento',
      status: 'Completada',
      date: '23/01/2020'
    },
    {
      id: 3,
      id_order: '789456123',
      picture: 'https://picsum.photos/200',
      title: 'Panel Solar se rompió',
      status: 'En proceso',
      date: '12/06/2024'
    },
    {
      id: 4,
      id_order: '123456789',
      picture: 'https://picsum.photos/200',
      title: 'Aire Acondionado roto',
      status: 'Completada',
      date: '12/12/2020'
    },
    {
      id: 5,
      id_order: '12356156',
      picture: 'https://picsum.photos/200',
      title: 'Panel Acondionado roto',
      status: 'Completada',
      date: '12/12/2020'
    }
  ]

  const router = useRouter()

  const handleCardClick = (id) => {
    router.push(`/task_detail/${id}`)
  }

  return (
    <div className='min-h-screen w-full bg-[#d8d5d5] lg:flex lg:flex-row lg:bg-white'>
      <NavbarTecnicoMobile />
      <div className='hidden lg:block lg:bg-gradient-to-b lg:from-[#31416d] lg:to-[#232c48]'>
        <LefthDashboard />
      </div>
      <section className='m-6 flex h-[85vh] max-h-screen flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300 lg:h-full lg:max-w-sm'>
        <HeaderTecnicoMobile />
        <SearchInputTecnico />

        {/* TASKS SECTION */}
        <div className='flex flex-col'>
          <span className='text-center font-semibold'>Tareas</span>

          <div className='mt-1 flex justify-around text-center'>
            <button className='w-full rounded-md p-2 transition duration-300 ease-in-out hover:bg-blue-950 focus:border-b-2 focus:border-b-blue-400 focus:bg-blue-950'>
              Completas
            </button>
            <button className='w-full rounded-md p-2 transition duration-300 ease-in-out hover:bg-blue-950 focus:border-b-2 focus:border-b-blue-400 focus:bg-blue-950'>
              En proceso
            </button>
          </div>
          {/* CARD TASK */}

          <section className='scrollbar-thin scrollbar-thumb-rounded mt-3 flex max-h-[55vh] flex-col gap-3 overflow-y-auto p-4 lg:min-h-[85vh] lg:max-w-[25dvh] lg:flex-1'>
            {dummyFails.map((task, index) => (
              <div key={index} onClick={() => handleCardClick(task.id_order)}>
                <TaskCard
                  key={index}
                  picture={task.picture}
                  title={task.title}
                  status={task.status}
                  date={task.date}
                  idOrder={task.id_order}
                />
              </div>
            ))}
          </section>
          {/* END CARD TASKS */}
        </div>
        {/* END TASKS SECTION */}
      </section>
    </div>
  )
}
