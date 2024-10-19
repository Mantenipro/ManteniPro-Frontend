import React, { useState } from 'react';
import DateFilter from './DateFilter'; 
import LocationFilter from './LocationFilter'; // Importa el filtro de localización

const InfoPanelCustomer = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState(''); // Estado para la localización

  return (
    <div className='flex overflow-x-auto space-x-2 items-center text-white'>
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
    </div>
  )
};

export default InfoPanelCustomer;
