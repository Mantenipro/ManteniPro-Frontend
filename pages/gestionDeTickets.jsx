import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LefthCustomer from '@/components/LefthCustomer'; // LefthCustomer
import Title from '@/components/Title'; // Title
import InfoPanelCustomer from '@/components/InfoPanelCustomer'; // Importa el nuevo componente
import TicketList from '@/components/TicketList'; // Import the TicketList component

import { Montserrat, Source_Sans_3 } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const dummyTasksInProgress = [
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado no enfría adecuadamente', idOrder: '132314', date: '13/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado no enfría adecuadamente', idOrder: '132314', date: '13/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado no enfría adecuadamente', idOrder: '132314', date: '13/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado no enfría adecuadamente', idOrder: '132314', date: '13/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado no enfría adecuadamente', idOrder: '132314', date: '13/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado no enfría adecuadamente', idOrder: '132314', date: '13/07/24' },
];

const dummyTasksCompleted = [
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado reparado', idOrder: '132315', date: '12/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado reparado', idOrder: '132315', date: '12/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado reparado', idOrder: '132315', date: '12/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado reparado', idOrder: '132315', date: '12/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado reparado', idOrder: '132315', date: '12/07/24' },
  { picture: '/airConditioning.jpg', title: 'Aire acondicionado reparado', idOrder: '132315', date: '12/07/24' },
];

const GestionDeTickets = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCardClick = (id) => {
    router.push(`/taskDetail/${id}`);
  };

  return (
    <div className={`min-h-screen w-full bg-white lg:flex lg:flex-row ${montserrat.className}`}>
      {/* Menu lateral */}
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthCustomer />
      </div>

      {/* Main Section */}
      <main className="flex-1 px-6 mt-2">
        <div className="mb-6 flex items-center justify-between">
          {/* Botón del menú para móviles */}
          <div className="left-4 top-4 z-50 lg:hidden">
            <button
              onClick={toggleMenu}
              className="rounded-md bg-[#21262D] p-2 text-white focus:outline-none"
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        {/* Título de la página */}
        <Title className="text-2xl">Tickets</Title>

        {/* Panel de información */}
        <div className="mt-4">
          <InfoPanelCustomer /> {/* Usar InfoPanelCustomer en lugar de InfoPanel */}
        </div>

        {/* Sección de tareas */}
        <section className="w-full mt-4">
          <TicketList
            tasksInProgress={dummyTasksInProgress}
            tasksCompleted={dummyTasksCompleted}
          /> {/* Pass in the tasks */}
        </section>
      </main>
    </div>
  );
};

export default GestionDeTickets;










