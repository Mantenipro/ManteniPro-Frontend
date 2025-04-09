import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createReport } from '../api/api'
import { useRouter } from 'next/router'
import { toast, Toaster } from 'sonner'

export default function GetInfoMachine() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm()
  const [tipoEquipo, setTipoEquipo] = useState('')
  const [problemasComunes, setProblemasComunes] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  const problemasAire = [
    'No enfría adecuadamente',
    'Hace ruido extraño',
    'No enciende'
  ]
  const problemasPaneles = [
    'No genera energía',
    'Fugas de agua',
    'Panel dañado'
  ]

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const validateFields = (data) => {
    const missingFields = []
    if (!data.nombreUsuario) missingFields.push('Nombre de usuario')
    if (!data.compania) missingFields.push('Compañía')
    if (!data.problema) missingFields.push('Problema')
    return missingFields
  }

  const onSubmit = async (data) => {
    const missingFields = validateFields(data)
    if (missingFields.length > 0) {
      toast.error(`Faltan campos por llenar: ${missingFields.join(', ')}`, {
        position: 'bottom-right',
        style: {
          fontSize: '16px',
          padding: '10px',
          maxWidth: '90vw',
          width: 'auto'
        }
      })
      return
    }

    try {
      const title = `${tipoEquipo} / ${data.problema}`
      const reportData = {
        title,
        description: `${data.descripcionProblema || 'Sin descripción'}`,
        user: data.nombreUsuario,
        company: data.compania,
        created_at: new Date()
      }

      if (selectedFile) {
        const fileData = {
          fileName: selectedFile.name,
          fileType: selectedFile.type
        }
        const presignedUrlResponse = await fetch(
          'https://mantenipro-api.onrender.com/api/s3/presigned-url',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fileData)
          }
        )

        const { url } = await presignedUrlResponse.json()
        await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': selectedFile.type },
          body: selectedFile
        })
        reportData.image = url.split('?')[0]
      }

      const response = await createReport(reportData)

      if (response) {
        toast.success('Reporte enviado exitosamente', {
          position: 'bottom-right',
          style: {
            fontSize: '16px',
            padding: '10px',
            maxWidth: '90vw',
            width: 'auto'
          }
        })
        reset()
        setTipoEquipo('')
        setProblemasComunes([])
        setSelectedFile(null)
        router.push('/gestionDeTickets')
      }
    } catch (error) {
      //console.error('Error al enviar el reporte:', error);
      toast.error('Error al enviar el reporte', {
        position: 'bottom-right',
        style: {
          fontSize: '16px',
          padding: '10px',
          maxWidth: '90vw',
          width: 'auto'
        }
      })
    }
  }

  const handleTipoEquipoChange = (event) => {
    const selectedType = event.target.value
    setTipoEquipo(selectedType)
    setProblemasComunes(
      selectedType === 'Aire acondicionado' ? problemasAire : problemasPaneles
    )
  }

  return (
    <>
      <Toaster />
      <form
        className='mx-3 mt-4 max-w-[90%] rounded-lg bg-white px-3 pt-5 shadow-lg md:min-h-[40rem] md:max-w-[30rem]'
        onSubmit={handleSubmit(onSubmit)}
        id='machineReportForm'
      >
        <div className='flex h-[50vh] flex-col overflow-y-auto md:h-[55vh]'>
          <div className='space-y-6'>
            <div className='mb-4'>
              <label
                className='mb-[2px] block text-sm font-semibold text-gray-700'
                htmlFor='nombreUsuario'
              >
                Nombre de usuario
              </label>
              <input
                {...register('nombreUsuario', { required: true })}
                id='nombreUsuario'
                className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[2px] block text-sm font-semibold text-gray-700'
                htmlFor='compania'
              >
                Compañía
              </label>
              <input
                {...register('compania', { required: true })}
                id='compania'
                className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[2px] block text-sm font-semibold text-gray-700'
                htmlFor='tipoEquipo'
              >
                Selecciona el tipo de equipo
              </label>
              <select
                {...register('tipoEquipo', { required: true })}
                className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={handleTipoEquipoChange}
                id='tipoEquipo'
              >
                <option value=''>Selecciona una opción</option>
                <option value='Aire acondicionado'>Aire Acondicionado</option>
                <option value='Panel solar'>Panel Solar</option>
              </select>
            </div>

            {tipoEquipo && (
              <div className='mb-4'>
                <label
                  className='mb-[2px] block text-sm font-semibold text-gray-700'
                  htmlFor='problemas'
                >
                  Selecciona un problema
                </label>
                <select
                  {...register('problema', { required: true })}
                  className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='problemas'
                >
                  <option value=''>Selecciona un problema</option>
                  {problemasComunes.map((problema, index) => (
                    <option key={index} value={problema}>
                      {problema}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className='mb-4'>
              <label
                className='mb-[2px] block text-sm font-semibold text-gray-700'
                htmlFor='descripcionProblema'
              >
                Descripción del problema
              </label>
              <textarea
                {...register('descripcionProblema')}
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='descripcionProblema'
                rows='4'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[2px] block text-sm font-semibold text-gray-700'
                htmlFor='foto'
              >
                Foto (opcional)
              </label>
              <input
                id='foto'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='w-full'
              />
            </div>
          </div>
        </div>

        <div className='mt-5 flex justify-center pb-6 md:pb-10'>
          <button
            type='submit'
            className={`rounded-lg bg-[#4F70B5] px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
          </button>
        </div>
      </form>
    </>
  )
}
