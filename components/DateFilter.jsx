import React, { useState, useRef, useEffect } from 'react';

const dateOptions = ['Recientes', 'Últimos'];

const DateFilter = ({ selectedDate, setSelectedDate }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current && showDropdown) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option) => {
    setSelectedDate(option === selectedDate ? '' : option);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setShowDropdown(!showDropdown)}
        className="bg-transparent border-none p-1 text-sm rounded-md bg-gradient-to-r from-[#21262D] to-[#414B66] flex items-center space-x-1"
      >
        <img src="/icon/calendar-icon.png" alt="Fecha" className="h-4 w-4" />
        <span>{selectedDate || 'Fecha'}</span>
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black w-48 p-2 rounded-md shadow-md z-50"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <ul className="text-black">
            {dateOptions.map((option, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleCheckboxChange(option)}
              >
                <span className={selectedDate === option ? 'font-medium' : ''}>
                  {option}
                </span>
                <input
                  type="checkbox"
                  checked={selectedDate === option}
                  readOnly
                  className="ml-2"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateFilter;

