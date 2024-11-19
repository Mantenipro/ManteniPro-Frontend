/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaHardHat } from 'react-icons/fa'

function TicketCard({ report }) {
    const router = useRouter()
  const {
    title,
    description,
    user,
    created_at,
    priority,
    status,
    _id: ticketId,
    assignedTo
  } = report
  const [isHovered, setIsHovered] = useState(false);


  const handleEditClick = (e) => {
    e.stopPropagation()
    console.log('Edit button clicked', { ticketId });
    router.push({
      pathname: '/StatusDetail',
      query: { ticketId }
    })
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  return (
    <button
      className={`mb-1 rounded-lg p-2 shadow-md transition-all duration-200 ${isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66]' : 'bg-white'} relative w-full sm:w-auto sm:p-1 sm:text-xs md:mb-3 md:w-auto md:rounded-xl md:p-3 lg:w-auto md:shadow-lg xl:w-[350px] xl:min-w-[350px] 2xl:w-auto`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        minHeight: '15vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      onClick={handleEditClick}
    >
      <div className='absolute left-2 top-2'>
        <span
          className={`rounded-full px-1 py-0.5 text-xs ${
            priority === 'Alta'
              ? 'bg-red-100 text-red-500'
              : priority === 'Media'
                ? 'bg-yellow-100 text-yellow-500'
                : priority === 'Baja'
                  ? 'bg-green-100 text-green-500'
                  : 'bg-gray-100 text-gray-500'
          }`}
        >
          {capitalizeFirstLetter(priority)}
        </span>
      </div>
      <div className='absolute right-2 top-2'>
        <span
          className={`text-xs ${isHovered ? 'text-white' : 'text-gray-400'}`}
        >
          {new Date(created_at).toLocaleDateString()}
        </span>
      </div>

      <div className='mt-6'>
        <h3
          className={`mb-1 text-xs font-semibold md:text-sm ${isHovered ? 'text-white' : 'text-gray-900'}`}
        >
          {title}
        </h3>
        <p
          className={`mb-1 text-xs md:text-sm ${isHovered ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {description.length > 60
            ? `${description.slice(0, 60)}...`
            : description}
        </p>
      </div>

      <div className='mt-2 flex items-center justify-between'>
      <div className='flex items-center'>
  {user && (
    <>
      <img
        src={user.photo || '/profilepic3.png'} 
        alt={user.name}
        className='mr-1 h-5 w-5 rounded-full'
      />
      <span
        className={`text-xs md:text-sm ${isHovered ? 'text-gray-300' : 'text-gray-700'}`}
      >
        {user.name}
      </span>
    </>
  )}
</div>
        <div className='buttom-2 absolute right-2 flex items-center'>
              <div className='mr-1 flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                <FaHardHat className='h-5 w-5' />
              </div>
              <span
                className={`text-xs md:text-sm ${isHovered ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {assignedTo ? assignedTo.name : 'Sin asignar'}
              </span>
        </div>
      </div>
    </button>
  )
}

export default TicketCard;





















