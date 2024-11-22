import React, { useState, useEffect } from 'react';
import AssignedToFilter from './AssignedToFilter'; 
import LocationFilter from './LocationFilter'; 
import PriorityFilter from './PriorityFilter'; 
import DateFilter from './DateFilter'; 
import { fetchUserProfile } from '../pages/api/api'

const InfoPanel = () => {
  const [selectedAssignedTo, setSelectedAssignedTo] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    // Función para obtener el perfil del usuario
    const fetchUserProfileData = async () => {
      try {
        const token = window.localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        const profileData = await fetchUserProfile()
        setUserRole(profileData.data.role)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }

        fetchUserProfileData()
  }, []);

  return (
    <div className='flex items-center space-x-2 overflow-x-auto text-white'>
      {userRole === 'admin' && (
        <>
          {/* Filtro de Asignado a */}
          <AssignedToFilter
            selectedAssignedTo={selectedAssignedTo}
            setSelectedAssignedTo={setSelectedAssignedTo}
          />

          {/* Filtro de Prioridad */}
          <PriorityFilter
            selectedPriorities={selectedPriorities}
            setSelectedPriorities={setSelectedPriorities}
          />
        </>
      )}

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

export default InfoPanel;







































































































































































































