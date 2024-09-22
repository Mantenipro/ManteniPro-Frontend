import React, { useState, useRef, useEffect } from 'react';

const assignedToOptions = ['Alan Urban', 'Roberto Alvarez', 'Uriel Gonzalez'];
const dateOptions = ['Recientes', 'Últimos'];
const locationOptions = ['CDMX Álvaro Obregón', 'CDMX Azcapotzalco', 'CDMX Benito Juárez'];
const priorityOptions = ['Alta', 'Media', 'Baja'];

const InfoPanel = () => {
  const [assignedTo, setAssignedTo] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null); // Para referenciar el botón y calcular su posición

  // Filtrar las opciones de asignación según el término de búsqueda
  const filteredOptions = assignedToOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcula la posición del botón y ajusta la posición del dropdown
  useEffect(() => {
    if (buttonRef.current && showDropdown) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY, // Posiciona el dropdown debajo del botón
        left: rect.left + window.scrollX, // Alinea el dropdown con el botón
      });
    }
  }, [showDropdown]);

  return (
    <div className="flex overflow-x-auto space-x-2 items-center text-white">
      {/* Filtro de Asignado a */}
      <div className="relative">
        <button
          ref={buttonRef} // Referencia al botón
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-transparent border-none p-1 text-sm rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
        >
          <img src="/icon/assignment-icon.png" alt="Asignado a" className="h-4 w-4" />
          <span>Asignado a</span>
        </button>
        {showDropdown && (
          <div
            className="fixed bg-white text-black w-64 p-2 rounded-md shadow-md z-50"
            style={{
              top: `${dropdownPosition.top}px`, // Posiciona dinámicamente según el botón
              left: `${dropdownPosition.left}px`, // Alinea con el botón
              maxHeight: '50vh', // Máximo 50% de la altura de la pantalla
              overflowY: 'auto', // Permitir scroll dentro del dropdown si hay muchas opciones
            }}
          >
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-black"
            />
            <ul className="mt-2 text-black">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setAssignedTo(option);
                    setShowDropdown(false);
                  }}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Filtro de Fecha */}
      <div className="flex items-center bg-gradient-to-r from-[#21262D] to-[#414B66] p-1 rounded-md space-x-1">
        <img src="/icon/calendar-icon.png" alt="Fecha" className="h-4 w-4" />
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-transparent border-none p-1 text-sm rounded-md"
        >
          <option value="">Fecha</option>
          {dateOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de Localización */}
      <div className="flex items-center bg-gradient-to-r from-[#21262D] to-[#414B66] p-1 rounded-md space-x-1">
        <img src="/icon/location-icon.png" alt="Localización" className="h-4 w-4" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-transparent border-none p-1 text-sm rounded-md"
        >
          <option value="">Localización</option>
          {locationOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de Prioridad */}
      <div className="flex items-center bg-gradient-to-r from-[#21262D] to-[#414B66] p-1 rounded-md space-x-1">
        <img src="/icon/priority-icon.png" alt="Prioridad" className="h-4 w-4" />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-transparent border-none p-1 text-sm rounded-md"
        >
          <option value="">Prioridad</option>
          {priorityOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InfoPanel;















