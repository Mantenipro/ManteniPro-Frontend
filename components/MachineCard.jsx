import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const MachineCard = ({ machine }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showWarning, setShowWarning] = useState(false); 
  const [inputValue, setInputValue] = useState('');
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false); 
  const router = useRouter(); 

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    router.push('/infoEquipo'); 
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    router.push('/editarEquipo'); 
  };

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
      
      console.log('Equipo eliminado');
      setShowWarning(false);
    }
  };

  const handleCancel = () => {
    setShowWarning(false); 
    setInputValue('');
  };

  return (
    <div>
      {/* Tarjeta de la máquina */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick} 
        className={`flex items-center justify-between bg-[#FAFAFA] shadow-md p-4 md:p-4 rounded-lg mb-4 transition-all duration-300 
        ${isHovered ? 'bg-gradient-to-r from-[#21262D] to-[#414B66] text-white' : ''} ${sourceSans3.className} 
        ${isHovered ? 'shadow-lg' : ''} cursor-pointer`} 
      >
        {/* Imagen del equipo */}
        <div className="flex-shrink-0">
          <Image 
            src="/airConditioning.jpg" 
            alt={machine.model} 
            width={isHovered ? 60 : 50} 
            height={isHovered ? 60 : 50}
            className="object-cover rounded-full" 
          />
        </div>
        
        {/* Información del equipo */}
        <div className="flex flex-grow justify-between ml-4">
          <div className="flex flex-col justify-center">
            <span className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
              {machine.model}
            </span>
          </div>

          {/* Código del equipo */}
          <div className="hidden md:flex flex-col justify-center ml-4">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
              {machine.code}
            </span>
          </div>

          {/* Fabricante */}
          <div className="flex flex-col justify-center ml-4">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
              {machine.manufacturer}
            </span>
          </div>

          <div className="flex-col justify-center ml-4 hidden lg:flex">
            <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
              {machine.location}
            </span>
          </div>

          <div className="hidden lg:flex justify-center items-center mr-6"> 
            <Image 
              src={machine.qr} 
              alt="QR Code" 
              width={50} 
              height={50} 
              className="mr-4"
            />
          </div>
        </div>

        
        <div className="flex-shrink-0 flex space-x-4 ml-6"> 
          <button 
            onClick={handleEditClick} 
            className="bg-gray-200 p-2 rounded-lg transition-all duration-300 hover:bg-white hidden sm:block"
          >
            <Image src="/icon/edit-icon.png" alt="Edit" width={20} height={20} />
          </button>
          <button 
            onClick={handleDeleteClick} 
            className="bg-gray-200 p-2 rounded-lg transition-all duration-300 hover:bg-white hidden sm:block"
          >
            <Image src="/icon/delete-icon.png" alt="Delete" width={20} height={20} />
          </button>
        </div>

        
        <div className="flex-shrink-0 flex space-x-4 ml-6 sm:hidden"> 
          <button 
            onClick={handleEditClick} 
            className="bg-gray-200 p-1 rounded-lg transition-all duration-300 hover:bg-white"
          >
            <Image src="/icon/edit-icon.png" alt="Edit" width={16} height={16} />
          </button>
          <button 
            onClick={handleDeleteClick} 
            className="bg-gray-200 p-1 rounded-lg transition-all duration-300 hover:bg-white"
          >
            <Image src="/icon/delete-icon.png" alt="Delete" width={16} height={16} />
          </button>
        </div>
      </div>

      {/* Modal de advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">¡Advertencia!</h2>
            <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar este equipo? Esta acción no se puede deshacer.</p>
            <p className="text-gray-700 mb-4">Por favor, escribe <span className="font-bold">"DELETE"</span> para confirmar.</p>

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
                Eliminar equipo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineCard;
























