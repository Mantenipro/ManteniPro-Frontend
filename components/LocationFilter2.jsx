import React, { useState, useRef, useEffect } from 'react';

const LocationFilter2 = ({ selectedLocations, setSelectedLocations, locations }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  
  const filteredOptions = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleCheckboxChange = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
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
            {filteredOptions.map((location, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-1 hover:bg-blue-100 cursor-pointer text-xs sm:text-sm"
                onClick={() => handleCheckboxChange(location)}
              >
                <span className={selectedLocations.includes(location) ? 'font-medium' : ''}>
                  {location}
                </span>
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
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

export default LocationFilter2;


