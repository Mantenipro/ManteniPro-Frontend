import React, { useState } from 'react';
import DateFilter from './DateFilter'; 
import LocationFilter from './LocationFilter'; 
const InfoPanelCustomer = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState(''); 

  return (
    <div className='flex overflow-x-auto space-x-2 items-center text-white'>
     
      <DateFilter
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      
    
      <LocationFilter
        selectedLocations={location}
        setSelectedLocations={setLocation}
      />
    </div>
  )
};

export default InfoPanelCustomer;
