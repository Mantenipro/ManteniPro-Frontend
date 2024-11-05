import React, { useState } from 'react';
import { Today } from '@mui/icons-material';

export default function TaskCard({ title, description, createdAt, picture, onClick, onDelete, className }) {
  const [showWarning, setShowWarning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowWarning(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsDeleteConfirmed(value === 'DELETE');
  };

  const handleDeleteConfirm = () => {
    if (isDeleteConfirmed) {
      onDelete();
      setShowWarning(false);
      setInputValue('');
    }
  };

  const handleCancel = () => {
    setShowWarning(false);
    setInputValue('');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Task Card */}
      <div
        onClick={onClick}
        className="flex items-center justify-between rounded-xl border-2 bg-[#FAFAFA] p-4 text-sm transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#21262D] hover:to-[#414B66] hover:text-white md:text-xl cursor-pointer"
      >
        <div className="flex items-center">
          {picture && (
            <img
              src={picture}
              alt='task-photo'
              className='w-11 rounded-full border'
            />
          )}
          <div className='flex flex-col gap-1 pl-3'>
            <p className='font-medium'>{title}</p>
            <p className='text-gray-600'>{description}</p>
            <div className='flex items-center gap-1'>
              <Today fontSize='small' />
              <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        {/* Botón de eliminar visible en móvil */}
        <button 
          onClick={handleDeleteClick}
          className="bg-gray-200 rounded-lg transition-all duration-300 hover:bg-white block"
        >
          <img src="/icon/delete-icon.png" alt="Eliminar" className="md:h-[5vh] md:w-[5vh] h-5 w-5"/> {/* Tamaño de imagen en vh */}
        </button>
      </div>

      {/* Modal de advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">¡Advertencia!</h2>
            <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.</p>
            <p className="text-gray-700 mb-4">
              Por favor, escribe <span className="font-bold">"DELETE"</span> para confirmar.
            </p>
            <input
              type="text"
              className="border border-gray-300 rounded-lg w-full py-2 px-4 mb-4"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe DELETE para confirmar"
            />
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className={`py-2 px-4 rounded-md text-white font-semibold ${isDeleteConfirmed ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
                onClick={handleDeleteConfirm}
                disabled={!isDeleteConfirmed}
              >
                Eliminar tarea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
