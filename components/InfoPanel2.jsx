import React, { useState, useEffect } from 'react';
import CustomerFilter from './CustomerFilter'; 
import LocationFilter2 from './LocationFilter2'; 
import DateFilter2 from './DateFilter2'; 
import { fetchUserProfile } from '../pages/api/api';

const InfoPanel2 = ({
  owners,
  selectedAssignedTo,
  setSelectedAssignedTo,
  selectedLocations,
  setSelectedLocations,
  locations,
  setMachines // Asegúrate de que setMachines se pase aquí
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const token = window.localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const profileData = await fetchUserProfile();
        setUserRole(profileData.data.role);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfileData();
  }, []);

  return (
    <div className='flex items-center space-x-2 overflow-x-auto text-white'>
      {userRole === 'admin' && (
        <CustomerFilter
          selectedAssignedTo={selectedAssignedTo}
          setSelectedAssignedTo={setSelectedAssignedTo}
          owners={owners} 
        />
      )}
      <DateFilter2
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setMachines={setMachines} // Asegúrate de pasar setMachines a DateFilter2
      />
      <LocationFilter2
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        locations={locations}
      />
    </div>
  );
};

export default InfoPanel2;









