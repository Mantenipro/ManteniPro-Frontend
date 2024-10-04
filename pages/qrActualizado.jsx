import React, { useState } from 'react'; 
import LefthDashboard from '@/components/LefthDashboard';
import QRCodeDisplay from '../components/QRCodeDisplay'; 

const QRActualizado = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white flex relative">
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-b from-[#31416d] to-[#232c48] md:w-[30%] lg:w-[15%] w-[50%] h-full fixed lg:static z-40`}
      >
        <LefthDashboard />
      </div>

      <main className="flex-1 ml-3 p-6 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-sm"> 
            <QRCodeDisplay />
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRActualizado;

