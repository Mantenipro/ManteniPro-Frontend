import React, { useState } from 'react';
import AssignedToFilter from './AssignedToFilter'; // Asegúrate de que la ruta sea correcta
import LocationFilter from './LocationFilter'; // Asegúrate de que la ruta sea correcta
import PriorityFilter from './PriorityFilter'; // Asegúrate de importar el nuevo componente
import DateFilter from './DateFilter'; // Asegúrate de importar el nuevo componente

const InfoPanel = () => {
  const [selectedAssignedTo, setSelectedAssignedTo] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="flex overflow-x-auto space-x-2 items-center text-white">
      {/* Filtro de Asignado a */}
      <AssignedToFilter 
        selectedAssignedTo={selectedAssignedTo} 
        setSelectedAssignedTo={setSelectedAssignedTo} 
      />

      {/* Filtro de Fecha */}
      <DateFilter 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
      />

      {/* Filtro de Localización */}
      <LocationFilter 
        selectedLocations={location} 
        setSelectedLocations={setLocation} 
      />

      {/* Filtro de Prioridad */}
      <PriorityFilter 
        selectedPriorities={selectedPriorities} 
        setSelectedPriorities={setSelectedPriorities} 
      />
    </div>
  );
};

export default InfoPanel;

















































