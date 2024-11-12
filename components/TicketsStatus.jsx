/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { getAllUsers, getReportsByCompany } from '@/api/api';
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

  const sections = [
    { title: 'Por hacer', tickets: reports.porHacer },
    { title: 'En proceso', tickets: reports.enProceso },
    { title: 'Completados', tickets: reports.completados },
  ];

  useEffect(() => {
    const fetchUsersAndReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token && email) {
          const userList = await getAllUsers(token);
          setUsers(userList);

          const currentUser = userList.find(user => user.email === email);
          const userId = currentUser?._id;

          if (userId) {
            const userReports = await getReportsByCompany(userId, token);

            // Agregar nombre del usuario al reporte
            const updatedReports = userReports.map(report => {
              const reportUser = userList.find(user => user._id === report.userId);
              return {
                ...report,
                userName: reportUser ? reportUser.name : '',
              };
            });

            setReports({
              porHacer: updatedReports.filter(report => report.status === 'pending'),
              enProceso: updatedReports.filter(report => report.status === 'in-progress'),
              completados: updatedReports.filter(report => report.status === 'completed')
            });
          }
        }
      } catch (error) {
        console.error("Error al obtener usuarios o reportes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndReports();
  }, []);

  const handleNextSection = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  };

  const handlePrevSection = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-[#F5F5F5] p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusColumn
          title={sections[currentSection].title}
          tickets={sections[currentSection].tickets}
          handleNextSection={handleNextSection}
          handlePrevSection={handlePrevSection}
          showNavigation={true}
        />
        <div className="hidden md:block">
          <StatusColumn title="En proceso" tickets={reports.enProceso} />
        </div>
        <div className="hidden md:block">
          <StatusColumn title="Completados" tickets={reports.completados} />
        </div>
      </div>
    </div>
  );
};

const StatusColumn = ({ title, tickets, handleNextSection, handlePrevSection, showNavigation }) => (
  <div className="flex flex-col items-center group">
    <div className="flex items-center justify-between w-full mb-4">
      {showNavigation && (
        <button onClick={handlePrevSection} className="block md:hidden bg-gray-200 p-2 rounded-full">
          <img src="/icon/left-arrow-icon.png" alt="Left arrow" className="w-4 h-4" />
        </button>
      )}
      <div className="flex items-center">
        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#21262D] to-[#414B66] mr-2"></span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {showNavigation && (
        <button onClick={handleNextSection} className="block md:hidden bg-gray-200 p-2 rounded-full">
          <img src="/icon/right-arrow-icon.png" alt="Right arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="w-full h-1 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#21262D] to-[#414B66]"></div>
    <div className="w-full mt-4 group-hover:bg-opacity-100 h-auto md:h-[60vh] flex flex-col justify-center items-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {tickets.length === 0 ? (
        <p>No hay tickets para mostrar</p>
      ) : (
        tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} report={ticket} />
        ))
      )}
    </div>
  </div>
);

export default TicketsStatus;











