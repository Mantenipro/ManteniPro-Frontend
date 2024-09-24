import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const UserDetails = () => {
  const { register } = useForm()

  return (
    <div
      className={`${sourceSans3.className} ml-4 bg-white shadow-lg rounded-lg px-4 pt-4 max-w-[30rem] min-h-[35rem]`}
      style={{ paddingBottom: '20px' }}
    >
      {/* Imagen */}
      <Image
        src='/airConditioning.jpg'
        alt='Air Conditioning'
        width={200}
        height={200}
        className='rounded-lg mx-auto mb-2'
      />

      <div className='space-y-6 ml-2'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='nombreEquipo'
          >
            id
          </label>
          <input
            {...register('id')}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='id'
            type='text'
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='NombreCompleto'
          >
            Nombre Completo
          </label>
          <input
            {...register('name')}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='name'
            type='text'
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='email'
          >
            Correo Electronico
          </label>
          <input
            {...register('email')}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='email'
            type='email'
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='contraseña'
          >
            contraseña
          </label>
          <input
            {...register('contraseña')}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='contraseña'
            type='password'
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='verificado'
          >
            Verificado
          </label>
          <input
            {...register('verificado')}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='verificado'
            type='checkbox'
          />
        </div>
      </div>
    </div>
  )
}

export default UserDetails
