import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';
import { useRouter } from 'next/router'; 
import { editEquipment } from '../api/api'; 

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const EquipmentDetails2 = ({ equipment }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter(); 

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      try {
        
        const updatedData = {
          equipmentName: data.nombreEquipo,
          model: data.modelo,
          owner: data.propietario,
          manufactureDate: data.fechaFabricacion,
          brand: data.marca,
          location: data.ubicacion,
          unitType: data.tipoUnidad,
          
        };

        await editEquipment(equipment._id, updatedData, token);
        console.log("Equipo actualizado exitosamente.");
        
        
        router.push('/inventarioEquipos');
      } catch (error) {
        console.error("Error al actualizar el equipo:", error);
        setError("Hubo un error al actualizar el equipo. Por favor intenta nuevamente.");
      }
    } else {
      console.error("Token o email no encontrados en localStorage.");
      setError("No se pudo autenticar. Por favor inicia sesión nuevamente.");
    }
  };

  return (
    <div className={`${sourceSans3.className} lg:ml-4 lg:mt-5 bg-white shadow-lg rounded-lg mt-4 px-3 mx-3 pt-5 max-w-[30rem] min-h-[40rem]`}>
      {/* Imagen */}
      <Image
        src={equipment.image || '/airConditioning.jpg'}
        alt={equipment.equipmentName || 'Air Conditioning'}
        width={200}
        height={200}
        className='rounded-lg mx-auto mb-2'
      />
      <form onSubmit={handleSubmit(onSubmit)} className='overflow-y-auto max-h-[25rem]'>
        <div className='space-y-6 ml-2'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='nombreEquipo'>
              Nombre del equipo
            </label>
            <input
              {...register('nombreEquipo')}
              defaultValue={equipment.equipmentName}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='nombreEquipo'
              type='text'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='modelo'>
              Modelo
            </label>
            <input
              {...register('modelo')}
              defaultValue={equipment.model}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='modelo'
              type='text'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='propietario'>
              Propietario
            </label>
            <input
              {...register('propietario')}
              defaultValue={equipment.owner}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='propietario'
              type='text'
            />
          </div>

          <div className='mb-4 mr-52'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='fechaFabricacion'>
              Fecha de fabricación
            </label>
            <input
              {...register('fechaFabricacion')}
              defaultValue={equipment.manufactureDate?.slice(0, 10)}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='fechaFabricacion'
              type='date'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='marca'>
              Marca
            </label>
            <input
              {...register('marca')}
              defaultValue={equipment.brand}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='marca'
              type='text'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='ubicacion'>
              Ubicación
            </label>
            <input
              {...register('ubicacion')}
              defaultValue={equipment.location}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='ubicacion'
              type='text'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='tipoUnidad'>
              Tipo de unidad
            </label>
            <input
              {...register('tipoUnidad')}
              defaultValue={equipment.unitType}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='tipoUnidad'
              type='text'
            />
          </div>

          {/* Botón de actualización */}
          <div className='mb-4'>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Actualizar
            </button>
          </div>

          {/* Mostrar error si existe */}
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default EquipmentDetails2;



