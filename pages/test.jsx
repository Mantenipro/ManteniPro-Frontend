import React, { useState, useEffect } from 'react';
import LefthDashboard from '@/components/LefthDashboard';
import { Montserrat } from 'next/font/google';
import { getAllAssignments } from './api/api'; // Asegúrate de importar la función correctamente

const montserrat = Montserrat({ subsets: ['latin'] });

const ActualizarEquipo = () => {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [assignments, setAssignments] = useState([]); // Estado para almacenar las asignaciones

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu);
  };

  // Usar useEffect para obtener las asignaciones al cargar el componente
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await getAllAssignments(); // Llamar a la función para obtener las asignaciones
        setAssignments(data); // Almacenar las asignaciones en el estado
      } catch (error) {
        console.error('Error al obtener las asignaciones:', error);
      }
    };

    fetchAssignments();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div className={`relative flex min-h-screen bg-white ${montserrat.className}`}>
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>

      <main className='ml-3 flex flex-1 flex-col items-center justify-center lg:flex-row'>
        <div className='flex flex-1 flex-col items-center'>
          <div className='mt-2 flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
            <div className='left-4 top-4 z-50 lg:hidden'>
              <button
                onClick={toggleMenu}
                className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
              >
                {isMenuOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>
          {/* Renderizamos las asignaciones obtenidas */}
          <div className='w-full mt-4'>
            <h2 className='text-xl font-semibold mb-4'>Asignaciones</h2>
            <div className='w-full'>
              {assignments.length > 0 ? (
                <ul className='space-y-4'>
                  {assignments.map((assignment) => (
                    <li key={assignment._id} className='border-b py-2'>
                      <p><strong>Técnico:</strong> {assignment.technician.name}</p>
                      <p><strong>Reporte:</strong> {assignment.report.title}</p>
                      <p><strong>Prioridad:</strong> {assignment.priority}</p>
                      <p><strong>Estado:</strong> {assignment.status}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay asignaciones disponibles.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActualizarEquipo;

