import React, { useState, useEffect } from 'react';
import {
  getAllUsers,
  getReportsByCompany,
  getReportsByUser,
  fetchReportsByTecnico
} from '@/api/api';
import TicketCard from './TicketCard';

const TicketsStatus = () => {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState({
    porHacer: [],
    enProceso: [],
    completados: []
  });
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  const sections = [
    { title: 'Por hacer', tickets: reports.porHacer },
    { title: 'En proceso', tickets: reports.enProceso },
    { title: 'Completados', tickets: reports.completados }
  ];

  useEffect(() => {
    const fetchUsersAndReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
          const userList = await getAllUsers(token);
          setUsers(userList);

          const currentUser = userList.find((user) => user.email === email);
          const userId = currentUser ? currentUser._id : null;
          const role = currentUser ? currentUser.role : null;
          const adminType = currentUser ? currentUser.adminType : null;
          const company = currentUser ? currentUser.company : null;

          setUserRole(role);
          setUserId(userId);

          // Verificar si el adminType es "secundario" y obtener el ID de un usuario con "principal"
          if (adminType === 'secundario') {
            const principalUser = userList.find(user => user.adminType === 'principal' && user.company === company);
            if (principalUser) {
              // Si existe un usuario con adminType 'principal', realizar las peticiones con su ID
              fetchReportsForUser(principalUser._id, token);
            }
          } else if (userId) {
            // Si el adminType no es 'secundario', proceder con el ID actual
            fetchReportsForUser(userId, token);
          }

          // Configura la sección inicial en función del rol
          setCurrentSection(role === 'admin' ? 0 : 1);

        }
      } catch (error) {
        console.error('Error al obtener usuarios o reportes:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReportsForUser = async (userId, token) => {
      if (userRole === 'admin') {
        const userReports = await getReportsByCompany(userId, token);
        const updatedReports = userReports.map((report) => {
          const reportUser = users.find((user) => user._id === report.userId);
          return {
            ...report,
            userName: reportUser ? reportUser.name : ''
          };
        });

        setReports({
          porHacer: updatedReports.filter((report) => report.status === 'pending'),
          enProceso: updatedReports.filter((report) => report.status === 'in-progress'),
          completados: updatedReports.filter((report) => report.status === 'completed')
        });
      } else if (userRole === 'usuario') {
        const userReports = await getReportsByUser(userId, token);
        setReports({
          enProceso: userReports.filter((report) => report.status === 'in-progress'),
          completados: userReports.filter((report) => report.status === 'completed')
        });
      } else if (userRole === 'tecnico') {
        try {
          const tecnicoReports = await fetchReportsByTecnico();
          if (Array.isArray(tecnicoReports)) {
            setReports({
              enProceso: tecnicoReports.filter((report) => report.status === 'in-progress'),
              completados: tecnicoReports.filter((report) => report.status === 'completed')
            });
          } else {
            console.error('fetchAssignments no devolvió un array:', tecnicoReports);
            setReports({
              enProceso: [],
              completados: []
            });
          }
        } catch (error) {
          console.error('Error al obtener reportes del técnico:', error);
          setReports({
            enProceso: [],
            completados: []
          });
        }
      }
    };

    fetchUsersAndReports();
  }, [userRole, userId]);

  const handleNextSection = () => {
    setCurrentSection((prevSection) => {
      if (userRole === 'admin') {
        return (prevSection + 1) % 3; // Navega entre las 3 secciones: 0, 1, 2
      } else {
        return prevSection === 1 ? 2 : 1; // Mantiene la lógica para otros roles
      }
    });
  };

  const handlePrevSection = () => {
    setCurrentSection((prevSection) => {
      if (userRole === 'admin') {
        return (prevSection + 2) % 3; // Navega en sentido inverso entre 0, 1, 2
      } else {
        return prevSection === 2 ? 1 : 2; // Mantiene la lógica para otros roles
      }
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='rounded-lg bg-[#F5F5F5] p-2'>
      <div
        className={`mb-12 grid grid-cols-1 gap-8 ${userRole === 'admin' ? 'md:grid-cols-3' : 'md:grid-cols-2 md:py-2 md:px-2'}`}
      >
        {userRole === 'admin' ? (
          <>
            <StatusColumn
              title={sections[currentSection].title}
              tickets={sections[currentSection].tickets}
              handleNextSection={handleNextSection}
              handlePrevSection={handlePrevSection}
              showNavigation={true}
            />
            <div className='hidden md:block'>
              <StatusColumn title='En proceso' tickets={reports.enProceso} />
            </div>
            <div className='hidden md:block'>
              <StatusColumn title='Completados' tickets={reports.completados} />
            </div>
          </>
        ) : (
          <>
            <StatusColumn
              title={sections[currentSection].title}
              tickets={sections[currentSection].tickets}
              handleNextSection={handleNextSection}
              handlePrevSection={handlePrevSection}
              showNavigation={true}
            />
            <div className='hidden md:block'>
              <StatusColumn title='Completados' tickets={reports.completados} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatusColumn = ({
  title,
  tickets,
  handleNextSection,
  handlePrevSection,
  showNavigation
}) => (
  <div className='group relative flex flex-col items-center'>
    <div className='z-10 flex w-full items-center justify-between'>
      {showNavigation && (
        <button
          onClick={handlePrevSection}
          className='block rounded-full bg-gray-200 p-2 md:hidden'
        >
          <img
            src='/icon/left-arrow-icon.png'
            alt='Left arrow'
            className='h-4 w-4'
          />
        </button>
      )}
      <div className='flex items-center'>
        <span className='mr-2 h-3 w-3 rounded-full bg-gradient-to-r from-[#21262D] to-[#414B66]'></span>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      {showNavigation && (
        <button
          onClick={handleNextSection}
          className='block rounded-full bg-gray-200 p-2 md:hidden'
        >
          <img
            src='/icon/right-arrow-icon.png'
            alt='Right arrow'
            className='h-4 w-4'
          />
        </button>
      )}
    </div>
    <div className='mb-4 h-1 w-full bg-gradient-to-r from-[#21262D] to-[#414B66]'></div>
    <div className='animate-fadeIn scrollbar-hide relative z-0 mt-8 flex h-[60vh] w-auto flex-col items-center justify-start overflow-y-auto md:h-[60vh]'>
      {tickets && tickets.length === 0 ? (
        <p>No hay tickets para mostrar</p>
      ) : (
        tickets &&
        tickets.map((ticket, index) => (
          <div key={index} className='mb-1 w-full'>
            <TicketCard ticket={ticket} report={ticket} />
          </div>
        ))
      )}
    </div>
  </div>
);

export default TicketsStatus;

