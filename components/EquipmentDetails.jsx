import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Source_Sans_3 } from 'next/font/google'
import { fetchEquimentById } from '../pages/api/api'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const EquipmentDetails = ({ initialData }) => {
  const { register, handleSubmit, setValue } = useForm()
  const [formData, setFormData] = useState(initialData)

  useEffect(() => {
    console.log('initialData recibido:', initialData) // Verificar los datos iniciales
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key])
      })
    }
  }, [initialData, setValue])

  const onSubmit = async (data) => {
    try {
      await fetchEquimentById(initialData._id, data)
      console.log('Datos actualizados:', data)
    } catch (error) {
      console.error('Error actualizando los datos:', error)
    }
  }

  return (
    <div
      className={`${sourceSans3.className} mx-3 mt-4 min-h-[40rem] max-w-[30rem] rounded-lg bg-white px-3 pt-5 shadow-lg lg:ml-4 lg:mt-5`}
    >
      {/* Imagen */}
      <Image
        src='/airConditioning.jpg'
        alt='Air Conditioning'
        width={200}
        height={200}
        className='mx-auto mb-2 rounded-lg'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='max-h-[25rem] overflow-y-auto'>
          <div className='ml-2 space-y-6'>
            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='nombreEquipo'
              >
                Nombre del equipo
              </label>
              <input
                {...register('equipmentName', { required: true })}
                className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='equipmentName'
                type='text'
                placeholder='Nombre del equipo'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='modelo'
              >
                Modelo
              </label>
              <input
                {...register('model', { required: true })}
                className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='model'
                type='text'
                placeholder='Modelo del equipo'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='numeroSerie'
              >
                Propietario
              </label>
              <input
                {...register('owner', { required: true })}
                className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='owner'
                type='text'
                placeholder='Propietario del equipo'
              />
            </div>

            <div className='mb-4 mr-52'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='fechaFabricacion'
              >
                Fecha de fabricación
              </label>
              <input
                {...register('manufactureDate', { required: true })}
                className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='manufactureDate'
                type='date'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='marca'
              >
                Marca
              </label>
              <input
                {...register('brand', { required: true })}
                className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='brand'
                type='text'
                placeholder='Marca del equipo'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='ubicacion'
              >
                Ubicación
              </label>
              <input
                {...register('location', { required: true })}
                className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='location'
                type='text'
                placeholder='Ubicación del equipo'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[2px] block text-sm font-semibold text-gray-700'
                htmlFor='tipoUnidad'
              >
                Tipo de unidad
              </label>
              <input
                {...register('unitType', { required: true })}
                className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='unitType'
                type='text'
                placeholder='Tipo de unidad'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EquipmentDetails
