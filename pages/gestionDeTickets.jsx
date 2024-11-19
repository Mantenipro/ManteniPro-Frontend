import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LefthDashboard from '@/components/LefthDashboard';
import Title from '@/components/Title';
import InfoPanelCustomer from '@/components/InfoPanelCustomer';
import { getAllUsers, getReportsByUser, deleteReport } from '@/api/api'; 
import TaskCard from '@/components/TaskCard';

const GestionDeTickets = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [activeTab, setActiveTab] = useState('inProgress');
  const [selectedTask, setSelectedTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('Recientes'); 

  useEffect(() => {
    const fetchUsersAndReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token && email) {
          const userList = await getAllUsers(token);
          setUsers(userList);

          const currentUser = userList.find(user => user.email === email);
          const userId = currentUser ? currentUser._id : null;

          if (userId) {
            const userReports = await getReportsByUser(userId, token);
            console.log("Reportes del usuario:", userReports);
            setReports(userReports);
          } else {
            console.log("No se encontró el usuario con el email proporcionado.");
          }
        } else {
          console.log("Token o email no disponible en local storage.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndReports();
  }, [router]);


  const tasksToDisplay = activeTab === 'inProgress'
    ? reports.filter(report => (report.status === 'pending' || report.status === 'in-progress'))
    : reports.filter(report => report.status === 'completed');

  const sortedTasks = [...tasksToDisplay].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return selectedDate === 'Recientes' ? dateB - dateA : dateA - dateB;
  });

  const handleCardClick = (report) => {
    switch (report.status) {
      case 'pending':
        router.push(`/EstadoDeAsignacion`);
        break;
      
      case 'in-progress':
        router.push(`/StatusDetail?ticketId=${report._id}`);
        break;
      case 'completed':
        router.push(`/CierreTicket?ticketId=${report._id}`);
        break;
      default:
        console.log("El ticket está pendiente y no se puede redirigir.");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedTask(null);
  };

  const handleBackClick = () => {
    setSelectedTask(null);
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReport(reportId);
      setReports(reports.filter((report) => report._id !== reportId));
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={`min-h-screen w-full bg-white lg:flex lg:flex-row`}>
      <div className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}>
        <LefthDashboard />
      </div>

      <main className="flex-1 px-6 mt-2 w-full">
        <div className="mb-6 flex items-center justify-between">
          <div className="left-4 top-4 z-50 lg:hidden">
            <button onClick={toggleMenu} className="rounded-md bg-[#21262D] p-2 text-white focus:outline-none">
              {isMenuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>

        <Title className="text-2xl">Tickets</Title>

        <div className="mt-4">
          <InfoPanelCustomer setSelectedDate={setSelectedDate} />
        </div>

        <section className="w-full mt-4">
          <div className="flex w-full h-[75vh] md:h-[80vh] p-4 overflow-hidden bg-white rounded-xl shadow-lg">
              <div className="flex flex-col w-full flex-1">
                <div className="flex-1">
                  <div className="flex flex-col mb-4">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleTabChange('inProgress')}
                        className={`w-1/2 text-lg font-bold py-2 rounded-md ${activeTab === 'inProgress' ? 'bg-gray-300 text-gray-800' : 'text-gray-400'}`}
                      >
                        En proceso
                      </button>
                      <button
                        onClick={() => handleTabChange('completed')}
                        className={`w-1/2 text-lg font-bold py-2 rounded-md ${activeTab === 'completed' ? 'bg-gray-300 text-gray-800' : 'text-gray-400'}`}
                      >
                        Completadas
                      </button>
                    </div>
                    <div className="border-b border-gray-300 my-2" />
                  </div>
                  <div className="relative w-full h-[65vh] md:h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <div className="flex flex-col space-y-5 mt-4">
                      {sortedTasks.length > 0 ? (
                        sortedTasks.map((report) => (
                          <TaskCard
                            key={report._id}
                            picture={report.image}
                            title={report.title}
                            status={report.status}
                            description={report.description}
                            createdAt={report.created_at}
                            onClick={() => handleCardClick(report)}
                            onDelete={() => handleDeleteReport(report._id)}
                          />
                        ))
                      ) : (
                        <p>No hay reportes disponibles.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GestionDeTickets;





