import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'; 
import { Source_Sans_3 } from 'next/font/google';
import { toast, Toaster } from 'sonner';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const FormEquipment = ({ initialData }) => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: initialData || {}, 
  });

  const router = useRouter(); 

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data) => {
    const missingFields = [];
    
    if (!data.nombreEquipo) missingFields.push('Nombre del equipo');
    if (!data.modelo) missingFields.push('Modelo');
    if (!data.numeroSerie) missingFields.push('Número de serie');
    if (!data.propietario) missingFields.push('Propietario');
    if (!data.marca) missingFields.push('Marca');
    if (!data.ubicacion) missingFields.push('Ubicación');
    if (!data.tipoUnidad) missingFields.push('Tipo de unidad');

    if (missingFields.length > 0) {
      toast.error(`Faltan campos por llenar: ${missingFields.join(', ')}`, {
        position: 'bottom-right',
        style: {
          fontSize: '16px',
          padding: '10px',
          maxWidth: '90vw', 
          width: 'auto'
        }
      });
      return; 
    }

    console.log(data); 

    if (initialData) {
      router.push('/qrActualizado'); 
    } else {
      router.push('/qrCreado'); 
    }
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`${sourceSans3.className} bg-white shadow-lg rounded-lg px-4 pt-1 w-full max-w-[30rem] min-h-[30rem] flex flex-col`}
      >
        <div className='space-y-4 flex-1'>
          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' 
                htmlFor='nombreEquipo'
              >
                Nombre del equipo
              </label>
              <input
                {...register('nombreEquipo')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='nombreEquipo'
                type='text'
                placeholder='Nombre del equipo'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' 
                htmlFor='modelo'
              >
                Modelo
              </label>
              <input
                {...register('modelo')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='modelo'
                type='text'
                placeholder='Modelo del equipo'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left'
                htmlFor='numeroSerie'
              >
                Número de serie
              </label>
              <input
                {...register('numeroSerie')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='numeroSerie'
                type='text'
                placeholder='Número de serie'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left'
                htmlFor='propietario'
              >
                Propietario
              </label>
              <input
                {...register('propietario')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='propietario'
                type='text'
                placeholder='Propietario del equipo'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left'
                htmlFor='fechaFabricacion'
              >
                Última fecha de mantenimiento
              </label>
              <input
                {...register('fechaFabricacion')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='fechaFabricacion'
                type='date'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left'
                htmlFor='marca'
              >
                Marca
              </label>
              <input
                {...register('marca')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='marca'
                type='text'
                placeholder='Marca del equipo'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left'
                htmlFor='ubicacion'
              >
                Ubicación
              </label>
              <input
                {...register('ubicacion')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='ubicacion'
                type='text'
                placeholder='Ubicación del equipo'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left'
                htmlFor='tipoUnidad'
              >
                Tipo de unidad
              </label>
              <input
                {...register('tipoUnidad')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='tipoUnidad'
                type='text'
                placeholder='Tipo de unidad'
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <label
                className='block text-gray-700 text-sm font-semibold mb-[2px] text-left'
                htmlFor='foto'
              >
                Agregar foto (opcional)
              </label>
              <input
                {...register('foto')}
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='foto'
                type='file'
              />
            </div>
          </div>

          <div className='flex justify-center lg:mt-4 lg:mb-10 mb-14 mt-32'>
            <button
              type='submit'
              className='py-2 px-4 bg-gradient-to-r from-[#21262D] to-[#414B66] text-white font-bold rounded-lg shadow-md hover:from-[#1a1d24] hover:to-[#373f5a] focus:outline-none focus:ring-4 focus:ring-blue-300'
            >
              {initialData ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormEquipment;




















