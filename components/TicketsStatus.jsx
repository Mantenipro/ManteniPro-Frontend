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

  useEffect(() => {
    const fetchUsersAndReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token && email) {
          const userList = await getAllUsers(token);
          setUsers(userList);

          const currentUser = userList.find(user => user.email === email);
          if (!currentUser) return;

          const companyId = currentUser.company;
          if (!companyId) return;

          const companyReports = await getReportsByCompany(companyId, token);

          const ticketsPorHacer = companyReports.filter(report => report.status === 'pending');
          const ticketsEnProceso = companyReports.filter(report => report.status === 'in-progress');
          const ticketsCompletados = companyReports.filter(report => report.status === 'completed');

          setReports({
            porHacer: ticketsPorHacer,
            enProceso: ticketsEnProceso,
            completados: ticketsCompletados
          });
        }
      } catch (error) {
        console.error("Error al obtener usuarios o reportes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndReports();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Estado de Tickets</h1>

      <div>
        <h2>Por Hacer</h2>
        {reports.porHacer.length > 0 ? (
          reports.porHacer.map(report => (
            <TicketCard key={report._id} report={report} />
          ))
        ) : (
          <p>No hay tickets por hacer.</p>
        )}
      </div>

      <div>
        <h2>En Proceso</h2>
        {reports.enProceso.length > 0 ? (
          reports.enProceso.map(report => (
            <TicketCard key={report._id} report={report} />
          ))
        ) : (
          <p>No hay tickets en proceso.</p>
        )}
      </div>

      <div>
        <h2>Completados</h2>
        {reports.completados.length > 0 ? (
          reports.completados.map(report => (
            <TicketCard key={report._id} report={report} />
          ))
        ) : (
          <p>No hay tickets completados.</p>
        )}
      </div>
    </div>
  );
};

export default TicketsStatus;


