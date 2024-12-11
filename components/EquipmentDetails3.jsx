import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { createReport, getAllUsers } from '../api/api'; 
import { useRouter } from 'next/router';
import { toast, Toaster } from 'sonner';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] });

const EquipmentDetails = ({ equipment }) => {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [tipoEquipo, setTipoEquipo] = useState('');
  const [problemasComunes, setProblemasComunes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ownerName, setOwnerName] = useState('');

  const problemasAire = [
    'No enfría adecuadamente', 
    'Hace ruido extraño', 
    'No enciende', 
    'Fugas de refrigerante', 
    'Mal olor al encender', 
    'Filtros de aire obstruidos', 
    'Termostato defectuoso', 
    'Unidad exterior no funciona', 
    'Condensación excesiva o goteo', 
    'Ciclos de encendido y apagado frecuentes', 
    'Consumo energético elevado', 
    'Ventilador no funciona correctamente', 
    'Bobinas congeladas', 
    'Vibraciones excesivas durante el funcionamiento', 
    'El control remoto no responde', 
    'Problemas eléctricos en el circuito', 
    'Conductos de aire bloqueados', 
    'Capacitor dañado', 
    'Compresor defectuoso', 
    'Problemas en la válvula de expansión'
  ];
  const problemasPaneles = [
    'No genera energía', 
    'Fugas de agua', 
    'Panel dañado', 
    'Pérdida de eficiencia', 
    'Sobrecalentamiento', 
    'Conexiones eléctricas defectuosas', 
    'Sombra parcial en los paneles', 
    'Acumulación de suciedad o polvo', 
    'Degradación por envejecimiento', 
    'Inversor defectuoso', 
    'Cables sueltos o dañados', 
    'Mal funcionamiento del sistema de monitoreo', 
    'Impacto por granizo o clima extremo', 
    'Errores en la instalación', 
    'Problemas con el sistema de montaje'
  ];
  

  useEffect(() => {
    async function fetchOwnerName() {
      const token = localStorage.getItem("token");
      const ownerId = equipment.owner;

      if (token && ownerId) {
        try {
          const users = await getAllUsers(token);
          const owner = users.find(user => user._id === ownerId);

          if (owner) {
            setOwnerName(owner.name);
          } else {
            //console.error('No se encontró el propietario con el ID proporcionado.');
          }
        } catch (error) {
          //console.error('Error fetching users:', error);
        }
      }
    }

    fetchOwnerName();
  }, [equipment.owner]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    // Verifica si se seleccionó más de un archivo
    if (event.target.files.length > 1) {
      toast.error('Solo se puede subir 1 imagen', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        }
      });
      event.target.value = ''; // Limpia el campo de selección de archivo
      return;
    }
  
    // Verifica si el archivo es una imagen
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      toast.error('Solo se pueden subir imágenes', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        }
      });
      event.target.value = ''; // Limpia el campo de selección de archivo
    }
  };
  

  const onSubmit = async (data) => {
    try {
      const title = `${tipoEquipo} / ${data.problema}`
      const reportData = {
        title,
        description: `${data.descripcionProblema || 'Sin descripción'}`,
        user: equipment.owner, 
        company: equipment.company, 
        equipment: equipment._id, 
        created_at: new Date()
      }
  
      if (selectedFile) {
        const fileData = {
          fileName: selectedFile.name,
          fileType: selectedFile.type
        }
        const presignedUrlResponse = await fetch(
          'https://api-v1.mantenipro.net/api/s3/presigned-url',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fileData)
          }
        )
  
        const { url } = await presignedUrlResponse.json()
        await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': selectedFile.type },
          body: selectedFile
        })
        reportData.image = url.split('?')[0]
      }
  
      const response = await createReport(reportData)
  
      if (!response) {
        throw new Error('No se recibió respuesta del servidor')
      }
  
      if (response.success) {
        toast.success('Reporte enviado exitosamente', {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto'
          }
        })
        reset()
        setTipoEquipo('')
        setProblemasComunes([])
        setSelectedFile(null)
        setTimeout(() => {
          router.push('/ticketsDashboard') // Redirige al dashboard si no necesita cambiar la contraseña
        }, 3000)
      } else {
        throw new Error(response.error || 'Error desconocido')
      }
    } catch (error) {
      toast.error('Suscríbete para gestionar reportes; si ya estás suscrito, alcanzaste el límite permitido.', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        }
      })
      setTimeout(() => {
        router.push('/ticketsDashboard') // Redirige al dashboard si no necesita cambiar la contraseña
      }, 3000)
      //console.error('Error al enviar el reporte:', error)
    }
  };
  

  const handleTipoEquipoChange = (event) => {
    const selectedType = event.target.value;
    setTipoEquipo(selectedType);
    setProblemasComunes(selectedType === 'Aire acondicionado' ? problemasAire : problemasPaneles);
  };

  return (
    <>
      <Toaster />
      <div className={`${sourceSans3.className} lg:ml-4 lg:mt-5 bg-white shadow-lg rounded-lg mt-4 px-3 mx-3 pt-5 max-w-[30rem] md:min-h-[40rem] min-h-[90vh]`}>
        <Image
          src={equipment.image || '/noimg3.jpg'}
          alt={equipment.equipmentName || 'Unidad de equipo'}
          width={200}
          height={200}
          className='rounded-lg mx-auto mb-2'
        />
        <div className='overflow-y-auto animate-fadeIn scrollbar-hide md:max-h-[26rem]  max-h-[60vh]'>
          <div className='space-y-6 ml-2'>
            <div className='mb-4'>
            <label className='block text-white text-sm font-semibold mb-[1px] md:pr-96 pr-80' htmlFor='nombreEquipo'>
              .
            </label>
              <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='nombreEquipo'>
                Nombre del equipo
              </label>
              <input
                {...register('nombreEquipo')}
                defaultValue={equipment.equipmentName}
                readOnly
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='nombreEquipo'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='modelo'>
                Modelo
              </label>
              <input
                {...register('modelo')}
                defaultValue={equipment.model}
                readOnly
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='modelo'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='fechaFabricacion'>
                Última fecha de mantenimiento
              </label>
              <input
                {...register('fechaFabricacion')}
                defaultValue={equipment.manufactureDate?.slice(0, 10)}
                readOnly
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='fechaFabricacion'
                type='date'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='marca'>
                Marca
              </label>
              <input
                {...register('marca')}
                defaultValue={equipment.brand}
                readOnly
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='marca'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='ubicacion'>
                Ubicación
              </label>
              <input
                {...register('ubicacion')}
                defaultValue={equipment.location}
                readOnly
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='ubicacion'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='tipoUnidad'>
                Tipo de unidad
              </label>
              <input
                {...register('tipoUnidad')}
                defaultValue={equipment.unitType}
                readOnly
                className='appearance-none border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='tipoUnidad'
                type='text'
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} id="machineReportForm">
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='tipoEquipo'>
                  Selecciona el tipo de equipo
                </label>
                <select
                  {...register('tipoEquipo', { required: true })}
                  className='border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={handleTipoEquipoChange}
                  id='tipoEquipo'
                >
                  <option value=''>Selecciona una opción</option>
                  <option value='Aire acondicionado'>Aire Acondicionado</option>
                  <option value='Panel solar'>Panel Solar</option>
                </select>
              </div>

              {tipoEquipo && (
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='problema'>
                    Selecciona el problema
                  </label>
                  <select
                    {...register('problema', { required: true })}
                    className='border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                    id='problema'
                  >
                    <option value=''>Selecciona un problema</option>
                    {problemasComunes.map((problema) => (
                      <option key={problema} value={problema}>
                        {problema}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='descripcionProblema'>
                  Descripción del problema (opcional)
                </label>
                <textarea
                  {...register('descripcionProblema')}
                  className='border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='descripcionProblema'
                  rows='3'
                ></textarea>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-semibold mb-[1px]' htmlFor='archivo'>
                  Subir imagen (opcional, solo puedes subir 1)
                </label>
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='border border-gray-300 rounded-lg w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div className='flex justify-center'>
                <button
                  type='submit'
                  className={`mt-4  bg-gradient-to-r from-[#21262D] to-[#414B66] text-white font-bold py-2 px-4 rounded ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentDetails;
