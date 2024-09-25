/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const FormUser = ({ initialData }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData || {}
  })

  const router = useRouter()

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key])
      })
    }
  }, [initialData, setValue])

  const handleFormSubmit = (data) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${sourceSans3.className} bg-white shadow-lg rounded-lg px-4 pt-4 w-full max-w-[71rem] min-h-[38rem] flex flex-col`}
    >
      <div className='space-y-4 flex-1'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[2px]'
            htmlFor='Nombre completo'
          >
            Nombre Completo
          </label>
          <div className='w-full lg:w-1/2'>
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
                placeholder='Juanito Perez Gonzalez'
              />
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[2px]'
            htmlFor='Correo Electrónico'
          >
            Correo Electrónico
          </label>
          <div className='w-full lg:w-1/2'>
            <div className='relative'>
              <img
                src='/iconemail.svg'
                alt=''
                className='absolute left-3 top-1/2 transform -translate-y-1/2'
              />
              <input
                {...register('email')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='email'
                type='email'
                placeholder='nombre@dominio.com'
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[2px]'
            htmlFor='Contraseña'
          >
            Contraseña
          </label>
          <div className='w-full lg:w-1/2'>
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
                placeholder='********'
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[2px]'
            htmlFor='Cargo'
          >
            Cargo
          </label>
          <div className='w-full lg:w-1/2'>
            <select
              {...register('cargo')}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs lg:text-sm'
              id='cargo'
            >
              <option value=''>Seleccione un tipo</option>
              <option value='IngMec'>Ingeniero Mecánico</option>
              <option value='IngElec'>Ingeniero Electrico</option>
              <option value='IngCiv'>Ingeniero Civil</option>
              <option value='Otro'>Otro</option>
            </select>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[8px]'
            htmlFor='permisos'
          >
            Permisos
          </label>
          <div className='w-full lg:w-1/2 flex space-x-2'>
            <div className='border border-gray-300 rounded-lg p-2 flex items-center'>
              <input
                {...register('permisos')}
                className='appearance-none border border-gray-300 rounded-full h-4 w-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='permiso-user'
                type='radio'
                value='user'
              />
              <label htmlFor='permiso-user' className='ml-2 text-gray-700'>
                User
              </label>
            </div>
            <div className='border border-gray-300 rounded-lg p-2 flex items-center'>
              <input
                {...register('permisos')}
                className='appearance-none border border-gray-300 rounded-full h-4 w-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='permiso-admin'
                type='radio'
                value='admin'
              />
              <label htmlFor='permiso-admin' className='ml-2 text-gray-700'>
                Admin
              </label>
            </div>
            <div className='border border-gray-300 rounded-lg p-2 flex items-center'>
              <input
                {...register('permisos')}
                className='appearance-none border border-gray-300 rounded-full h-4 w-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='permiso-tecnico'
                type='radio'
                value='tecnico'
              />
              <label htmlFor='permiso-tecnico' className='ml-2 text-gray-700'>
                Técnico
              </label>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-semibold mb-[2px]'
            htmlFor='foto'
          >
            Agregar foto (opcional)
          </label>
          <div className='w-full lg:w-1/2'>
            <input
              {...register('foto')}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='foto'
              type='file'
            />
          </div>
        </div>
      </div>

      <div className='flex justify-end lg:mt-4 lg:mb-10 lg:mr-10 mb-14'>
        <button
          type='submit'
          className='py-3 px-6 lg:py-1 lg:px-12 bg-gradient-to-r from-[#21262D] to-[#414B66] text-white text-lg font-bold rounded-lg shadow-md hover:from-[#1a1d24] hover:to-[#373f5a] focus:outline-none focus:ring-4 focus:ring-blue-300'
        >
          {initialData ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}

export default FormUser
