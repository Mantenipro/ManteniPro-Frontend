import React, { useState } from 'react';
import DateFilter2 from './DateFilterCustomer';

const InfoPanelCustomer = ({ setSelectedDate }) => {
  const [selectedDate, setSelectedDateState] = useState('Recientes');

  const handleDateChange = (date) => {
    setSelectedDateState(date);
    setSelectedDate(date); // Propaga el cambio al componente padre
  };

  return (
    <div className='flex overflow-x-auto space-x-2 items-center text-white'>
      <DateFilter2
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
      />
    </div>
  );
};

export default InfoPanelCustomer;
