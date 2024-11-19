import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';
import { getAllUsers } from '@/api/api'; // Asegúrate de tener esta función para obtener usuarios

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const EquipmentDetails = ({ equipment }) => {
  const { register } = useForm();
  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    async function fetchOwnerName() {
      const token = localStorage.getItem("token");
      const ownerId = equipment.owner;

      if (token && ownerId) {
        try {
          const users = await getAllUsers(token);
          const owner = users.find(user => user._id === ownerId);

          if (owner) {
            setOwnerName(owner.name); // Asigna el nombre del propietario
          } else {
            console.error('No se encontró el propietario con el ID proporcionado.');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    }

    fetchOwnerName();
  }, [equipment.owner]);

  return (
    <div
  className={`${sourceSans3.className} lg:ml-4 lg:mt-5 bg-white shadow-lg rounded-lg mt-4 px-3 mx-3 pt-5 max-w-[30rem] md:min-h-[40vh] min-h-[80vh] `}
>
      {/* Imagen */}
      <Image
        src={equipment.image || '/noimg3.jpg'}
        alt={equipment.equipmentName || 'Air Conditioning'}
        width={200}
        height={200}
        className='rounded-lg mx-auto mb-2'
      />
      <div className='overflow-y-auto md:max-h-[25rem] max-h-[30rem]'>
        <div className='space-y-6 ml-2'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='nombreEquipo'>
              Nombre del equipo
            </label>
            <input
              {...register('nombreEquipo')}
              defaultValue={equipment.equipmentName}
              readOnly
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
              readOnly
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='modelo'
              type='text'
            />
          </div>

          {/* Mostrar el propietario como texto sin editar */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='propietario'>
              Propietario
            </label>
            <input
              {...register('propietario')}
              value={ownerName} // Mostrar el nombre del propietario
              readOnly
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='propietario'
              type='text'
            />
          </div>

          <div className='mb-4 mr-52'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='fechaFabricacion'>
              Última fecha de mantenimiento
            </label>
            <input
              {...register('fechaFabricacion')}
              defaultValue={equipment.manufactureDate?.slice(0, 10)}
              readOnly
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
              readOnly
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
              readOnly
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
              readOnly
              className='appearance-none border mb-10 border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='tipoUnidad'
              type='text'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
