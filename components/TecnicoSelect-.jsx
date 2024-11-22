import React, { useState, useEffect } from 'react'
import { getAllUsers } from '@/api/api'

export default function TecnicoSelect({ register, setValue }) {
  const [tecnicoList, setTecnicoList] = useState([])

  async function fetchUsers() {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')

    if (token && email) {
      try {
        const users = await getAllUsers(token)

        const currentUser = users.find((user) => user.email === email)
        const company = currentUser ? currentUser.company : null

        if (company) {
          const filteredUsers = users.filter(
            (user) => user.company === company && user.role === 'tecnico'
          )
          setTecnicoList(filteredUsers)
        } else {
          console.error('No se encontró la compañía del usuario.')
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUserSelect = (event) => {
    setValue('assignTo', event.target.value)
  }

  return (
    <div className='relative mb-4'>
      <label
        className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
        htmlFor='owner'
      >
      </label>
      <select
        {...register('assignTo', { required: true })}
        className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        id='owner'
        onChange={handleUserSelect}
      >
        <option value=''>Seleccione un tecnico</option>
        {tecnicoList.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  )
}
