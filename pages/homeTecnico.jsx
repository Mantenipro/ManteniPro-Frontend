mport React, { useState } from 'react';
import { useRouter } from 'next/router';

import NavbarTecnicoMobile from '@/components/NavbarTecnicoMobile';
import HeaderTecnicoMobile from '@/components/HeaderTecnicoMobile';
import SearchInputTecnico from '@/components/SearchInputTecnico';
import LefthTechnician from '@/components/LefthTechnician';
import TaskCard from '@/components/TaskCard';

import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function HomeTecnico() {
  const [filter, setFilter] = useState('completadas'); 
  const dummyFails = [
    {
      id: 1,
      id_order: '123456789',
      picture: 'https://picsum.photos/200',
      title: 'Aire Acondicionado que no enfria adecuadamente',
      status: 'En proceso',
      date: '12/04/2024',
    },
    {
      id: 2,
      id_order: '985214745',
      picture: 'https://picsum.photos/200',
      title: 'Panel Solar requiere mantenimiento',
      status: 'Completada',
      date: '23/01/2020',
    },{
      id: 9,
      id_order: '985214745',
      picture: 'https://picsum.photos/200',
      title: 'Panel Solar requiere mantenimiento',
      status: 'Completada',
      date: '23/01/2020',
    },{
      id: 11,
      id_order: '985214745',
      picture: 'https://picsum.photos/200',
      title: 'Panel Solar requiere mantenimiento',
      status: 'Completada',
      date: '23/01/2020',
    },
    {
      id: 3,
      id_order: '789456123',
      picture: 'https://picsum.photos/200',
      title: 'Panel Solar se rompió',
      status: 'En proceso',
      date: '12/06/2024',
    },
    {
      id: 4,
      id_order: '123456789',
      picture: 'https://picsum.photos/200',
      title: 'Aire Acondionado roto',
      status: 'Completada',
      date: '12/12/2020',
    },
    {
      id: 5,
      id_order: '12356156',
      picture: 'https://picsum.photos/200',
      title: 'Panel Acondionado roto',
      status: 'Completada',
      date: '12/12/2020',
    },
  ];

  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/taskDetail/${id}`);
  };

  
  const filteredTasks = dummyFails.filter(task =>
    filter === 'completadas' ? task.status === 'Completada' : task.status === 'En proceso'
  );

  return (
    <div className={`min-h-screen w-full bg-[#d8d5d5] lg:flex lg:flex-row lg:bg-white ${montserrat.className}`}>
      <NavbarTecnicoMobile />
      <div className='hidden lg:block lg:bg-gradient-to-b lg:from-[#31416d] lg:to-[#232c48]'>
        <LefthTechnician />
      </div>
      <section className='m-6 flex  md:m-10  md:w-full max-h-screen flex-col rounded-md bg-gradient-to-b from-[#31416d] to-[#232c48] p-4 text-slate-300 md:p-10 lg:h-full lg:max-w-none'
      >
        <HeaderTecnicoMobile />
        <SearchInputTecnico />

        {/* TASKS SECTION */}
        <div className='flex flex-col h-[60vh] md:h-[75vh]'>
          <span className='text-center font-semibold md:text-xl'>Tareas</span>

          <div className='mt-1 flex justify-around text-center md:text-xl'>
            <button
              onClick={() => setFilter('completadas')}
              className={`w-full rounded-md p-2 transition duration-300 ease-in-out hover:bg-blue-950 focus:border-b-2 focus:border-b-blue-400 focus:bg-blue-950 ${filter === 'completadas' ? 'bg-blue-950 text-white' : ''}`}
            >
              Completas
            </button>
            <button
              onClick={() => setFilter('en_proceso')}
              className={`w-full rounded-md p-2 transition duration-300 ease-in-out hover:bg-blue-950 focus:border-b-2 focus:border-b-blue-400 focus:bg-blue-950 ${filter === 'en_proceso' ? 'bg-blue-950 text-white' : ''}`}
            >
              En proceso
            </button>
          </div>

          
          <section className='w-full mt-4 group-hover:bg-opacity-100 h-[45vh] md:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex flex-col'>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleCardClick(task.id_order)}
                className={`${sourceSans3.className} w-full flex ${filter === 'completadas' ? 'lg:justify-start' : 'lg:justify-end'} mb-4`}
              >
                <TaskCard
                  picture={task.picture}
                  title={task.title}
                  status={task.status}
                  date={task.date}
                  idOrder={task.id_order}
                  className="md:h-[150px] h-[15vh] w-full md:w-[600px]" 
                />
              </div>
            ))}
          </section>
         
        </div>
        
      </section>
    </div>
  );
}











