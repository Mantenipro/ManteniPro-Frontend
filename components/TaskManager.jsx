import React, { useState } from 'react';
import TaskCard from './TaskCard'; // Asegúrate de importar el TaskCard
import TicketDetail from './TicketDetail'; // Importa el nuevo componente de detalle

const tasks = [
  { id: 1, picture: 'url1', title: 'Reparar Cable', status: 'In Progress', date: '2024-10-18', idOrder: '#120' },
  { id: 2, picture: 'url2', title: 'Reparar Plomería', status: 'Completed', date: '2024-10-18', idOrder: '#121' },
  // Agrega más tareas según sea necesario
];

export default function TaskManager() {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onClick={() => handleCardClick(task)} // Manejador de clics
          />
        ))}
      </div>

      {selectedTask && (
        <TicketDetail task={selectedTask} /> // Muestra el componente de detalle si hay una tarea seleccionada
      )}
    </div>
  );
}
