import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LefthDashboard from '@/components/LefthDashboard-';
import { Montserrat, Source_Sans_3 } from 'next/font/google';
import { getReportById } from './api/api';
import { getAssignmentByReportId } from '../api/api';
import SignatureCanvas from 'react-signature-canvas';

const montserrat = Montserrat({ subsets: ['latin'] });
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function CierreTicket2() {
  const [showProfilesMenu, setShowProfilesMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [assignmentData, setAssignmentData] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [solution, setSolution] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vabo, setVabo] = useState('');
  const [assignedTo, setAssignedTo] = useState(''); // Nuevo estado para assignedTo

  const sigCanvas = useRef(null);
  const router = useRouter();
  const { ticketId } = router.query;

  useEffect(() => {
    if (ticketId) {
      // Función para obtener datos del ticket
      const fetchTicketData = async () => {
        try {
          const response = await getReportById(ticketId);
          if (response?.data?.report) {
            const report = response.data.report;
            setTicketData(report);
            setOrderId(report.orderNumber || '');
            setStartDate(report.created_at ? report.created_at.split('T')[0] : '');
          }
        } catch (error) {
          console.error('Error al obtener los datos del ticket:', error);
        }
      };

      // Función para obtener datos de la asignación
      const fetchAssignmentData = async () => {
        try {
          const assignmentResponse = await getAssignmentByReportId(ticketId);
          console.log('Assignment Response:', assignmentResponse);  // Log para verificar la estructura
      
          if (assignmentResponse) {
            setAssignmentData(assignmentResponse);
            setSolution(assignmentResponse.solution || '');
            setVabo(assignmentResponse.VaBo || '');
            setEndDate(
              assignmentResponse.finishedAt
                ? assignmentResponse.finishedAt.split('T')[0]
                : ''
            );
      
            // Verifica si 'assignedTo' existe en la respuesta
            if (assignmentResponse.assignedTo) {
              console.log('assignedTo:', assignmentResponse.assignedTo);  // Log para verificar si contiene datos
      
              // Aquí accedemos al ID directamente desde assignedTo._id
              const userId = assignmentResponse.assignedTo._id;
              console.log('ID del técnico:', userId);  // Verifica que el ID sea correcto
      
              // Verifica si el ID está disponible antes de hacer la solicitud
              if (userId) {
                const userResponse = await fetch(`https://api-v1.mantenipro.net/users/${userId}`); // Llama a la API con el ID del usuario
                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  // Asigna el nombre del técnico
                  setAssignedTo(userData.name || '');
                } else {
                  // Agregar log para investigar el código de estado y el cuerpo de la respuesta
                  const errorData = await userResponse.json();
                  console.error('Error al obtener los datos del usuario:', errorData);
                }
              } else {
                console.error('ID del técnico no disponible');
              }
            } else {
              console.error('assignedTo no está presente en la respuesta');
            }
          }
        } catch (error) {
          console.error('Error al obtener la asignación:', error);
        }
      };

      // Ejecutar ambas funciones
      fetchTicketData();
      fetchAssignmentData();
    }
  }, [ticketId]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`${montserrat.className} relative flex h-dvh flex-row lg:flex-grow`}>
      {/* Menú lateral */}
      <div
        className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
      >
        <LefthDashboard />
      </div>

      {/* Contenido principal */}
      <main className='flex-1 p-6'>
        <div className='flex lg:items-center lg:justify-between'>
          <div className='left-4 top-4 z-50 lg:hidden'>
            <button
              onClick={toggleMenu}
              className='rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
            >
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        <div>
          <h1
            className={`mb:text-left mb-2 ml-3 text-center text-3xl font-bold ${montserrat.className}`}
            style={{ color: '#2E3A59' }}
          >
            Cierre de Ticket
          </h1>
        </div>

        <form className='mx-auto max-w-lg overflow-y-auto rounded bg-[#F5F5F5] p-4 text-sm shadow-md md:h-[595px] md:w-2/3'>
          {/* ID de la Orden */}
          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='orderId'>
              Id de la Orden
            </label>
            <input
              type='text'
              id='orderId'
              value={orderId}
              className='w-full rounded border p-2'
              readOnly
            />
          </div>

          {/* Persona asignada */}
          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='assignedTo'>
              Persona Asignada
            </label>
            <input
              type="text"
              id="assignedTo"
              value={assignedTo} // Aquí se asigna el nombre del técnico
              className="w-full rounded border p-2"
              readOnly
            />
          </div>

          {/* Solución */}
          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='solution'>
              Solución elaborada por el ingeniero
            </label>
            <textarea
              id='solution'
              value={solution}
              className='w-full rounded border p-2'
              rows='4'
              readOnly
            ></textarea>
          </div>

          {/* Fecha de Inicio */}
          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='startDate'>
              Fecha de Inicio
            </label>
            <input
              type='date'
              id='startDate'
              value={startDate}
              className='w-full rounded border p-2'
              readOnly
            />
          </div>

          {/* Fecha de Término */}
          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='endDate'>
              Fecha de Término
            </label>
            <input
              type='date'
              id='endDate'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='w-full rounded border p-2'
            />
          </div>

          {/* VoBo del Cliente */}
          <div className='flex flex-col'>
            <label className='mb-2 font-bold text-gray-700' htmlFor='vabo'>
              VoBo del Cliente
            </label>
            {vabo ? (
              <img
                src={vabo}
                alt='VoBo del Cliente'
                className='w-full rounded border p-2'
              />
            ) : (
              <SignatureCanvas
                ref={sigCanvas}
                penColor='black'
                canvasProps={{ className: 'w-full rounded border p-2' }}
                onEnd={() => setVabo(sigCanvas.current.getTrimmedCanvas().toDataURL())}
              />
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
