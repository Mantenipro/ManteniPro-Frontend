import React from 'react';
import Image from 'next/image';

const BurgerMenu = () => {
  return (
    <button className="flex items-center justify-start p-1 rounded-lg transition-all duration-300 hover:bg-gray-100 md:hidden">
      <Image src="/icon/burgermenu.png" alt="Menu" width={24} height={24} />
    </button>
  );
};

export default BurgerMenu;





