import React from 'react'
import { FaCheck } from 'react-icons/fa'

const ProductCard = ({ product, onSelect }) => {
  return (
    <div className='mx-6 mb-4 w-full max-w-lg bg-white p-8 shadow-md hover:scale-105 hover:shadow-xl md:w-3/4'>
      <h2 className='mb-4 text-2xl font-semibold text-blue-600'>
        {product.name}
      </h2>
      <p className='mb-6 text-3xl font-bold text-gray-800'>
        {product.prices[0].unit_amount / 100}{' '}
        {product.prices[0].currency.toUpperCase()} /{' '}
        {product.prices[0].recurring.interval}
      </p>
      <ul className='mb-6 space-y-2'>
        <li className='flex items-center'>
          <FaCheck className='mr-2 h-10 w-10 text-green-500' />
          <span className='text-gray-700'>{product.description}</span>
        </li>
      </ul>
      <div className='flex justify-center'>
        <button
          onClick={onSelect}
          className='w-3/4 bg-gradient-to-r from-[#21262D] to-[#414B66] px-4 py-3 text-white hover:from-[#333d55] hover:to-[#314ca3]'
        >
          Seleccionar Producto
        </button>
      </div>
    </div>
  )
}

export default ProductCard
