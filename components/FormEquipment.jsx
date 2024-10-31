import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { createEquipment, updateEquipment } from '@/api/api'
import { Source_Sans_3 } from 'next/font/google';
import { toast, Toaster } from 'sonner' // Importar toast de sonner

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

export default function FormEquipment({ initialData }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || {}
  })

  const [buttonText, setButtonText] = useState('Agregar')

  // Para depuración: verifica si los datos iniciales están llegando correctamente
  useEffect(() => {
    console.log('initialData recibido:', initialData) // Verificar los datos iniciales
  }, [initialData])

  // Convertir la fecha al formato yyyy-MM-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Actualiza los campos del formulario y el texto del botón
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      console.log("Datos cargados, cambiando a 'Actualizar'")
      const formattedData = {
        ...initialData,
        manufactureDate: formatDate(initialData.manufactureDate)
      };
      reset(formattedData) // Utiliza reset para asegurarte de que el formulario se actualiza con los nuevos datos
      setButtonText('Actualizar')
    } else {
      console.log("Sin datos, cambiando a 'Crear'")
      setButtonText('Crear')
    }
  }, [initialData, reset])

  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  async function uploadImageToS3(file) {
    if (!file) return null
    try {
      const fileData = {
        fileName: file.name,
        fileType: file.type
      }
      const presignedUrlResponse = await fetch(
        'http://localhost:8000/api/s3/presigned-url',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fileData)
        }
      )
      const { url } = await presignedUrlResponse.json()
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      })
      return url.split('?')[0]
    } catch (error) {
      console.error('Error uploading image to S3:', error)
      return null
    }
  }

  async function onSubmit(data) {
    console.log('Datos enviados:', data) // Verificar los datos enviados
    try {
      const response = initialData
        ? await updateEquipment(data._id, data)
        : await createEquipment(data) // Usar la función importada

      console.log('Respuesta del servidor:', response)

      // Ajustar para verificar la propiedad success dentro de data
      const success =
        response.success || (response.data && response.data.success) // Verificar la respuesta del servidor

      if (success) {
        toast.success(
          `Equipo ${initialData ? 'actualizado' : 'agregado'} exitosamente`,
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw', // Ajuste para pantallas pequeñas
              width: 'auto'
            }
          }
        ) // Mostrar mensaje de éxito
        reset()
      } else {
        toast.error(`Error al ${initialData ? 'actualizar' : 'agregar'} equipo`) // Mostrar mensaje de error
      }
    } catch (error) {
      toast.error(`Error al ${initialData ? 'actualizar' : 'agregar'} equipo`) // Mostrar mensaje de error en caso de excepción
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${sourceSans3.className} flex min-h-[30rem] w-full max-w-[30rem] flex-col rounded-lg bg-white px-4 pt-1 shadow-lg`}
    >
      <Toaster />
      <div className='flex-1 space-y-4'>
        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='equipmentName'
          >
            Nombre del equipo
          </label>
          <input
            {...register('equipmentName', { required: true })}
            className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='equipmentName'
            type='text'
            placeholder='Nombre del equipo'
          />
          {errors.equipmentName && (
            <span className='text-sm text-red-500'>
              Este campo es obligatorio
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='model'
          >
            Modelo
          </label>
          <input
            {...register('model', { required: true })}
            className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='model'
            type='text'
            placeholder='Modelo del equipo'
          />
          {errors.model && (
            <span className='text-sm text-red-500'>
              Este campo es obligatorio
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='owner'
          >
            Propietario
          </label>
          <input
            {...register('owner', { required: true })}
            className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='owner'
            type='text'
            placeholder='Propietario del equipo'
          />
          {errors.owner && (
            <span className='text-sm text-red-500'>
              Este campo es obligatorio
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='manufactureDate'
          >
            Fecha de fabricación
          </label>
          <input
            {...register('manufactureDate', { required: true })}
            className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='manufactureDate'
            type='date'
          />
          {errors.manufactureDate && (
            <span className='text-sm text-red-500'>
              Este campo es obligatorio
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='brand'
          >
            Marca
          </label>
          <input
            {...register('brand', { required: true })}
            className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='brand'
            type='text'
            placeholder='Marca del equipo'
          />
          {errors.brand && (
            <span className='text-sm text-red-500'>
              Este campo es obligatorio
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='location'
          >
            Ubicación
          </label>
          <input
            {...register('location', { required: true })}
            className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='location'
            type='text'
            placeholder='Ubicación del equipo'
          />
          {errors.location && (
            <span className='text-sm text-red-500'>
              Este campo es obligatorio
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='unitType'
          >
            Tipo de unidad
          </label>
          <input
            {...register('unitType', { required: true })}
            className='w-full appearance-none rounded-lg border border-gray-300 px-2 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            id='unitType'
            type='text'
            placeholder='Tipo de unidad'
          />
          {errors.unitType && (
            <span className='text-sm text-red-500'>
              Este campo es obligatorio
            </span>
          )}
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-left text-sm font-semibold text-gray-700'
            htmlFor='image'
          >
            Agregar foto (opcional)
          </label>
          <input
            id='image'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='w-full'
          />
        </div>

        <div className='mb-14 mt-32 flex justify-center lg:mb-10 lg:mt-4'>
          <button
            type='submit'
            className='rounded-lg bg-gradient-to-r from-[#21262D] to-[#414B66] px-4 py-2 font-bold text-white shadow-md hover:from-[#1a1d24] hover:to-[#373f5a] focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  )
}



































