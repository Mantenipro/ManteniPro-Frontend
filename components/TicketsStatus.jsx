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
    <div className="bg-[#F5F5F5] p-2 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Ajustado el gap y margen entre columnas */}
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
  <div className="relative flex flex-col items-center group">
    <div className="flex items-center justify-between w-full z-10">
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
    <div className="w-full h-1 bg-gradient-to-r from-[#21262D] to-[#414B66] mb-4"></div>
    <div className="w-full mt-8 md:h-[60vh] h-[60vh] flex flex-col justify-start items-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 relative z-0">
      {tickets.length === 0 ? (
        <p>No hay tickets para mostrar</p>
      ) : (
        tickets.map((ticket, index) => (
          <div key={index} className="mb-1 w-full">
            <TicketCard ticket={ticket} report={ticket} />
          </div>
        ))
      )}
    </div>
  </div>
);

export default TicketsStatus;











