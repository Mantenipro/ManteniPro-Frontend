/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const UserDetails = () => {
  const { register } = useForm()

  return (
    <div
      className={`${sourceSans3.className}  bg-white shadow-lg rounded-lg px-4 pt-4 w-full max-w-[40rem] min-h-[35rem] mt-5`}
    >
      <Image
        src='/profile.jpg'
        alt='profile'
        width={200}
        height={200}
        className='rounded-full mx-auto mb-2 w-48 h-48 object-cover'
      />

      <div className='space-y-6'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='idUsuario'
          >
            Id
          </label>
          <div className='relative'>
            <img
              src='/ID.svg'
              alt=''
              className='absolute left-3 top-1/2 transform -translate-y-1/2'
            />
            <input
              {...register('id')}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='id'
              type='text'
            />
          </div>
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[2px]'
            htmlFor='NombreCompleto'
          >
            Nombre Completo
          </label>
          <div className='relative'>
            <img
              src='/iconuser.svg'
              alt=''
              className='absolute left-3 top-1/2 transform -translate-y-1/2'
            />
            <input
              {...register('name')}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='name'
              type='text'
            />
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='email'
          >
            Correo Electronico
          </label>
          <div className='relative'>
            <img
              src='/iconemail.svg'
              alt=''
              className='absolute left-3 top-1/2 transform -translate-y-1/2'
            />
            <input
              {...register('email')}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='email'
              type='email'
            />
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[1px]'
            htmlFor='contraseña'
          >
            Contraseña
          </label>
          <div className='relative'>
            <img
              src='/iconpassword.svg'
              alt=''
              className='absolute left-3 top-1/2 transform -translate-y-1/2'
            />
            <input
              {...register('contraseña')}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='contraseña'
              type='password'
            />
          </div>
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
