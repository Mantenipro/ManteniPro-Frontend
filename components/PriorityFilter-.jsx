import React, { useState, useRef, useEffect } from 'react';

const priorityOptions = [
  { label: 'Baja', value: 'Baja', color: 'bg-green-500' },
  { label: 'Media', value: 'Media', color: 'bg-yellow-500' },
  { label: 'Alta', value: 'Alta', color: 'bg-red-500' },
  { label: 'Sin Prioridad', value: 'Sin Prioridad', color: 'bg-gray-500' },
];

const PriorityFilter = ({ selectedPriorities, setSelectedPriorities }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (option) => {
    if (selectedPriorities.includes(option)) {
      setSelectedPriorities(selectedPriorities.filter((priority) => priority !== option));
    } else {
      setSelectedPriorities([...selectedPriorities, option]);
    }
  };

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

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent border-none p-1 text-xs md:text-sm rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
      >
        <img
          src="/icon/priority-icon.png"
          alt="Prioridad"
          className="h-4 w-4 md:h-5 md:w-5 hidden md:block"
        />
        <span>Prioridad</span>
      </button>
      {showDropdown && positionCalculated && (
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black w-24 p-1 rounded-md shadow-md z-50 max-h-40 overflow-y-auto sm:w-32 md:w-40 md:max-h-60"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <ul className="mt-2 text-black">
            {priorityOptions.map(({ label, value, color }) => (
              <li
                key={value}
                className="flex items-center justify-between p-1 hover:bg-blue-100 cursor-pointer text-xs md:text-sm"
                onClick={() => handleCheckboxChange(value)}
              >
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${color} mr-2 md:w-4 md:h-4`} />
                  <span className={selectedPriorities.includes(value) ? 'font-medium' : ''}>
                    {label}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={selectedPriorities.includes(value)}
                  readOnly
                  className="h-3 w-3 md:h-4 md:w-4"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PriorityFilter;

















