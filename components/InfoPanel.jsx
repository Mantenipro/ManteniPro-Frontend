// InfoPanel.js
import React, { useState } from 'react';
import AssignedToFilter from './AssignedToFilter'; // Importar el filtro de "Asignado a"
import LocationFilter from './LocationFilter'; // Importar el nuevo filtro de localización con checkboxes

const dateOptions = ['Recientes', 'Últimos'];
const priorityOptions = ['Alta', 'Media', 'Baja'];

const InfoPanel = () => {
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDate] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]); // Array para manejar múltiples localizaciones
  const [priority, setPriority] = useState('');

  return (
    <div className="flex overflow-x-auto space-x-2 items-center text-white">
      {/* Filtro de Asignado a */}
      <AssignedToFilter assignedTo={assignedTo} setAssignedTo={setAssignedTo} />

      {/* Filtro de Fecha */}
      <div className="flex items-center bg-gradient-to-r from-[#21262D] to-[#414B66] p-1 rounded-md space-x-1">
        <img src="/icon/calendar-icon.png" alt="Fecha" className="h-4 w-4" />
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-transparent border-none p-1 text-sm rounded-md"
        >
          <option value="">Fecha</option>
          {dateOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de Localización (con checkboxes) */}
      <LocationFilter selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} />

      {/* Filtro de Prioridad */}
      <div className="flex items-center bg-gradient-to-r from-[#21262D] to-[#414B66] p-1 rounded-md space-x-1">
        <img src="/icon/priority-icon.png" alt="Prioridad" className="h-4 w-4" />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-transparent border-none p-1 text-sm rounded-md"
        >
          <option value="">Prioridad</option>
          {priorityOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InfoPanel;












































