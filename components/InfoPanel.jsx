import React from 'react';

const InfoPanel = () => {
  const panels = [
    { label: "Asignado a" },
    { label: "Fecha" },
    { label: "Localización" },
    { label: "Prioridad" }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {panels.map((panel, index) => (
        <div key={index} className="flex items-center justify-center px-4 py-2 rounded-md text-white text-sm font-medium" 
             style={{ background: 'linear-gradient(90deg, #21262D 12%, #414B66 88%)' }}>
          {panel.label}
        </div>
      ))}
    </div>
  );
};

export default InfoPanel;

