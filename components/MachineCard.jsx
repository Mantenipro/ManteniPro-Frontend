import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { deleteEquipment } from '@/api/api'; 
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });



const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const MachineCard = ({ machine, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detectar si está en una pantalla móvil (menos de 768px)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Ejecutar una vez cuando el componente se monta
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleCardClick = () => router.push(`/equipment/${machine._id}`);

  const handleEditClick = (e) => {
    e.stopPropagation();
    router.push(`/editEquipment/${machine._id}`);
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

  const handleDeleteConfirm = async () => {
    if (isDeleteConfirmed) {
      try {
        const token = localStorage.getItem('token'); 
        await deleteEquipment(machine._id, token); 
        onDelete(machine._id); 
        setShowWarning(false);
      } catch (error) {
        console.error("Error eliminando el equipo:", error);
      }
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
      <img
        src={machine.image || '/noimg3.jpg' }
        alt="Imagen del equipo"
        className="w-12 h-12 rounded-full object-cover bg-gray-300"
      />
    </div>

    {/* Información del equipo */}
    <div className="flex flex-grow justify-between ml-4 space-x-6">
      <div className="flex flex-col items-start md:w-24 w-[5vh]">
        <span className={`md:text-lg text-xs font-bold transition-colors duration-300 ${isHovered ? 'text-white' : 'text-black'}`}>
          {truncateText(machine.model, isMobile ? 10 : 10)}
        </span>
      </div>

      <div className="flex flex-col items-start md:w-24 w-[4vh]">
        <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-600'}`}>
          {truncateText(machine.owner, isMobile ? 20 : 15)}
        </span>
      </div>

      <div className="hidden md:flex flex-col items-start md:w-24">
        <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
          {truncateText(machine.brand, 10)}
        </span>
      </div>

      <div className="hidden lg:flex flex-col items-start md:w-24">
        <span className={`transition-colors duration-300 ${isHovered ? 'text-white' : 'text-gray-500'}`}>
          {truncateText(machine.location, 20)}
        </span>
      </div>

      {/* Código QR */}
      <div className="hidden lg:flex justify-center items-center mr-6">
        <img src={machine.qr} alt="Código QR" className="w-12 h-12 rounded-lg" />
      </div>
    </div>

    {/* Botones de edición y eliminación */}
    <div className="flex-shrink-0 flex space-x-4 ml-6">
      <button
        onClick={handleEditClick}
        className="bg-gray-200 p-2 rounded-lg transition-all duration-300 hover:bg-white hidden sm:block"
      >
        <img src="/icon/edit-icon.png" alt="Edit" width={20} height={20} />
      </button>
      <button
        onClick={handleDeleteClick}
        className="bg-gray-200 p-2 rounded-lg transition-all duration-300 hover:bg-white hidden sm:block"
      >
        <img src="/icon/delete-icon.png" alt="Delete" width={20} height={20} />
      </button>
    </div>

    {/* Botones en tamaño reducido para pantallas pequeñas */}
    <div className="flex-shrink-0 flex space-x-4 ml-6 sm:hidden">
      <button
        onClick={handleEditClick}
        className="bg-gray-200 p-1 rounded-lg transition-all duration-300 hover:bg-white"
      >
        <img src="/icon/edit-icon.png" alt="Edit" width={16} height={16} />
      </button>
      <button
        onClick={handleDeleteClick}
        className="bg-gray-200 p-1 rounded-lg transition-all duration-300 hover:bg-white"
      >
        <img src="/icon/delete-icon.png" alt="Delete" width={16} height={16} />
      </button>
    </div>
  </div>
      {/* Modal de advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">¡Advertencia!</h2>
            <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar este equipo? Esta acción no se puede deshacer.</p>
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
                Eliminar equipo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Función para obtener reportes por usuario
export async function getReportsByUser(userId, token) {
  try {
    const res = await fetch(`${API_URL}/report/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    
    const json = await res.json();
    return json.data; 
  } catch (error) {
    console.error("Error fetching reports by user:", error);
    throw error;
  }
}


export default MachineCard;





























