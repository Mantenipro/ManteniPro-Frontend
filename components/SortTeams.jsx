import React, { useState } from 'react'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const SortTeams = ({ sortCriteria, setSortCriteria }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const selectSortOrder = (order) => {
    setSortCriteria(order)
    setShowDropdown(false)
  }

  return (
    <div
      className={`relative flex w-full max-w-xs items-center justify-between rounded-lg bg-gradient-to-r from-[#21262D] to-[#414B66] px-4 py-1 md:max-w-sm ${sourceSans3.className}`}
    >
      <span className='text-white'>Ordenar por:</span>
      <button
        onClick={toggleDropdown}
        className='relative flex items-center rounded-lg bg-gray-700 px-3 py-1 text-white'
      >
        {sortCriteria}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='ml-2 h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {showDropdown && (
        <ul className='absolute right-0 top-10 w-48 rounded-lg bg-white text-black shadow-lg'>
          <li
            onClick={() => selectSortOrder('Antiguo a reciente')}
            className='cursor-pointer px-4 py-2 hover:bg-gray-200'
          >
            Antiguo a reciente
          </li>
          <li
            onClick={() => selectSortOrder('Reciente a antiguo')}
            className='cursor-pointer px-4 py-2 hover:bg-gray-200'
          >
            Reciente a antiguo
          </li>
          <li
            onClick={() => selectSortOrder('A a la Z')}
            className='cursor-pointer px-4 py-2 hover:bg-gray-200'
          >
            A a la Z
          </li>
          <li
            onClick={() => selectSortOrder('Z a la A')}
            className='cursor-pointer px-4 py-2 hover:bg-gray-200'
          >
            Z a la A
          </li>
        </ul>
      )}
    </div>
  )
}

export default SortTeams
