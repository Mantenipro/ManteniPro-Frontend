/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Source_Sans_3 } from 'next/font/google';
import { toast, Toaster } from 'sonner'
import { deleteEquipment } from '../api/api';
   

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const MachineCard = ({ machine, onDelete }) => {
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

  const handleCardClick = () => {
    router.push({
      pathname: '/infoEquipo',
      query: { id: machine._id }
    })
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    router.push({
      pathname: '/editarEquipo',
      query: { id: machine._id }
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
        const response = await deleteEquipment(machine._id)
        if (response.success) {
          toast.success('Equipo eliminado exitosamente', {
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
          onDelete(machine._id)
        } else {
          toast.error(`Error al eliminar equipo: ${response.error}`)
        }
      } catch (error) {
        toast.error(`Error al eliminar equipo: ${error.message}`)
      }
      setShowWarning(false)
    }
  }

  const handleCancel = () => {
    setShowWarning(false)
    setInputValue('')
  }

  return (
    <div>
      <Toaster />
      {/* Tarjeta de la máquina */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        className={`mb-4 flex items-center justify-between rounded-lg bg-[#FAFAFA] p-4 shadow-md transition-all duration-300 md:p-4 ${isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66] text-white' : ''} ${sourceSans3.className} ${isHovered ? 'shadow-lg' : ''} cursor-pointer`}
      >
        {/* Imagen del equipo */}
        <div className='flex-shrink-0'>
          <img
            src={machine.image}
            alt='Imagen del equipo'
            className='h-12 w-12 rounded-full bg-gray-300 object-cover'
          />
        </div>

        {/* Información del equipo */}
        <div className='ml-4 flex flex-grow justify-between'>
          <div className='flex flex-1 flex-col justify-center'>
            <span
              className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}
            >
              {machine.model}
            </span>
          </div>

          {/* Código del equipo */}
          <div className='ml-4 flex flex-1 flex-col justify-center'>
            <span
              className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}
            >
              {machine.owner}
            </span>
          </div>

          {/* Fabricante */}
          <div className='ml-4 hidden flex-1 flex-col justify-center md:flex'>
            <span
              className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}
            >
              {machine.brand}
            </span>
          </div>

          <div className='ml-4 hidden flex-1 flex-col justify-center lg:flex'>
            <span
              className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}
            >
              {machine.location}
            </span>
          </div>

          <div className='mr-6 hidden items-center justify-center lg:flex'>
            <div className='h-12 w-12 rounded-lg bg-gray-300' />
          </div>
        </div>

        <div className='ml-6 flex flex-shrink-0 space-x-4'>
          <button
            onClick={handleEditClick}
            className='hidden rounded-lg bg-gray-200 p-2 transition-all duration-300 hover:bg-white sm:block'
          >
            <img src='/icon/edit-icon.png' alt='Edit' width={20} height={20} />
          </button>
          <button
            onClick={handleDeleteClick}
            className='hidden rounded-lg bg-gray-200 p-2 transition-all duration-300 hover:bg-white sm:block'
          >
            <img
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
            <img src='/icon/edit-icon.png' alt='Edit' width={16} height={16} />
          </button>
          <button
            onClick={handleDeleteClick}
            className='rounded-lg bg-gray-200 p-1 transition-all duration-300 hover:bg-white'
          >
            <img
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
              ¿Estás seguro de que deseas eliminar este equipo? Esta acción no
              se puede deshacer.
            </p>
            <p className='mb-4 text-gray-700'>
              Por favor, escribe{' '}
              <span className='font-bold'>&quot;DELETE&quot;</span> para
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
                Eliminar equipo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MachineCard;


























