import React, { useState } from 'react';
import AssignedToFilter from './AssignedToFilter'; 
import LocationFilter from './LocationFilter'; 
import PriorityFilter from './PriorityFilter'; 
import DateFilter from './DateFilter'; 

const InfoPanel = () => {
  const [selectedAssignedTo, setSelectedAssignedTo] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className='flex overflow-x-auto space-x-2 items-center text-white'>
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
  )
};

export default InfoPanel;







































































































































































































