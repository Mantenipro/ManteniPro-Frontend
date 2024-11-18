import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import QRCode from 'qrcode';
import { createEquipment, getUsers, editEquipment } from '@/api/api'; // Asegúrate de importar la función editEquipment
import { Source_Sans_3 } from 'next/font/google';
import PropietarioSelect from './PropietarioSelect';
import LocationInput from './LocationInput';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function FormEquipment() {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  function generateUniqueNumber() {
    return Math.floor(Math.random() * 20000) + 1;
  }

  async function uploadImageToS3(file) {
    if (!file) return null;
    try {
      const fileData = { fileName: file.name, fileType: file.type };
      const presignedUrlResponse = await fetch('http://localhost:8000/api/s3/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileData),
      });
      const { url } = await presignedUrlResponse.json();
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      return url.split('?')[0];
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      return null;
    }
  }

  async function uploadQRCodeToS3(qrCodeData) {
    try {
      if (!qrCodeData) {
        console.error("No se generó un QR válido");
        return null;
      }
      const qrCodeBlob = await (await fetch(qrCodeData)).blob();
      const uniqueNumber = generateUniqueNumber();
      const qrCodeFile = new File([qrCodeBlob], `qrcode_${uniqueNumber}.png`, { type: 'image/png' });

      const fileData = { fileName: qrCodeFile.name, fileType: qrCodeFile.type };
      const presignedUrlResponse = await fetch('http://localhost:8000/api/s3/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileData),
      });
      const { url } = await presignedUrlResponse.json();
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': qrCodeFile.type },
        body: qrCodeFile,
      });
     
      return url.split('?')[0];
    } catch (error) {
      console.error("Error subiendo el QR a S3:", error);
      return null;
    }
  }

  async function generateQRCode(equipmentId) {
    const url = `http://localhost:3000/equipos2/${equipmentId}`;
    try {

      const qrCodeDataUrl = await QRCode.toDataURL(url);
    
      setQrCodeUrl(qrCodeDataUrl);
      return qrCodeDataUrl;
    } catch (error) {
      console.error("Error generando el código QR:", error);
      return null;
    }
  }

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
  
    // Verificar si la ubicación está vacía
    if (!data.location) {
      alert("El campo 'Ubicación' es obligatorio");
      return;
    }
  
    if (token && email) {
      try {
        const userList = await getUsers();
        const user = userList.find((user) => user.email === email);
        const userId = user ? user._id : null;
  
        if (!userId) {
          console.error("No se encontró un usuario con el email especificado.");
          return;
        }
  
        let imageUrl = null;
        if (selectedFile) {
          imageUrl = await uploadImageToS3(selectedFile);
        }
  
        // Primero creamos el equipo sin el QR
        const createdEquipment = await createEquipment(
          data.equipmentName,
          data.model,
          userId,
          data.owner,
          data.manufactureDate,
          data.brand,
          data.location,
          data.unitType,
          imageUrl,
          null, // No pasamos el QR aún
          token
        );
  
        const equipmentId = createdEquipment._id; // Obtenemos el id del equipo creado
  
        // Generar el URL del QR con el id del equipo
        const qrCodeDataUrl = await generateQRCode(equipmentId);
  
        // Ahora subimos el QR al servidor (S3)
        const uploadedQrCodeUrl = await uploadQRCodeToS3(qrCodeDataUrl);
  
        // Verificar si el QR fue subido correctamente
        if (!uploadedQrCodeUrl) {
          console.error("No se pudo obtener la URL del QR después de la subida.");
          return;
        }
  
        // Creamos el objeto con los datos actualizados (incluyendo el QR)
        const updatedData = { qr: uploadedQrCodeUrl };
  
        // Editamos el equipo con la URL del QR
        await editEquipment(equipmentId, updatedData, token);
  
        // Redirigimos al inventario
        router.push("/inventarioEquipos");
  
      } catch (error) {
        console.error("Error creando el equipo:", error);
      }
    } else {
      console.error("Token o email no encontrados en el almacenamiento local.");
    }
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${sourceSans3.className} bg-white shadow-lg rounded-lg px-4 pt-1 w-[48vh] md:w-[70vh]  h-[80vh]  flex flex-col overflow-y-auto`}
    >
      <div className='space-y-4 flex-1'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='equipmentName'>
            Nombre del equipo
          </label>
          <input
            {...register('equipmentName', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='equipmentName'
            type='text'
            placeholder='Nombre del equipo'
          />
          {errors.equipmentName && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='model'>
            Modelo
          </label>
          <input
            {...register('model', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='model'
            type='text'
            placeholder='Modelo del equipo'
          />
          {errors.model && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <PropietarioSelect register={register} setValue={setValue} />

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='manufactureDate'>
            Última fecha de mantenimiento
          </label>
          <input
            {...register('manufactureDate', { required: false })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='manufactureDate'
            type='date'
          />
          {errors.manufactureDate && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='brand'>
            Marca
          </label>
          <input
            {...register('brand', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='brand'
            type='text'
            placeholder='Marca del equipo'
          />
          {errors.brand && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[5px]  text-left'>
            Ubicación
          </label>
          <LocationInput register={register} setValue={setValue} />
          {errors.location && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='unitType'>
            Tipo de unidad
          </label>
          <input
            {...register('unitType', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='unitType'
            type='text'
            placeholder='Tipo de unidad'
          />
          {errors.unitType && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
        </div>

        <div className="mb-4">
          <label className='block text-gray-700 text-sm font-semibold mb-[5px] text-left' htmlFor='image'>
            Imagen del equipo (Opcional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg w-full py-1 px-2"
          />
        </div>
      </div>

      <button
        type='submit'
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Crear equipo
      </button>
    </form>
  );
}







































































































































































































































































































