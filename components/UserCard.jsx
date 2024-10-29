import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Source_Sans_3 } from 'next/font/google'
import { deleteUser } from '../pages/api/api'
import { toast, Toaster } from 'sonner'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const UserCard = ({ user, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false)
  const router = useRouter()

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    router.push({
      pathname: '/EditarUsuario',
      query: { id: user._id }
    })
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setShowWarning(true)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    setIsDeleteConfirmed(value === 'DELETE')
  }

  const handleDeleteConfirm = async () => {
    if (isDeleteConfirmed) {
      try {
        const response = await deleteUser(user._id)
        if (response.success) {
          toast.success('Usuario eliminado exitosamente', {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto'
            }
          })
          setShowWarning(false)
          setInputValue('')
          onDelete(user._id) // Actualiza la lista de usuarios en el componente padre
        } else {
          toast.error(`Error al eliminar usuario: ${response.error}`)
        }
      } catch (error) {
        toast.error(`Error al eliminar usuario: ${error.message}`)
      }
    }
  }

  const handleCancel = () => {
    setShowWarning(false)
    setInputValue('')
  }

  return (
    <div>
      <Toaster />
      {/* Tarjeta del usuario */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`mb-4 flex items-center justify-between rounded-lg bg-[#FAFAFA] p-4 shadow-md transition-all duration-300 md:p-4 ${isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66] text-white' : ''} ${sourceSans3.className} ${isHovered ? 'shadow-lg' : ''} cursor-pointer`}
      >
        {/* Imagen del Usuario */}
        <div className='flex-shrink-0'>
          <Image
            src='/profile.jpg'
            alt={user.foto}
            width={isHovered ? 60 : 50}
            height={isHovered ? 60 : 50}
            className='rounded-full object-cover'
          />
        </div>

        {/* Información del Usuario */}
        <div className='ml-4 flex flex-grow justify-between'>
          <div className='flex flex-1 flex-col justify-center'>
            <span
              className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'} truncate sm:hidden`}
              style={{ maxWidth: '100px' }} // Ancho fijo para resoluciones bajas
            >
              {user.name}
            </span>
            <span
              className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'} hidden sm:inline`}
            >
              {user.name}
            </span>
          </div>

          {/* Cargo del Usuario */}
          <div className='ml-4 hidden flex-1 flex-col justify-center md:flex'>
            <span
              className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}
            >
              {user.role}
            </span>
          </div>

          {/* Correo electronico */}
          <div className='ml-4 hidden flex-1 flex-col justify-center md:flex'>
            <span
              className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}
            >
              {user.email}
            </span>
          </div>

          {/* Estado de la cuenta */}
          <div className='ml-2 hidden flex-col justify-center md:flex'>
            <span
              className={`rounded-lg px-2 py-1 transition-colors duration-300 ${user.accountStatus ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              {user.accountStatus ? 'Verificado' : 'No verificado'}
            </span>
          </div>
        </div>

        <div className='ml-12 flex flex-shrink-0 space-x-4'>
          <button
            onClick={handleEditClick}
            className='hidden rounded-lg bg-gray-200 p-2 transition-all duration-300 hover:bg-white sm:block'
          >
            <Image
              src='/icon/edit-icon.png'
              alt='Edit'
              width={20}
              height={20}
            />
          </button>
          <button
            onClick={handleDeleteClick}
            className='hidden rounded-lg bg-gray-200 p-2 transition-all duration-300 hover:bg-white sm:block'
          >
            <Image
              src='/icon/delete-icon.png'
              alt='Delete'
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className='ml-6 flex flex-shrink-0 space-x-4 sm:hidden'>
          <button
            onClick={handleEditClick}
            className='rounded-lg bg-gray-200 p-1 transition-all duration-300 hover:bg-white'
          >
            <Image
              src='/icon/edit-icon.png'
              alt='Edit'
              width={16}
              height={16}
            />
          </button>
          <button
            onClick={handleDeleteClick}
            className='rounded-lg bg-gray-200 p-1 transition-all duration-300 hover:bg-white'
          >
            <Image
              src='/icon/delete-icon.png'
              alt='Delete'
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>

      {/* Modal de advertencia */}
      {showWarning && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-xl font-bold text-red-600'>
              ¡Advertencia!
            </h2>
            <p className='mb-4 text-gray-700'>
              ¿Estás seguro de que deseas eliminar este Usuario? Esta acción no
              se puede deshacer.
            </p>
            <p className='mb-4 text-gray-700'>
              Por favor, escribe{' '}
              <span className='font-bold'>&apos;DELETE&apos;</span> para
              confirmar.
            </p>

            <input
              type='text'
              className='mb-4 w-full rounded-lg border border-gray-300 px-4 py-2'
              value={inputValue}
              onChange={handleInputChange}
              placeholder='Escribe DELETE para confirmar'
            />

            <div className='flex justify-end space-x-3'>
              <button
                className='rounded-md bg-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-400'
                onClick={handleCancel}
              >
                Cancelar
              </button>

              <button
                className={`rounded-md px-4 py-2 font-semibold text-white ${isDeleteConfirmed ? 'bg-red-600 hover:bg-red-700' : 'cursor-not-allowed bg-red-300'}`}
                onClick={handleDeleteConfirm}
                disabled={!isDeleteConfirmed}
              >
                Eliminar Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserCard
