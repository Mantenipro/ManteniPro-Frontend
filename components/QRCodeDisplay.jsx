import React from 'react';
import Image from 'next/image';

const QRCodeDisplay = () => {
  return (
    <div className="bg-white rounded-lg px-4 max-w-[34rem] min-h-[32rem]">
      <div className="mb-5">
        <Image
          src="/qr.jpg"
          alt="QR Code"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default QRCodeDisplay;











