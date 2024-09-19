import React from 'react';
import { Montserrat } from 'next/font/google'; 
const montserrat = Montserrat({ subsets: ['latin'] });

const Title = () => {
  return (
    <h1 
      className={`text-3xl font-bold text-left py-4 ${montserrat.className}`} 
      style={{ color: '#2E3A59' }}
    >
      Catálogo de equipos
    </h1>
  );
};

export default Title;



