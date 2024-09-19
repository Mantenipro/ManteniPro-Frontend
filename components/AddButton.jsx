import React, { useState, useEffect } from 'react';

const AddButton = () => {
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <button 
      className="flex items-center justify-center w-auto p-2 text-white rounded-lg 
                 bg-gradient-to-r from-[#21262D] to-[#414B66] 
                 hover:from-[#1a1d22] hover:to-[#353c54] transition-colors duration-300
                 ml-2" 
      style={{ 
        background: 'linear-gradient(90deg, #21262D 12%, #414B66 88%)', 
        whiteSpace: 'nowrap' 
      }}
    >
      {isMobile ? '+' : 'Crear equipo'}
    </button>
  );
};

export default AddButton;











