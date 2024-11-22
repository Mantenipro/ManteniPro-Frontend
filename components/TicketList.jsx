import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard'; 
import TicketDetail from './TicketDetail'; 
import TicketClosed from './TicketClosed'; 
import { getAllUsers, getReportsByUserId } from '@/api/api'; 

export default function TicketList({ tasksInProgress, tasksCompleted }) {
  const [activeTab, setActiveTab] = useState('inProgress'); 
  const [selectedTask, setSelectedTask] = useState(null); 
  const [users, setUsers] = useState([]); 
  const [reports, setReports] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userList = await getAllUsers(token);
          setUsers(userList);

         
          const reportPromises = userList.map(user => getReportsByUserId(user._id, token));
          const userReports = await Promise.all(reportPromises);
          setReports(userReports.flat());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndReports();
  }, []);

  const tasksToDisplay = activeTab === 'inProgress' ? tasksInProgress : tasksCompleted;

  const handleCardClick = (task) => {
    setSelectedTask(task); 
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); 
    setSelectedTask(null); 
  };

  const handleBackClick = () => {
    setSelectedTask(null); 
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex w-full h-[75vh] md:h-[80vh] p-4 overflow-hidden bg-white rounded-xl shadow-lg">
      {!selectedTask && ( 
        <div className="flex flex-col w-full max-w-[400px] sm:max-w-[500px] flex-1">
          <div className="flex-1">
            {/* Tabs */}
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
                {tasksToDisplay.map((task, index) => (
                  <TaskCard
                    key={index}
                    picture={task.picture}
                    title={task.title}
                    idOrder={task.idOrder}
                    date={task.date}
                    onClick={() => handleCardClick(task)} 
                  />
                ))}
                {/* Renderiza los reportes aquí */}
                {reports.map((report, index) => (
                  <TaskCard
                    key={index}
                    picture={report.picture} 
                    title={report.description} 
                    idOrder={report.id} 
                    date={report.creationDate} 
                    onClick={() => handleCardClick(report)} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTask && (
        <div className="flex flex-col flex-1 max-w-full">
          <button
            onClick={handleBackClick} 
            className="text-lg font-bold text-blue-500 mb-4 self-start"
          >
            &larr; Volver
          </button>
          {activeTab === 'completed' ? (
            <TicketClosed task={selectedTask} /> 
          ) : (
            <TicketDetail task={selectedTask} />
          )}
        </div>
      )}
    </div>
  );
}















