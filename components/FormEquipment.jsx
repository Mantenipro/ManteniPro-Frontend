import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import QRCode from 'qrcode';
import { createEquipment, getUsers } from '@/api/api';
import { Source_Sans_3 } from 'next/font/google';
import PropietarioSelect from './PropietarioSelect';

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
      console.error("Error uploading QR code to S3:", error);
      return null;
    }
  }

  async function generateQRCode() {
    const url = 'http://localhost:3000/inventarioEquipos';
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQrCodeUrl(qrCodeDataUrl);
      return qrCodeDataUrl;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  }

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

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

        const qrCodeDataUrl = await generateQRCode();
        let qrCodeUrl = null;
        if (qrCodeDataUrl) {
          qrCodeUrl = await uploadQRCodeToS3(qrCodeDataUrl);
        }

        await createEquipment(
          data.equipmentName,
          data.model,
          userId,
          data.owner,
          data.manufactureDate,
          data.brand,
          data.location,
          data.unitType,
          imageUrl,
          qrCodeUrl,
          token
        );

        router.push("/inventarioEquipos");
      } catch (error) {
        console.error("Error creating equipment:", error);
      }
    } else {
      console.error("Token or email not found in local storage.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${sourceSans3.className} bg-white shadow-lg rounded-lg px-4 pt-1 w-full max-w-[30rem] min-h-[30rem] flex flex-col`}
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
            {...register('manufactureDate', { required: true })}
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
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='location'>
            Ubicación
          </label>
          <input
            {...register('location', { required: true })}
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='location'
            type='text'
            placeholder='Ubicación del equipo'
          />
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
        
        
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-semibold mb-[2px] text-left' htmlFor='file'>
            Cargar imagen
          </label>
          <input
            id='file'
            type='file'
            onChange={handleFileChange}
            accept='image/*'
            className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      <div className="flex justify-center">
  <button
    type='submit'
    className='bg-gradient-to-r from-[#21262D] to-[#414B66] text-white font-bold py-2 px-4 rounded-lg mt-7 mb-5 w-36'
  >
    Crear Equipo
  </button>
</div>
    </form>
  );
}








































































































































































































































































































