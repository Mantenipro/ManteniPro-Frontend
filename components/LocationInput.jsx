import React, { useState } from 'react';

export default function LocationInput({ register, setValue }) {
  const [isLocationVisible, setLocationVisible] = useState(false);

  const handleLocationChange = () => {
    const calle = document.getElementById('calle').value;
    const numero = document.getElementById('numero').value;
    const interior = document.getElementById('interior').value;
    const colonia = document.getElementById('colonia').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    const ciudad = document.getElementById('ciudad').value;
    const estado = document.getElementById('estado').value;

    // Construye la dirección completa
    const fullLocation = `${calle} ${numero}, ${interior ? `Depto ${interior}, ` : ''}${colonia}, ${codigoPostal}, ${ciudad}, ${estado}`;
    setValue('location', fullLocation);
  };

  const toggleLocationFields = () => {
    setLocationVisible(!isLocationVisible);
  };

  return (
    <div className='space-y-1'>
      {/* Botón para mostrar los campos */}
      <button
  type="button"
  onClick={toggleLocationFields}
  className="bg-white text-gray-700 border-2 border-gray-300 py-2 px-4 rounded-md mb-4 flex items-center"
>
  <img src="location2.png" alt="Ubicación" className="mr-2 w-5 h-5" />
  Agregar Ubicación
</button>

      {/* Mostrar los campos solo si la variable isLocationVisible es true */}
      {isLocationVisible && (
        <>
          {/* Calle */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='calle'>Calle</label>
            <input
              {...register('calle')}
              id='calle'
              type='text'
              placeholder='Calle'
              onChange={handleLocationChange}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Número */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='numero'>Número</label>
            <input
              {...register('numero')}
              id='numero'
              type='text'
              placeholder='Número'
              onChange={handleLocationChange}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Nº Interior/Depto (opcional) */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='interior'>Nº Interior/Depto (opcional)</label>
            <input
              {...register('interior')}
              id='interior'
              type='text'
              placeholder='Nº Interior/Depto'
              onChange={handleLocationChange}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Colonia */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='colonia'>Colonia</label>
            <input
              {...register('colonia')}
              id='colonia'
              type='text'
              placeholder='Colonia'
              onChange={handleLocationChange}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Código Postal */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='codigoPostal'>Código Postal</label>
            <input
              {...register('codigoPostal')}
              id='codigoPostal'
              type='text'
              placeholder='Código Postal'
              onChange={handleLocationChange}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Ciudad */}
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='ciudad'>Ciudad</label>
            <input
              {...register('ciudad')}
              id='ciudad'
              type='text'
              placeholder='Ciudad'
              onChange={handleLocationChange}
              className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Estado */}
<div className='mb-4'>
  <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='estado'>Estado</label>
  <select
    {...register('estado')}
    id='estado'
    onChange={handleLocationChange}
    className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
  >
    <option value="">Selecciona un estado</option>
    <option value="Aguascalientes">Aguascalientes</option>
    <option value="Baja California">Baja California</option>
    <option value="Baja California Sur">Baja California Sur</option>
    <option value="Campeche">Campeche</option>
    <option value="Chiapas">Chiapas</option>
    <option value="Chihuahua">Chihuahua</option>
    <option value="Coahuila">Coahuila</option>
    <option value="Colima">Colima</option>
    <option value="Durango">Durango</option>
    <option value="Guanajuato">Guanajuato</option>
    <option value="Guerrero">Guerrero</option>
    <option value="Hidalgo">Hidalgo</option>
    <option value="Jalisco">Jalisco</option>
    <option value="Mexico">México</option>
    <option value="Michoacán">Michoacán</option>
    <option value="Morelos">Morelos</option>
    <option value="Nayarit">Nayarit</option>
    <option value="Nuevo León">Nuevo León</option>
    <option value="Oaxaca">Oaxaca</option>
    <option value="Puebla">Puebla</option>
    <option value="Querétaro">Querétaro</option>
    <option value="Quintana Roo">Quintana Roo</option>
    <option value="San Luis Potosí">San Luis Potosí</option>
    <option value="Sinaloa">Sinaloa</option>
    <option value="Sonora">Sonora</option>
    <option value="Tabasco">Tabasco</option>
    <option value="Tamaulipas">Tamaulipas</option>
    <option value="Tlaxcala">Tlaxcala</option>
    <option value="Veracruz">Veracruz</option>
    <option value="Yucatán">Yucatán</option>
    <option value="Zacatecas">Zacatecas</option>
  </select>
</div>

          {/* Campo oculto para la ubicación completa */}
          <input {...register('location')} type='hidden' />
        </>
      )}
    </div>
  );
}
