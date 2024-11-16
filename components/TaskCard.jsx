import React, { useState, useEffect } from 'react';
import { Today } from '@mui/icons-material';

export default function TaskCard({ title, description, createdAt, picture, onClick, onDelete, className, status }) {
  const [showWarning, setShowWarning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); 

  useEffect(() => {
   
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleCardClick = () => {
    setIsClicked(true);
    if (onClick) {
      onClick();
    }
  };

  const truncatedTitle = title.length > (isDesktop ? 40 : 30) ? `${title.slice(0, isDesktop ? 40 : 30)}...` : title;
  const truncatedDescription = description.length > (isDesktop ? 40 : 20) ? `${description.slice(0, isDesktop ? 110 : 20)}...` : description;

  
  const translateStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in-progress':
        return 'En progreso';
      case 'completed':
        return 'Completado';
      default:
        return status; 
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Task Card */}
      <div
        onClick={handleCardClick}
        className={`group relative flex flex-col justify-between rounded-xl border-2 bg-[#FAFAFA] p-4 text-sm transition duration-300 ease-in-out cursor-pointer
          ${isClicked ? 'bg-gradient-to-r from-[#21262D] to-[#414B66]' : 'hover:bg-gradient-to-r hover:from-[#21262D] hover:to-[#414B66]'}` }
      >
        {/* Botón de eliminar solo si el estado es 'pending' */}
        {status === 'pending' && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 right-2 p-2"
          >
            <img src="/icon/delete-icon.png" alt="Eliminar" className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        )}

        {/* Contenido de la tarjeta */}
        <div className="flex items-center space-x-3">
          {picture && (
            <img
              src={picture}
              alt="task-photo"
              className="w-11 rounded-full border"
            />
          )}
          <div className="flex flex-col gap-1">
            <p className={`md:text-xl text-sm font-medium group-hover:text-white ${isClicked ? 'text-white' : ''}`}>{truncatedTitle}</p>
            <p className={`md:text-lg group-hover:text-gray-300 ${isClicked ? 'text-gray-300 ' : 'text-gray-600'}`}>{truncatedDescription}</p>
          </div>
        </div>

        {/* Estado del ticket */}
        <div className="mt-2 text-sm font-semibold text-gray-600">
          <span className="text-gray-500">Estado: </span> 
          <span className="text-gray-500">{translateStatus(status)}</span> {/* Estado traducido */}
        </div>

        {/* Fecha de creación en la parte inferior derecha */}
        <div className="absolute bottom-2 right-2 pb-1 flex items-center gap-1 text-xs group-hover:text-gray-300 text-gray-500">
          <Today fontSize="small" />
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
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
