import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';
import { useRouter } from 'next/router'; 
import { editEquipment } from '../api/api';
import imageCompression from 'browser-image-compression'; // Importa la biblioteca de compresión de imágenes

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const EquipmentDetails2 = ({ equipment }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(equipment.image || '/airConditioning.jpg'); // Estado para la imagen seleccionada
  const [compressedImage, setCompressedImage] = useState(null); // Estado para la imagen comprimida
  const router = useRouter(); 

  // Función para manejar el cambio de imagen y comprimirla
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Configuración para la compresión de imagen
        const options = {
          maxSizeMB: 0.2, // Tamaño máximo de la imagen en MB
          maxWidthOrHeight: 500, // Tamaño máximo en px
          useWebWorker: true,
        };

        // Comprimir imagen
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        
        reader.onloadend = () => {
          setImagePreview(reader.result); // Actualizar la vista previa de la imagen
          setCompressedImage(compressedFile); // Almacenar la imagen comprimida para enviar
        };
        reader.readAsDataURL(compressedFile); // Leer la imagen comprimida
      } catch (err) {
        console.error("Error al comprimir la imagen:", err);
        setError("Hubo un problema al procesar la imagen.");
      }
    }
  };

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      try {
        // Crear los datos actualizados con la imagen comprimida
        const updatedData = {
          equipmentName: data.nombreEquipo,
          model: data.modelo,
          owner: data.propietario,
          manufactureDate: data.fechaFabricacion,
          brand: data.marca,
          location: data.ubicacion,
          unitType: data.tipoUnidad,
          image: compressedImage ? await imageCompression.getDataUrlFromFile(compressedImage) : imagePreview, // Usar la imagen comprimida si está disponible
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
      {/* Imagen con opción de cargar nueva */}
      <div className="relative w-52 h-52 mx-auto mb-2">
        <Image
          src={imagePreview}
          alt={equipment.equipmentName || 'Air Conditioning'}
          width={200}
          height={200}
          className='object-cover w-full h-full rounded-lg' // Asegurar que la imagen mantenga su tamaño en el componente
        />
       <label className="absolute bottom-2 right-2 bg-gradient-to-r from-[#21262D] to-[#414B66] p-2 rounded-full cursor-pointer hover:from-[#1a1d22] hover:to-[#353c54] transition-colors duration-300"
       >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Image src="/icon/camera-icon.png" alt="Camera icon" width={20} height={20} />
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='overflow-y-auto max-h-[25rem]'>
        <div className='space-y-6 ml-2'>
          {/* Nombre del equipo */}
          <div className='mb-4'>
          <label className='block text-white text-sm font-semibold mb-[1px] md:pr-96 pr-80' htmlFor='nombreEquipo'>
              .
            </label>
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

          {/* Modelo */}
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

          {/* Propietario */}
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

          {/* Fecha de fabricación */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='fechaFabricacion'>
              Ultima actualización
            </label>
            <input
              {...register('fechaFabricacion')}
              defaultValue={equipment.manufactureDate?.slice(0, 10)}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='fechaFabricacion'
              type='date'
            />
          </div>

          {/* Marca */}
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

          {/* Ubicación */}
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

          {/* Tipo de unidad */}
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
          <div className='mb-4 pb-5 '>
            <button
              type='submit'
              className="flex items-center justify-center p-2 text-white rounded-lg 
              bg-gradient-to-r from-[#21262D] to-[#414B66] 
              w-36 "
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



