import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const EquipmentDetails = () => {
  const { register } = useForm();

  return (
    <div className={`${sourceSans3.className} bg-white shadow-lg rounded-lg px-4 pt-4 max-w-[30rem] min-h-[35rem]`} style={{ paddingBottom: '20px' }}>
      {/* Imagen */}
      <Image
        src="/airConditioning.jpg"  
        alt="Air Conditioning"
        width={200} 
        height={200}
        className="rounded-lg mx-auto mb-4"
      />

      <div className="space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[1px]" htmlFor="nombreEquipo">
            Nombre del equipo
          </label>
          <input
            {...register('nombreEquipo')}
            className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="nombreEquipo"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[1px]" htmlFor="modelo">
            Modelo
          </label>
          <input
            {...register('modelo')}
            className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="modelo"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[1px]" htmlFor="numeroSerie">
            Número de serie
          </label>
          <input
            {...register('numeroSerie')}
            className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="numeroSerie"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[1px]" htmlFor="fechaFabricacion">
            Fecha de fabricación
          </label>
          <input
            {...register('fechaFabricacion')}
            className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="fechaFabricacion"
            type="date"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[1px]" htmlFor="marca">
            Marca
          </label>
          <input
            {...register('marca')}
            className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="marca"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[1px]" htmlFor="ubicacion">
            Ubicación
          </label>
          <input
            {...register('ubicacion')}
            className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="ubicacion"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="tipoUnidad">
            Tipo de unidad
          </label>
          <input
            {...register('tipoUnidad')}
            className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="tipoUnidad"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;



