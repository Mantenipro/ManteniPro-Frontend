import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Source_Sans_3 } from 'next/font/google';
import { useRouter } from 'next/router'; 
import { editEquipment, getAllUsers } from '../api/api';
import imageCompression from 'browser-image-compression';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function EquipmentDetails2({ equipment }) {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(equipment.image || '/noimg3.jpg');
  const [compressedImage, setCompressedImage] = useState(null);
  const [userList, setUserList] = useState([]);
  const router = useRouter();

  async function fetchUsers() {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
  
    if (token && email) {
      try {
        const users = await getAllUsers(token);
  
        const currentUser = users.find(user => user.email === email);
        const company = currentUser ? currentUser.company : null;
  
        if (company) {
          const filteredUsers = users.filter(
            user => user.company === company && user.role === "usuario"
          );
          setUserList(filteredUsers);
        } else {
          console.error("No se encontró la compañía del usuario.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (event) => {
    setValue('owner', event.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 500,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setCompressedImage(compressedFile);
        };
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        console.error("Error al comprimir la imagen:", err);
        setError("Hubo un problema al procesar la imagen.");
      }
    }
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      try {
        const updatedData = {
          equipmentName: data.nombreEquipo,
          model: data.modelo,
          owner: data.owner,
          manufactureDate: data.fechaFabricacion,
          brand: data.marca,
          location: data.ubicacion,
          unitType: data.tipoUnidad,
          image: compressedImage ? await imageCompression.getDataUrlFromFile(compressedImage) : imagePreview,
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
      <div className="relative w-52 h-52 mx-auto mb-2">
        <Image
          src={imagePreview}
          alt={equipment.equipmentName || 'noimg3'}
          width={200}
          height={200}
          className='object-cover w-full h-full rounded-lg'
        />
        <label className="absolute bottom-2 right-2 bg-gradient-to-r from-[#21262D] to-[#414B66] p-2 rounded-full cursor-pointer hover:from-[#1a1d22] hover:to-[#353c54] transition-colors duration-300">
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

          <div className='mb-4 relative'>
            <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='owner'>
              Propietario
            </label>
            <select
              {...register('owner', { required: true })}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='owner'
              onChange={handleUserSelect}
            >
              <option value="">Seleccione un propietario</option>
              {userList.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='fechaFabricacion'>
            Última fecha de mantenimiento
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
          <div className="mb-4 pb-5 flex justify-between">
  <button
    type="button"
    onClick={() => window.location.href = '/inventarioEquipos'}
    className="flex items-center justify-center p-2 text-white rounded-lg 
    bg-gradient-to-r from-[#FF5757] to-[#FF8888] 
    w-36"
  >
    Cancelar
  </button>

  <button
    type="submit"
    className="flex items-center justify-center p-2 text-white rounded-lg 
    bg-gradient-to-r from-[#21262D] to-[#414B66] 
    w-36"
  >
    Actualizar
  </button>
</div>

          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </form>
    </div>
  );
}




