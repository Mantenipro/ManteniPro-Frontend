import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const UserDetails = () => {
  const { register } = useForm()

  return (
    <div
      className={`${sourceSans3.className} ml-4 bg-white shadow-lg rounded-lg px-4 pt-4 w-full max-w-[40rem] min-h-[35rem] mx-auto`}
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
            ID
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
            Contraseña
          </label>
          <input
            {...register('contraseña')}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='contraseña'
            type='password'
          />
        </div>

        <div className='mb-4 flex items-center'>
          <input
            {...register('verificado')}
            className='form-checkbox h-5 w-5 text-blue-600'
            id='verificado'
            type='checkbox'
          />
          <label
            className='ml-2 text-gray-700 text-sm font-semibold'
            htmlFor='verificado'
          >
            Verificado
          </label>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
