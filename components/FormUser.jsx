/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Source_Sans_3 } from 'next/font/google'
import { sendUserData, updateUser } from '../pages/api/api'
import { toast, Toaster } from 'sonner' // Importar toast de sonner
import { useRouter } from 'next/router'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const FormUser = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: initialData || {}
  })

  const [buttonText, setButtonText] = useState('Crear')
  const router = useRouter()

  // Para depuración: verifica si los datos iniciales están llegando correctamente
  useEffect(() => {
    console.log('initialData recibido:', initialData) // Verificar los datos iniciales
  }, [initialData])

  // Actualiza los campos del formulario y el texto del botón
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      console.log("Datos cargados, cambiando a 'Actualizar'")
      reset(initialData) // Utiliza reset para asegurarte de que el formulario se actualiza con los nuevos datos
      setButtonText('Actualizar')
    } else {
      console.log("Sin datos, cambiando a 'Crear'")
      setButtonText('Crear')
    }
  }, [initialData, reset])

  const handleFormSubmit = async (data) => {
    console.log('Datos enviados:', data) // Verificar los datos enviados
    try {
      const response = initialData
        ? await updateUser(initialData._id, data)
        : await sendUserData(data) // Usar la función importada
      if (response && response.success) {
        const role = data.role
        const roleMessage = role === 'tecnico' ? 'Técnico' : 'Usuario'
        toast.success(
          `${roleMessage} ${initialData ? 'actualizado' : 'agregado'} exitosamente`,
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
        if(role === 'tecnico') {
          setTimeout(() => {
            router.push('/catalogoDeTecnicos') // Redirige al resetPassword después de enviar el correo
          }, 2000)
        } else {
          setTimeout(() => {
            router.push('/catalogoDeUsuariosv2') // Redirige al resetPassword después de enviar el correo
          }, 2000)
        }
      } else {
        toast.error(
          `Error al ${initialData ? 'actualizar' : 'agregar'} usuario`
        ) // Mostrar mensaje de error
      }
    } catch (error) {
      toast.error(`Error al ${initialData ? 'actualizar' : 'agregar'} usuario`) // Mostrar mensaje de error en caso de excepción
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${sourceSans3.className} flex min-h-[38rem] w-full max-w-[71rem] flex-col rounded-lg bg-white px-4 pt-4 shadow-lg`}
    >
      <Toaster />
      <div className='flex-1 space-y-4'>
        <div className='mb-4'>
          <label
            className='mb-[2px] block text-sm font-semibold text-gray-700'
            htmlFor='Nombre completo'
          >
            Nombre Completo
          </label>
          <div className='w-full lg:w-1/2'>
            <div className='relative'>
              <img
                src='/iconuser.svg'
                alt=''
                className='absolute left-3 top-1/2 -translate-y-1/2 transform'
              />
              <input
                {...register('name')}
                className='w-full appearance-none rounded-lg border border-gray-300 py-1 pl-10 pr-4 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='name'
                type='text'
                placeholder='Juanito Perez Gonzalez'
              />
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <label
            className='mb-[2px] block text-sm font-semibold text-gray-700'
            htmlFor='Correo Electrónico'
          >
            Correo Electrónico
          </label>
          <div className='w-full lg:w-1/2'>
            <div className='relative'>
              <img
                src='/iconemail.svg'
                alt=''
                className='absolute left-3 top-1/2 -translate-y-1/2 transform'
              />
              <input
                {...register('email')}
                className='w-full appearance-none rounded-lg border border-gray-300 py-1 pl-10 pr-4 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='email'
                type='email'
                placeholder='nombre@dominio.com'
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-sm font-semibold text-gray-700'
            htmlFor='Contraseña'
          >
            Contraseña
          </label>
          <div className='w-full lg:w-1/2'>
            <div className='relative'>
              <img
                src='/iconpassword.svg'
                alt=''
                className='absolute left-3 top-1/2 -translate-y-1/2 transform'
              />
              <input
                {...register('password')}
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 pl-10 pr-4 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='contraseña'
                type='password'
                placeholder='********'
              />
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-sm font-semibold text-gray-700'
            htmlFor='Cargo'
          >
            Cargo
          </label>
          <div className='w-full lg:w-1/2'>
            <select
              {...register('type')}
              className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 text-xs leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-sm'
              id='cargo'
            >
              <option value=''>Seleccione un tipo</option>
              <option value='IngMec'>Ingeniero Mecánico</option>
              <option value='IngElec'>Ingeniero Electrico</option>
              <option value='IngCiv'>Ingeniero Civil</option>
              <option value='Otro'>Otro</option>
            </select>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='mb-[8px] block text-sm font-semibold text-gray-700'
            htmlFor='permisos'
          >
            Permisos
          </label>
          <div className='flex w-full space-x-2 lg:w-1/2'>
            <div className='flex items-center rounded-lg border border-gray-300 p-2'>
              <input
                {...register('role')}
                className='h-4 w-4 appearance-none rounded-full border border-gray-300 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='permiso-user'
                type='radio'
                value='usuario'
              />
              <label htmlFor='permiso-user' className='ml-2 text-gray-700'>
                User
              </label>
            </div>
            <div className='flex items-center rounded-lg border border-gray-300 p-2'>
              <input
                {...register('role')}
                className='h-4 w-4 appearance-none rounded-full border border-gray-300 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='permiso-admin'
                type='radio'
                value='admin'
                disabled
              />
              <label htmlFor='permiso-admin' className='ml-2 text-gray-700'>
                Admin
              </label>
            </div>
            <div className='flex items-center rounded-lg border border-gray-300 p-2'>
              <input
                {...register('role')}
                className='h-4 w-4 appearance-none rounded-full border border-gray-300 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='permiso-tecnico'
                type='radio'
                value='tecnico'
              />
              <label htmlFor='permiso-tecnico' className='ml-2 text-gray-700'>
                Técnico
              </label>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='mb-[2px] block text-sm font-semibold text-gray-700'
            htmlFor='foto'
          >
            Agregar foto (opcional)
          </label>
          <div className='w-full lg:w-1/2'>
            <input
              {...register('photo')}
              className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              id='foto'
              type='file'
            />
          </div>
        </div>
      </div>

      <div className='mb-14 flex justify-end lg:mb-10 lg:mr-10 lg:mt-4'>
        <button
          type='submit'
          className='rounded-lg bg-gradient-to-r from-[#21262D] to-[#414B66] px-6 py-3 text-lg font-bold text-white shadow-md hover:from-[#1a1d24] hover:to-[#373f5a] focus:outline-none focus:ring-4 focus:ring-blue-300 lg:px-12 lg:py-1'
        >
          {buttonText}
        </button>
      </div>
    </form>
  )
}

export default FormUser
