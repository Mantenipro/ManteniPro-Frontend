import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/api/api';

export default function PropietarioSelect({ register, setValue }) {
  const [userList, setUserList] = useState([]);

  async function fetchUsers() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
  
    if (token && email) {
      try {
        const users = await getAllUsers(token);
  
        const currentUser = users.find(user => user.email === email);
        const company = currentUser ? currentUser.company : null;
  
        if (company) {
          const filteredUsers = users.filter(
            user => user.company === company && user.role === "usuario"
          );
          setUserList(filteredUsers);
        } else {
          console.error("No se encontró la compañía del usuario.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (event) => {
    setValue('owner', event.target.value);
  };

  return (
    <div className='mb-4 relative'>
      <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='owner'>
        Propietario
      </label>
      <select
        {...register('owner', { required: true })}
        className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
        id='owner'
        onChange={handleUserSelect}
      >
        <option value="">Seleccione un propietario</option>
        {userList.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
