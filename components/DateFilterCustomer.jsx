import React, { useState, useRef, useEffect } from 'react';

const dateOptions = ['Recientes', 'Últimos'];

const DateFilter2 = ({ selectedDate, setSelectedDate, setMachines }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

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
    const newSelectedDate = option === selectedDate ? '' : option;
    setSelectedDate(newSelectedDate);

    if (setMachines) {
      setMachines(prevMachines => {
        const sortedMachines = [...prevMachines];
        sortedMachines.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return newSelectedDate === 'Recientes' ? dateB - dateA : dateA - dateB;
        });
        return sortedMachines;
      });
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
          src="/icon/calendar-icon.png"
          alt="Fecha"
          className="h-4 w-4 md:h-5 md:w-5 hidden md:block"
        />
        <span>{selectedDate || 'Fecha'}</span>
      </button>
      {showDropdown && positionCalculated && (
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black w-24 p-1 rounded-md shadow-md z-50 max-h-40 overflow-y-auto sm:w-28 md:w-32 md:max-h-60"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <ul className="text-black">
            {dateOptions.map((option, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-1 hover:bg-blue-100 cursor-pointer text-xs md:text-sm ${
                  selectedDate === option ? 'text-black font-medium' : ''
                }`}
                onClick={() => handleCheckboxChange(option)}
              >
                <span>{option}</span>
                <input
                  type="checkbox"
                  checked={selectedDate === option} 
                  readOnly
                  className="ml-2 h-3 w-3 md:h-4 md:w-4"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateFilter2;
