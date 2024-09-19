import React from 'react';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const FormEquipment = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
      className={`${sourceSans3.className} bg-none rounded-lg px-4 pt-4 max-w-[34rem]`}>

      <div className="space-y-4">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="nombreEquipo">
            Nombre del equipo
          </label>
          <input {...register('nombreEquipo')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="nombreEquipo" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="modelo">
            Modelo
          </label>
          <input {...register('modelo')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="modelo" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="numeroSerie">
            Número de serie
          </label>
          <input {...register('numeroSerie')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="numeroSerie" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="fechaFabricacion">
            Fecha de fabricación
          </label>
          <input {...register('fechaFabricacion')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="fechaFabricacion" type="date" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="marca">
            Marca
          </label>
          <input {...register('marca')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="marca" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="ubicacion">
            Ubicación
          </label>
          <input {...register('ubicacion')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="ubicacion" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="tipoUnidad">
            Tipo de unidad
          </label>
          <input {...register('tipoUnidad')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="tipoUnidad" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-[2px]" htmlFor="foto">
            Agregar foto (opcional)
          </label>
          <input {...register('foto')} className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="foto" type="file" />
        </div>
      </div>

      <div className="flex justify-center mt-6 pb-1">
        <button type="submit" className="py-3 px-6 bg-gradient-to-r from-[#21262D] to-[#414B66] text-white font-bold rounded-lg shadow-md hover:from-[#1a1d24] hover:to-[#373f5a] focus:outline-none focus:ring-4 focus:ring-blue-300">
          Agregar
        </button>
      </div>
    </form>
  );
};

export default FormEquipment;










