import React, { useState, useEffect } from 'react';
import { getAllUsers, getReportsByCompany } from '@/api/api';

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
          console.log("Token y email obtenidos de localStorage:", { token, email });

          // 1. Obtener todos los usuarios
          const userList = await getAllUsers(token);
          setUsers(userList);
          console.log("Lista de usuarios obtenida:", userList);

          if (!Array.isArray(userList) || userList.length === 0) {
            console.warn("La lista de usuarios está vacía o no es un arreglo.");
            return;
          }

          // 2. Encontrar el usuario actual
          const currentUser = userList.find(user => user.email === email);
          if (!currentUser) {
            console.warn("No se encontró un usuario con el email proporcionado.");
            return;
          }

          console.log("Datos del usuario actual:", currentUser);
          const userId = currentUser._id; // Cambiado a _id según los datos obtenidos
          console.log("ID de usuario obtenido:", userId);

          if (!userId) {
            console.warn("El usuario actual no tiene un ID válido.");
            return;
          }

          // 3. Obtener los reportes por usuario
          try {
            const userReports = await getReportsByCompany(userId, token);
            console.log("Reportes del usuario obtenidos:", userReports);

            const ticketsPorHacer = userReports.filter(report => report.status === 'pending');
            const ticketsEnProceso = userReports.filter(report => report.status === 'in-progress');
            const ticketsCompletados = userReports.filter(report => report.status === 'completed');

            setReports({
              porHacer: ticketsPorHacer,
              enProceso: ticketsEnProceso,
              completados: ticketsCompletados
            });
          } catch (reportError) {
            console.error("Error fetching reports by user:", reportError);
          }

        } else {
          console.warn("Token o email no disponible en localStorage.");
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
          reports.porHacer.map((report, index) => (
            <div key={index}>
              <p>{report.title}</p>
              <p>{report.description}</p>
            </div>
          ))
        ) : (
          <p>No hay tickets por hacer.</p>
        )}
      </div>
      <div>
        <h2>En Proceso</h2>
        {reports.enProceso.length > 0 ? (
          reports.enProceso.map((report, index) => (
            <div key={index}>
              <p>{report.title}</p>
              <p>{report.description}</p>
            </div>
          ))
        ) : (
          <p>No hay tickets en proceso.</p>
        )}
      </div>
      <div>
        <h2>Completados</h2>
        {reports.completados.length > 0 ? (
          reports.completados.map((report, index) => (
            <div key={index}>
              <p>{report.title}</p>
              <p>{report.description}</p>
            </div>
          ))
        ) : (
          <p>No hay tickets completados.</p>
        )}
      </div>
    </div>
  );
};

export default TicketsStatus;








