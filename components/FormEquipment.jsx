import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { createEquipment } from '@/api/api';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function FormEquipment() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();

  async function onSubmit(data) {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Llama a createEquipment con los datos ingresados en el formulario
        await createEquipment(
          data.equipmentName,
          data.model,
          null, 
          data.owner,
          data.manufactureDate,
          data.brand,
          data.location,
          data.unitType,
          data.image || null, 
          null, 
          token
        );
        router.push("/inventarioEquipos"); 
      } catch (error) {
        console.error("Error creating equipment:", error);
      }
    } else {
      console.error("Token not found");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${sourceSans3.className} bg-white shadow-lg rounded-lg px-4 pt-1 w-full max-w-[30rem] min-h-[30rem] flex flex-col`}
    >
      <div className='space-y-4 flex-1'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='equipmentName'>
            Nombre del equipo
          </label>
          <input
            {...register('equipmentName', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='equipmentName'
            type='text'
            placeholder='Nombre del equipo'
          />
          {errors.equipmentName && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='model'>
            Modelo
          </label>
          <input
            {...register('model', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='model'
            type='text'
            placeholder='Modelo del equipo'
          />
          {errors.model && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='owner'>
            Propietario
          </label>
          <input
            {...register('owner', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='owner'
            type='text'
            placeholder='Propietario del equipo'
          />
          {errors.owner && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='manufactureDate'>
            Fecha de fabricación
          </label>
          <input
            {...register('manufactureDate', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='manufactureDate'
            type='date'
          />
          {errors.manufactureDate && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='brand'>
            Marca
          </label>
          <input
            {...register('brand', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='brand'
            type='text'
            placeholder='Marca del equipo'
          />
          {errors.brand && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='location'>
            Ubicación
          </label>
          <input
            {...register('location', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='location'
            type='text'
            placeholder='Ubicación del equipo'
          />
          {errors.location && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='unitType'>
            Tipo de unidad
          </label>
          <input
            {...register('unitType', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='unitType'
            type='text'
            placeholder='Tipo de unidad'
          />
          {errors.unitType && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='image'>
            Agregar URL de foto (opcional)
          </label>
          <input
            {...register('image')}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='image'
            type='text'
            placeholder='Ingresa la URL de la imagen'
          />
        </div>

        <div className='flex justify-center lg:mt-4 lg:mb-10 mb-14 mt-32'>
          <button
            type='submit'
            className='py-2 px-4 bg-gradient-to-r from-[#21262D] to-[#414B66] text-white font-bold rounded-lg shadow-md hover:from-[#1a1d24] hover:to-[#373f5a] focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            Agregar
          </button>
        </div>
      </div>
    </form>
  );
}

































