import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Source_Sans_3 } from 'next/font/google'
import { sendUserData, updateUser } from '../pages/api/api'
import { toast, Toaster } from 'sonner'
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

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      reset(initialData)
      setButtonText('Actualizar')
    } else {
      setButtonText('Crear')
    }
  }, [initialData, reset])

  const handleFormSubmit = async (data) => {
    try {
      const response = initialData
        ? await updateUser(initialData._id, data)
        : await sendUserData(data)

      if (response && response.success) {
        const role = data.role
        const roleMessage = role === 'tecnico' ? 'Técnico' : 'Usuario'
        toast.success(
          `${roleMessage} ${initialData ? 'actualizado' : 'agregado'} exitosamente`,
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto'
            }
          }
        )
        reset()
        setTimeout(() => {
          router.push('/catalogoDeEmpleados')
        }, 2000)
      } else {
        toast.error(
          response.error ||
            'El plan básico permite solo 1 administrador, mientras que el plan avanzado permite hasta 2 administradores.',
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto'
            }
          }
        )
      }
    } catch (error) {
      toast.error(error.message || 'Selecciona los permisos apropiados a tu plan', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        }
      })
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

        {/* Ocultar el campo de correo electrónico si estamos editando */}
        {initialData ? (
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
                  disabled // Deshabilitar el campo de correo en modo edición
                />
              </div>
            </div>
          </div>
        ) : (
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
        )}

        {/* Ocultar el campo de contraseña si estamos editando */}
        {!initialData && ( // Mostrar el campo de contraseña solo cuando no estamos editando un usuario
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
)}

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

        {!initialData && (
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
                  id='permiso-admin'
                  type='radio'
                  value='admin'
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
        )}
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
