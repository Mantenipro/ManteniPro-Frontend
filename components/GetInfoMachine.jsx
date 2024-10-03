import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const inputsInfoMachine = [
  {
    label: 'Nombre del equipo',
    value: 'Aire acondicionado 3000',
  },
  {
    label: 'Modelo',
    value: '3000',
  },
  {
    label: 'Número de serie',
    value: 'CLX34DS23',
  },
  {
    label: 'Fecha de fabricación',
    value: '20-12-2013',
  },
  {
    label: 'Marca',
    value: 'Aire',
  },
  {
    label: 'Ubicación',
    value: '3er piso Ventas',
  },
  {
    label: 'Tipo de unidad',
    value: 'Aire acondicionado',
  },
];

export default function GetInfoMachine() {
  const { register } = useForm();

  return (
    <div
      className={`${sourceSans3.className} lg:ml-4 lg:mt-5 bg-white shadow-lg rounded-lg mt-4 px-3 mx-3 pt-5 max-w-[30rem] min-h-[40rem]`}
    >

      <Image
        src="/airConditioning.jpg"
        alt="Air Conditioning"
        width={200}
        height={200}
        className="rounded-lg mx-auto mb-2"
      />
      <div className="overflow-y-auto max-h-[25rem]">
        <div className="space-y-6 ml-2">
          {inputsInfoMachine.map((input, index) => (
            <div key={index}>
              <label
                className="block text-gray-700 text-sm font-semibold mb-[2px]"
                htmlFor={input.label}
              >
                {input.label}
              </label>
              <div className="border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight">
                <p className="text-gray-700 text-sm font-semibold">
                  {input.value}
                </p>
              </div>
            </div>
          ))}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-[2px]"
              htmlFor="tipoUnidad"
            >
              Descripción del problema
            </label>
            <textarea
              {...register('tipoUnidad')}
              className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="tipoUnidad"
              type="textarea"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-[2px]"
              htmlFor="foto"
            >
              Foto (opcional)
            </label>

            <input
              {...register('foto')}
              id="foto"
              type="file"
              className="hidden" 
            />

            <label
              htmlFor="foto"
              className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Subir archivo
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}