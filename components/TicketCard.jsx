import React, { useState } from 'react';
import Link from 'next/link';

function TicketCard({ report }) {
  const { title, description, userName, created_at, priority, status, _id: ticketId } = report;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/StatusDetail/${ticketId}`}>
      <button
        className={`mb-1 rounded-lg p-2 shadow-md transition-all duration-200 
          ${isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66]' : 'bg-white'} 
          w-full sm:w-[200px] md:w-[250px] lg:w-[50vh] 
          sm:p-1 sm:text-xs
          md:mb-3 md:rounded-xl md:p-3 md:shadow-lg relative`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          minHeight: '15vh', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div className='absolute top-2 left-2'>
          <span 
            className={`rounded-full px-1 py-0.5 text-xs ${priority === 'Alta' ? 'text-red-500 bg-red-100' :
              priority === 'Media' ? 'text-yellow-500 bg-yellow-100' :
              priority === 'Baja' ? 'text-green-500 bg-green-100' :
              'text-gray-500 bg-gray-100'}`}
          >
            {priority}
          </span>
        </div>
        <div className='absolute top-2 right-2'>
          <span className={`text-xs ${isHovered ? 'text-white' : 'text-gray-400'}`}>
            {new Date(created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-6">
          <h3 className={`mb-1 text-xs md:text-sm font-semibold ${isHovered ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`mb-1 text-xs md:text-sm ${isHovered ? 'text-gray-300' : 'text-gray-600'}`}>
            {description.length > 60 ? `${description.slice(0, 60)}...` : description}
          </p>
        </div>

        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center'>
            <img
              src='/profile1.jpg'
              alt={userName}
              className='mr-1 h-5 w-5 rounded-full'
            />
            <span className={`text-xs md:text-sm ${isHovered ? 'text-gray-300' : 'text-gray-700'}`}>
              {userName}
            </span>
          </div>
          <span className={`text-xs md:text-sm ${isHovered ? 'text-gray-300' : 'text-gray-500'}`}>
            {ticketId}
          </span>
        </div>
      </button>
    </Link>
  );
}

export default TicketCard;





















