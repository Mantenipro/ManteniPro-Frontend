import React from 'react';
import { Montserrat } from 'next/font/google'; 
const montserrat = Montserrat({ subsets: ['latin'] });

const Title = ({ children }) => {
  return (
    <h1 
      className={`text-3xl font-bold text-left mb-2 mt-4 ml-1 ${montserrat.className}`} 
      style={{ color: '#2E3A59' }}
    >
      {children}
    </h1>
  );
};

export default Title;





