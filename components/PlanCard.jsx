import React from 'react'
import { FaCheck } from 'react-icons/fa'

const ProductCard = ({ product, onSelect }) => {
  return (
    <div className='mb-4 w-full max-w-md bg-white p-6 shadow-md hover:scale-105 hover:shadow-xl md:w-1/2'>
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
          <FaCheck className='mr-2 text-green-500' />
          <span className='text-gray-700'>{product.description}</span>
        </li>
      </ul>
      <button
        onClick={onSelect}
        className='w-full bg-blue-600 px-4 py-3 text-white hover:bg-blue-700'
      >
        Seleccionar Producto
      </button>
    </div>
  )
}

export default ProductCard
