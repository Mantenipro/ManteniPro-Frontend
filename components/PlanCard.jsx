import React from 'react'
import { FaCheck } from 'react-icons/fa'

const PlanCard = ({ plan, onSelect }) => {
  return (
    <div className='mb-4 w-full max-w-md bg-white p-6 shadow-md hover:scale-105 hover:shadow-xl md:w-1/2'>
      <h2 className='mb-4 text-2xl font-semibold text-blue-600'>{plan.name}</h2>
      <p className='mb-6 text-3xl font-bold text-gray-800'>
        {plan.price} <span className='text-sm text-gray-600'>/mes</span>
      </p>
      <ul className='mb-6 space-y-2'>
        {plan.features.map((feature, index) => (
          <li key={index} className='flex items-center'>
            <FaCheck className='mr-2 text-green-500' />
            <span className='text-gray-700'>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className='w-full bg-blue-600 px-4 py-3 text-white hover:bg-blue-700'
      >
        Seleccionar Plan
      </button>
    </div>
  )
}

export default PlanCard
