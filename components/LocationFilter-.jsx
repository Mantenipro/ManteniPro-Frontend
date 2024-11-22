import React, { useState, useRef, useEffect } from 'react';

const locationOptions = ['CDMX, Álvaro Obregón', 'CDMX, Azcapotzalco', 'CDMX, Benito Juárez'];

const normalizeString = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

const LocationFilter = ({ selectedLocations, setSelectedLocations }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredOptions = locationOptions.filter((option) =>
    normalizeString(option).includes(normalizeString(searchTerm))
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

  const handleCheckboxChange = (option) => {
    if (selectedLocations.includes(option)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== option));
    } else {
      setSelectedLocations([...selectedLocations, option]);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent border-none p-1 text-xs md:text-sm rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
      >
        <img
          src="/icon/location-icon.png"
          alt="Localización"
          className="h-4 w-4 md:h-5 md:w-5 hidden md:block"
        />
        <span>Ubicación</span>
      </button>
      {showDropdown && positionCalculated && ( 
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black w-32 p-1 rounded-md shadow-md z-50 max-h-40 overflow-y-auto sm:w-40 md:w-48 md:max-h-60"
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
            className="w-full p-1 border border-gray-300 rounded-md text-black text-xs md:text-sm"
          />
          <ul className="mt-1 text-black">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-1 hover:bg-blue-100 cursor-pointer text-xs md:text-sm"
                onClick={() => handleCheckboxChange(option)}
              >
                <span className={selectedLocations.includes(option) ? 'font-medium' : ''}>
                  {option}
                </span>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(option)}
                  readOnly
                  className="ml-1 h-3 w-3 md:h-4 md:w-4"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
















