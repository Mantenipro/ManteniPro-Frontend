import React, { useState, useEffect } from 'react';
import CustomerFilter from './CustomerFilter'; 
import LocationFilter2 from './LocationFilter2'; 
import DateFilter2 from './DateFilter2'; 
import { fetchUserProfile } from '../pages/api/api'

const InfoPanel2 = () => {
  const [selectedAssignedTo, setSelectedAssignedTo] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
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
        />
      )}

      {/* Filtro de Fecha */}
      <DateFilter2
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Filtro de Localización */}
      <LocationFilter2
        selectedLocations={location}
        setSelectedLocations={setLocation}
      />
    </div>
  );
};

export default InfoPanel2;
