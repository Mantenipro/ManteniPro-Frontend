// AssignedToFilter.js
import React, { useState, useRef, useEffect } from 'react';

const assignedToOptions = ['Alan Urban', 'Roberto Alvarez', 'Uriel Gonzalez'];

const AssignedToFilter = ({ assignedTo, setAssignedTo }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null);

  const filteredOptions = assignedToOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcula la posición del botón para desplegar el menú debajo
  useEffect(() => {
    if (buttonRef.current && showDropdown) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showDropdown]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
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
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            maxHeight: '50vh',
            overflowY: 'auto',
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
  );
};

export default AssignedToFilter;
