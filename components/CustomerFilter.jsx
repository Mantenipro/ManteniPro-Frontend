import React, { useState, useRef, useEffect } from 'react';

const CustomerFilter = ({ selectedAssignedTo, setSelectedAssignedTo, owners }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filtrar opciones por nombre en el buscador
  const filteredOptions = owners.filter((owner) =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (buttonRef.current && showDropdown) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });

      setTimeout(() => {
        setPositionCalculated(true);
      }, 0);
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setPositionCalculated(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar la selección por ID
  const handleCheckboxChange = (ownerId) => {
    if (selectedAssignedTo.includes(ownerId)) {
      setSelectedAssignedTo(selectedAssignedTo.filter((id) => id !== ownerId));
    } else {
      setSelectedAssignedTo([...selectedAssignedTo, ownerId]);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent border-none p-1 text-xs sm:text-sm rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
      >
        <img
          src="/icon/patron.png"
          alt="Asignado a"
          className="h-4 w-4 sm:h-5 sm:w-5 hidden md:block"
        />
        <span>Cliente</span>
      </button>
      {showDropdown && positionCalculated && (
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black w-32 sm:w-40 md:w-48 p-2 rounded-md shadow-md z-50 max-h-40 overflow-y-auto"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-xs sm:text-sm"
          />
          <ul className="mt-2 text-black">
            {filteredOptions.map((owner, index) => (
              <li
                key={owner._id}
                className="flex justify-between items-center p-1 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm"
                onClick={() => handleCheckboxChange(owner._id)} // Seleccionar por ID
              >
                <span className={selectedAssignedTo.includes(owner._id) ? 'font-medium' : ''}>
                  {owner.name} {/* Mostrar el nombre en la lista */}
                </span>
                <input
                  type="checkbox"
                  checked={selectedAssignedTo.includes(owner._id)} // Comprobar selección por ID
                  readOnly
                  className="ml-2 h-3 w-3 sm:h-4 sm:w-4"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerFilter;

