import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null); // Para almacenar la imagen
  const [preview, setPreview] = useState(null); // Para mostrar la vista previa de la imagen

  // Función para manejar el cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Crear una URL para mostrar la imagen seleccionada
    }
  };

  // Función para eliminar la imagen
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-[2px] text-left" htmlFor="file">
        Cargar imagen
      </label>
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="appearance-none border border-gray-300 rounded-lg w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Vista previa de la imagen si hay una seleccionada */}
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Vista previa" className="w-full h-auto rounded-md" />
          <button
            onClick={handleRemoveImage}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Eliminar imagen
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
