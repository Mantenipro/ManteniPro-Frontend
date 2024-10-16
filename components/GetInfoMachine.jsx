import React, { useState } from 'react';
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

const problemasAire = [
  'No enfría adecuadamente',
  'Hace ruido extraño',
  'No enciende',
];

const problemasPaneles = [
  'No genera energía',
  'Fugas de agua',
  'Panel dañado',
];

export default function GetInfoMachine() {
  const { register, handleSubmit, setValue } = useForm();
  const [tipoEquipo, setTipoEquipo] = useState('');
  const [problemasComunes, setProblemasComunes] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    // Aquí puedes manejar el envío del formulario
  };

  const handleTipoEquipoChange = (event) => {
    const selectedType = event.target.value;
    setTipoEquipo(selectedType);
    setProblemasComunes(selectedType === 'aire' ? problemasAire : problemasPaneles);
  };

  return (
    <form
      className={`${sourceSans3.className} lg:ml-4 lg:mt-5 bg-white shadow-lg rounded-lg mt-4 px-3 mx-3 pt-5 max-w-[90%] md:max-w-[30rem] min-h-[40rem]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        src="/airConditioning.jpg"
        alt="Air Conditioning"
        width={200}
        height={200}
        className="rounded-lg mx-auto mb-2"
      />
      <div className="overflow-y-auto max-h-[25rem]">
        <div className="space-y-6">

          {/* Nueva sección de nombre de usuario y compañía */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-[2px]"
              htmlFor="nombreUsuario"
            >
              Nombre de usuario
            </label>
            <input
              {...register('nombreUsuario')}
              id="nombreUsuario"
              defaultValue="" // Valor inicial
              className="border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-[2px]"
              htmlFor="compania"
            >
              Compañía
            </label>
            <input
              {...register('compania')}
              id="compania"
              defaultValue="" // Valor inicial
              className="border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          {/* Nueva sección de Catálogo de Problemas */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-[2px]"
              htmlFor="tipoEquipo"
            >
              Selecciona el tipo de equipo
            </label>
            <select
              {...register('tipoEquipo')}
              className="border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleTipoEquipoChange}
              id="tipoEquipo"
            >
              <option value="">Selecciona una opción</option>
              <option value="aire">Aire Acondicionado</option>
              <option value="panel">Panel Solar</option>
            </select>
          </div>

          {tipoEquipo && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-[2px]"
                htmlFor="problemas"
              >
                Selecciona un problema
              </label>
              <select
                {...register('problema')}
                className="border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="problemas"
              >
                <option value="">Selecciona un problema</option>
                {problemasComunes.map((problema, index) => (
                  <option key={index} value={problema}>
                    {problema}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-[2px]"
              htmlFor="descripcionProblema"
            >
              Descripción del problema
            </label>
            <textarea
              {...register('descripcionProblema')}
              className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="descripcionProblema"
              rows="4"
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block bg-green-500 text-white font-medium py-2 px-4 rounded-lg cursor-pointer hover:bg-green-600"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}



