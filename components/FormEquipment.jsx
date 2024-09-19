import React from 'react';
import { useForm } from 'react-hook-form';

const FormEquipment = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg px-4 pt-4 max-w-md">
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="nombreEquipo">
            Nombre del equipo
          </label>
          <input {...register('nombreEquipo')} className="border border-gray-300 rounded-lg w-full py-1 px-4" id="nombreEquipo" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="modelo">
            Modelo
          </label>
          <input {...register('modelo')} className="border border-gray-300 rounded-lg w-full py-1 px-4" id="modelo" type="text" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="numeroSerie">
            Número de serie
          </label>
          <input {...register('numeroSerie')} className="border border-gray-300 rounded-lg w-full py-1 px-4" id="numeroSerie" type="text" />
        </div>
      </div>

      <div className="flex justify-center mt-6 pb-2">
        <button type="submit" className="py-3 px-6 bg-gray-700 text-white font-bold rounded-lg shadow-md">
          Agregar
        </button>
      </div>
    </form>
  );
};

export default FormEquipment;







