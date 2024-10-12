import React from 'react';
import QRCode from 'qrcode'
import { useState } from 'react'
import Image from 'next/image';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const QRCodeDisplayO = () =>   
  {
    const [url, setUrl] = useState('');
    const [qr, setQr] = useState('');
    const GenerateQRCode = async () => { 
    try {
      const qrData = await QRCode.toDataURL(url, {
        width: 350,
        margin: 2,
        color: {
          dark: '#333333',
          light: '#FDB623'
        }
      });
      setQr(qrData);
    } catch (error) {
      console.error('Error generating QR Code:', error);
    }
  };

  return (
    <div
      className={`${sourceSans3.className} lg:mt-6 lg:mr-4 bg-white rounded-lg px-6 py-4 max-w-[25rem] mt-3 flex flex-col justify-between min-h-[32rem] shadow-lg mx-3`}
    >
      <div className='text-center w-full mb-4'>
      <h2 className='text-xl font-bold mb-4'>
          <span className='underline decoration-[#FDB623]'>Generar QR</span>
        </h2>      </div>

      <div className='text-center mb-5'>
      <h1></h1>
      <input
        type="text"
        placeholder="Ejemplo http://google.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={GenerateQRCode} className='bg-[#333333] text-white font-semibold inline-flex items-center justify-center rounded-md py-3 px-6 shadow-lg hover:shadow-xl transition-shadow'>
      Generar Código QR
          <span className='ml-2 text-[#FDB623]'>→</span>
        </button>
      {qr && (
        <>
          <div className='text-center'>
          <img  src={qr} alt="Generated QR Code" /> {}</div>
          <button className="bg-[#333333] text-white font-semibold inline-flex items-center justify-center rounded-md py-3 px-6 shadow-lg hover:shadow-xl transition-shadow" onClick={() => {
            const link = document.createElement('a');
            link.href = qr;
            link.download = 'qrcode.png';
            link.click();
          }}>
            Descargar
            <span className="ml-2 text-[#FDB623]">→</span>
          </button>        </>
      )}
    </div>
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-4'>
          QR <span className='underline decoration-[#FDB623]'>Equipo</span>
        </h2>
        <p className='text-gray-500'>
          ¡Haz que tu cliente disfrute la comodidad de aplicar este QR en su
          equipo ahora mismo!
        </p>
      </div>

      <div className='text-center'>
        <button className='bg-[#333333] text-white font-semibold inline-flex items-center justify-center rounded-md py-3 px-6 shadow-lg hover:shadow-xl transition-shadow'>
          Imprimir
          <span className='ml-2 text-[#FDB623]'>→</span>
        </button>
      </div>
    </div>
  )
};

export default QRCodeDisplayO;

























