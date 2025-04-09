import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { createReport, getAllUsers } from '../api/api'
import { useRouter } from 'next/router'
import { toast, Toaster } from 'sonner'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const EquipmentDetails = ({ equipment }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm()
  const [tipoEquipo, setTipoEquipo] = useState('')
  const [problemasComunes, setProblemasComunes] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [ownerName, setOwnerName] = useState('')

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
    'El control remoto no responde'
  ]
  const problemasElevadorHidraulico = [
    'Fugas de aceite en el sistema hidráulico',
    'Desgaste de las bombas hidráulicas',
    'Fallo en las válvulas de control',
    'Problemas con el cilindro hidráulico',
    'Falta de presión en el sistema',
    'Fallo en el motor eléctrico',
    'Obstrucción en las líneas hidráulicas',
    'Desgaste de los cables o cuerdas de elevación',
    'Fallo en los controles electrónicos',
    'Desgaste en las guías o poleas del elevador'
  ]

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
  ]

  const problemasComputadora = [
    'Pantalla en negro',
    'No arranca',
    'Sobrecalentamiento',
    'Ruidos extraños',
    'Falta de espacio en el disco duro',
    'Fallo en el sistema operativo',
    'Problemas con la conexión a Internet',
    'Teclado o ratón no responde',
    'Lentitud en el arranque',
    'Mal funcionamiento de la tarjeta gráfica',
    'Pantalla parpadeante',
    'Errores en el sistema de almacenamiento',
    'Mal funcionamiento de los puertos USB',
    'Problemas con la batería',
    'Fallo en la memoria RAM'
  ]
  const problemasImpresora = [
    'No imprime',
    'Atasco de papel',
    'Falta de tinta o tóner',
    'Impresión borrosa o difusa',
    'Conexión a la red no funciona',
    'Impresión muy lenta',
    'Error en el cartucho de tinta',
    'La impresora no se conecta a la computadora',
    'Problemas con la bandeja de papel',
    'Impresión a colores incorrectos',
    'Falta de alimentación de papel',
    'Problemas con el software de impresión',
    'Se atasca el papel repetidamente',
    'Impresión desalineada',
    'Fallo en el cabezal de impresión'
  ]
  const problemasGenerador = [
    'No arranca',
    'Falta de combustible',
    'Bajo rendimiento de energía',
    'Exceso de vibración',
    'Fugas de aceite',
    'Humo excesivo',
    'Ruidos extraños',
    'No mantiene la carga',
    'Falta de corriente en las salidas',
    'Arranque difícil o intermitente',
    'Falla en el sistema de refrigeración',
    'Problemas con el interruptor de encendido',
    'Desgaste en el alternador',
    'Falla en la batería',
    'Conexiones eléctricas defectuosas'
  ]
  const problemasCompresor = [
    'No arranca',
    'Vibraciones excesivas',
    'Fugas de gas refrigerante',
    'Exceso de calor',
    'Nivel de aceite bajo',
    'Sonido anormal o ruidos extraños',
    'Pérdida de presión',
    'Falta de rendimiento',
    'Sobrecarga eléctrica',
    'Condensación excesiva',
    'Fallo en el motor',
    'Fugas de aceite',
    'Fallas en el sistema de arranque',
    'Termostato defectuoso',
    'Válvula de expansión bloqueada'
  ]
  const problemasCarretilla = [
    'No arranca',
    'Batería descargada',
    'Fugas de combustible o aceite',
    'No levanta la carga correctamente',
    'Vibraciones excesivas',
    'Problemas con los frenos',
    'Falla en el motor',
    'Ruidos extraños',
    'Fallo en el sistema hidráulico',
    'Neumáticos desgastados o dañados',
    'Desalineación de los controles',
    'Problemas con los mandos',
    'Fugas de líquido hidráulico',
    'Desgaste de los cables',
    'Fallo en la dirección'
  ]
  const problemasTractorAgricola = [
    'Fallo en el motor',
    'Problemas con el sistema de arranque',
    'Fugas de combustible',
    'Desgaste en los componentes de transmisión',
    'Mal funcionamiento de los frenos',
    'Fugas de aceite',
    'Desalineación de las ruedas o llantas',
    'Fallo en el sistema hidráulico',
    'Fallas en el sistema de enfriamiento',
    'Problemas con los sistemas eléctricos'
  ]

  const problemasGrúa = [
    'No arranca',
    'Fallas en los controles',
    'Fugas de aceite',
    'Exceso de vibración',
    'Falla en el cable o gancho',
    'Sobrecarga de peso',
    'Fallo en los frenos',
    'Ruidos extraños',
    'Desgaste del motor',
    'Mal funcionamiento del sistema hidráulico',
    'Fugas de líquido hidráulico',
    'Fallo en los sensores de carga',
    'Desalineación de las poleas',
    'Fallo en el sistema de elevación',
    'Problemas con el sistema de protección'
  ]

  const problemasClimatizacion = [
    'Fugas de refrigerante',
    'Falta de mantenimiento en los filtros de aire',
    'Fallo en el compresor',
    'Bloqueo de las unidades de ventilación',
    'Problemas con el termostato',
    'Condensación excesiva',
    'Fallas en el sistema eléctrico',
    'Ruidos extraños o vibraciones',
    'Obstrucción de las líneas de drenaje',
    'Desgaste en los componentes del intercambiador de calor'
  ]
  const problemasCamara = [
    'No enciende',
    'Imagen borrosa',
    'Problemas con la conexión a internet',
    'Bajo rendimiento nocturno',
    'No graba correctamente',
    'Fugas de energía',
    'Error en el almacenamiento de datos',
    'Fallo en el enfoque automático',
    'Falta de señal',
    'Fallo en el micrófono',
    'Bajo volumen de sonido',
    'Falta de notificaciones',
    'Cámara fuera de ángulo',
    'Conexión de red inestable',
    'Falla en el sistema de notificación'
  ]
  const problemasControlAcceso = [
    'No reconoce las tarjetas o códigos',
    'Falla en el sistema de lectores',
    'Problemas con el software de gestión',
    'Batería descargada',
    'Fallo en la conexión de red',
    'Accesos no registrados',
    'Puerta no se abre',
    'Problemas con la base de datos de usuarios',
    'Sensor de huella dactilar dañado',
    'No hay registros de acceso',
    'Error en el teclado numérico',
    'Problemas de sincronización',
    'Contraseñas o tarjetas bloqueadas',
    'Falla en la cerradura electrónica',
    'Desalineación del lector de tarjetas'
  ]
  const problemasElevador = [
    'No responde a los controles',
    'Puertas que no abren o cierran correctamente',
    'Fallo en el sistema de frenos',
    'Ruidos extraños',
    'Vibraciones excesivas',
    'Lentitud al subir o bajar',
    'Desajuste en el nivel de los pisos',
    'Fallo en el sistema de emergencia',
    'Problemas con el sistema de carga',
    'Fallo en el sistema eléctrico',
    'Fugas de aceite o fluidos',
    'Baja capacidad de carga',
    'Pantalla de control no funciona',
    'Problemas con las luces interiores',
    'Desgaste en los cables de tracción'
  ]
  const problemasTurbina = [
    'Fallo en las palas',
    'Problemas con el generador',
    'Desbalanceo de las palas',
    'Fugas en el sistema hidráulico',
    'Fallo en los frenos',
    'Desgaste de los rodamientos',
    'Fallo en el sistema de control',
    'Fugas de aceite',
    'Problemas con el inversor',
    'Corrosión de componentes'
  ]
  const problemasBomba = [
    'No arranca',
    'Fugas de agua',
    'Bajo caudal de agua',
    'Ruidos extraños',
    'Baja presión',
    'Sobrecalentamiento',
    'Falla en el interruptor de presión',
    'Fugas de aceite',
    'Vibraciones excesivas',
    'Falta de potencia',
    'Problemas con el motor',
    'Bloqueo de las aspas',
    'Fallo en el sistema eléctrico',
    'Daño en el impulsor',
    'Bajo rendimiento'
  ]
  const problemasMontacargas = [
    'Fallo en el sistema hidráulico',
    'Desgaste en los frenos',
    'Fugas de aceite',
    'Fallo en el motor eléctrico',
    'Desgaste de las cadenas o cables',
    'Problemas con los controles electrónicos',
    'Desalineación de las ruedas o llantas',
    'Fallo en el sistema de dirección',
    'Exceso de vibración durante la operación',
    'Obstrucción o daño en el sistema de elevación'
  ]

  const problemasMaquinariaConstruccion = [
    'Fallo en el motor',
    'Desgaste de los componentes hidráulicos',
    'Fugas de combustible',
    'Problemas en los frenos',
    'Fallo en el sistema de transmisión',
    'Fugas de aceite',
    'Desalineación de las llantas o ruedas',
    'Ruidos extraños en el sistema',
    'Mal funcionamiento de los controles',
    'Sobrecalentamiento del motor'
  ]
  const problemasCintaTransportadora = [
    'Desgaste de la banda transportadora',
    'Fallo en el motor de la cinta',
    'Desalineación de la cinta',
    'Fugas en el sistema hidráulico',
    'Obstrucción de la cinta',
    'Problemas con los rodillos de soporte',
    'Ruidos extraños durante el funcionamiento',
    'Fallo en el sistema de control eléctrico',
    'Exceso de fricción o calor en la banda',
    'Desgaste de los componentes del sistema de transmisión'
  ]
  const problemasEscaleraElectrica = [
    'Fallo en el motor de tracción',
    'Desgaste de las escaleras o peldaños',
    'Problemas con el sistema de frenos',
    'Fallas en el sistema eléctrico de control',
    'Fugas de lubricante en el sistema',
    'Fallo en el sistema de arranque',
    'Desalineación de las escaleras',
    'Ruidos extraños durante el funcionamiento',
    'Obstrucción de las escaleras o pasamanos',
    'Desgaste o daño en los rodillos de apoyo'
  ]
  const problemasPLC_SCADA = [
    'Fallo en la comunicación entre dispositivos',
    'Errores en la programación del PLC',
    'Problemas de conexión de red en el sistema SCADA',
    'Fallo en los sensores conectados al PLC',
    'Pérdida de datos en el sistema SCADA',
    'Fallo en los módulos de entrada/salida del PLC',
    'Interrupciones en el suministro de energía',
    'Problemas con la interfaz gráfica del SCADA',
    'Desincronización de los datos entre el PLC y SCADA',
    'Fallo en el sistema de alarmas y notificaciones'
  ]
  const problemasSistemaSeguridadIncendios = [
    'Fallo en el sistema de detección de humo',
    'Fugas en las mangueras de agua',
    'Fallo en las válvulas de presión',
    'Desgaste de los detectores de calor',
    'Fallo en el sistema de rociadores',
    'Baterías descargadas en los sistemas de respaldo',
    'Obstrucción de las salidas de emergencia',
    'Problemas en las alarmas sonoras',
    'Fallo en el sistema de control de gases',
    'Daños en los equipos de extinción portátiles'
  ]

  useEffect(() => {
    async function fetchOwnerName() {
      const token = localStorage.getItem('token')
      const ownerId = equipment.owner

      if (token && ownerId) {
        try {
          const users = await getAllUsers(token)
          const owner = users.find((user) => user._id === ownerId)

          if (owner) {
            setOwnerName(owner.name)
          } else {
            //console.error('No se encontró el propietario con el ID proporcionado.');
          }
        } catch (error) {
          //console.error('Error fetching users:', error);
        }
      }
    }

    fetchOwnerName()
  }, [equipment.owner])

  const handleFileChange = (event) => {
    const file = event.target.files[0]

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
      })
      event.target.value = '' // Limpia el campo de selección de archivo
      return
    }

    // Verifica si el archivo es una imagen
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
    } else {
      toast.error('Solo se pueden subir imágenes', {
        position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
        style: {
          fontSize: '20px',
          padding: '20px',
          maxWidth: '90vw',
          width: 'auto'
        }
      })
      event.target.value = '' // Limpia el campo de selección de archivo
    }
  }

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
          'https://mantenipro-api.onrender.com/api/s3/presigned-url',
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
          router.push('/gestionDeTickets')
        }, 3000)
      } else {
        throw new Error(response.error || 'Error desconocido')
      }
    } catch (error) {
      toast.error(
        'Suscríbete para gestionar reportes; si ya estás suscrito, alcanzaste el límite permitido.',
        {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto'
          }
        }
      )
      setTimeout(() => {
        router.push('/gestionDeTickets')
      }, 3000)
      //console.error('Error al enviar el reporte:', error)
    }
  }

  const handleTipoEquipoChange = (event) => {
    const selectedType = event.target.value
    setTipoEquipo(selectedType)
    setProblemasComunes(
      selectedType === 'Aire acondicionado'
        ? problemasAire
        : selectedType === 'Panel solar'
          ? problemasPaneles
          : selectedType === 'Computadora'
            ? problemasComputadora
            : selectedType === 'Impresora'
              ? problemasImpresora
              : selectedType === 'Generador de Energia'
                ? problemasGenerador
                : selectedType === 'Compresor'
                  ? problemasCompresor
                  : selectedType === 'Carretilla'
                    ? problemasCarretilla
                    : selectedType === 'Grúa'
                      ? problemasGrúa
                      : selectedType === 'Camara'
                        ? problemasCamara
                        : selectedType === 'Control'
                          ? problemasControlAcceso
                          : selectedType === 'Elevador'
                            ? problemasElevador
                            : selectedType === 'Bomba'
                              ? problemasBomba
                              : selectedType == 'Climatizacion'
                                ? problemasClimatizacion
                                : selectedType == 'Turbina'
                                  ? problemasTurbina
                                  : selectedType == 'Maquinaria'
                                    ? problemasMaquinariaConstruccion
                                    : selectedType == 'Tractor'
                                      ? problemasTractorAgricola
                                      : selectedType == 'Hidraulico'
                                        ? problemasElevadorHidraulico
                                        : selectedType == 'Escalera'
                                          ? problemasEscaleraElectrica
                                          : selectedType == 'Seguridad'
                                            ? problemasSistemaSeguridadIncendios
                                            : selectedType == 'Cinta'
                                              ? problemasCintaTransportadora
                                              : selectedType == 'PLC'
                                                ? problemasPLC_SCADA
                                                : selectedType == 'Montacargas'
                                                  ? problemasMontacargas
                                                  : []
    )
  }

  return (
    <>
      <Toaster />
      <div
        className={`${sourceSans3.className} mx-3 mt-4 min-h-[90vh] max-w-[30rem] rounded-lg bg-white px-3 pt-5 shadow-lg md:min-h-[40rem] lg:ml-4 lg:mt-5`}
      >
        <Image
          src={equipment.image || '/noimg3.jpg'}
          alt={equipment.equipmentName || 'Unidad de equipo'}
          width={200}
          height={200}
          className='mx-auto mb-2 rounded-lg'
        />
        <div className='max-h-[60vh] animate-fadeIn overflow-y-auto scrollbar-hide md:max-h-[26rem]'>
          <div className='ml-2 space-y-6'>
            <div className='mb-4'>
              <label
                className='mb-[1px] block pr-80 text-sm font-semibold text-white md:pr-96'
                htmlFor='nombreEquipo'
              >
                .
              </label>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='nombreEquipo'
              >
                Nombre del equipo
              </label>
              <input
                {...register('nombreEquipo')}
                defaultValue={equipment.equipmentName}
                readOnly
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='nombreEquipo'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='modelo'
              >
                Modelo
              </label>
              <input
                {...register('modelo')}
                defaultValue={equipment.model}
                readOnly
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='modelo'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='fechaFabricacion'
              >
                Última fecha de mantenimiento
              </label>
              <input
                {...register('fechaFabricacion')}
                defaultValue={equipment.manufactureDate?.slice(0, 10)}
                readOnly
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='fechaFabricacion'
                type='date'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='marca'
              >
                Marca
              </label>
              <input
                {...register('marca')}
                defaultValue={equipment.brand}
                readOnly
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='marca'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='ubicacion'
              >
                Ubicación
              </label>
              <input
                {...register('ubicacion')}
                defaultValue={equipment.location}
                readOnly
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='ubicacion'
                type='text'
              />
            </div>

            <div className='mb-4'>
              <label
                className='mb-[1px] block text-sm font-semibold text-gray-700'
                htmlFor='tipoUnidad'
              >
                Tipo de unidad
              </label>
              <input
                {...register('tipoUnidad')}
                defaultValue={equipment.unitType}
                readOnly
                className='w-full appearance-none rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                id='tipoUnidad'
                type='text'
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} id='machineReportForm'>
              <div className='mb-4'>
                <label
                  className='mb-[1px] block text-sm font-semibold text-gray-700'
                  htmlFor='tipoEquipo'
                >
                  Selecciona el tipo de equipo
                </label>
                <select
                  {...register('tipoEquipo', { required: true })}
                  className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={handleTipoEquipoChange}
                  id='tipoEquipo'
                >
                  <option value=''>Selecciona una opción</option>

                  {/* Equipos de Climatización */}
                  <optgroup label='Equipos de Climatización'>
                    <option value='Aire acondicionado'>
                      Aire Acondicionado
                    </option>
                    <option value='Climatizacion'>
                      Sistema de Climatización Industrial
                    </option>
                  </optgroup>

                  {/* Energía y Generación */}
                  <optgroup label='Energía y Generación'>
                    <option value='Panel solar'>Panel Solar</option>
                    <option value='Generador de Energia'>
                      Generador de Energia
                    </option>
                    <option value='Turbina'>Turbina Eólica</option>
                  </optgroup>

                  {/* Equipos de Oficina y Tecnología */}
                  <optgroup label='Equipos de Oficina y Tecnología'>
                    <option value='Computadora'>Computadora</option>
                    <option value='Impresora'>Impresora</option>
                  </optgroup>

                  {/* Equipos de Construcción y Maquinaria */}
                  <optgroup label='Equipos de Construcción y Maquinaria'>
                    <option value='Maquinaria'>
                      Maquinaria de Construcción
                    </option>
                    <option value='Tractor'>Tractor Agrícola</option>
                    <option value='Compresor'>Compresor</option>
                    <option value='Carretilla'>Carretilla Elevadora</option>
                    <option value='Grúa'>Grúa</option>
                    <option value='Montacargas'>Montacargas</option>
                  </optgroup>

                  {/* Sistemas de Elevación y Accesibilidad */}
                  <optgroup label='Sistemas de Elevación y Accesibilidad'>
                    <option value='Elevador'>Elevador</option>
                    <option value='Hidraulico'>Elevador Hidráulico</option>
                    <option value='Escalera'>Escalera Eléctrica</option>
                  </optgroup>

                  {/* Sistemas de Seguridad */}
                  <optgroup label='Sistemas de Seguridad'>
                    <option value='Camara'>Cámara de Vigilancia</option>
                    <option value='Control'>Control de Acceso</option>
                    <option value='Seguridad'>
                      Sistema de Seguridad contra Incendios
                    </option>
                  </optgroup>

                  {/* Otros Equipos Industriales */}
                  <optgroup label='Otros Equipos Industriales'>
                    <option value='Cinta'>Cinta Transportadora</option>
                    <option value='PLC'>Sistema PLC y SCADA</option>
                    <option value='Bomba'>Bomba de Agua</option>
                  </optgroup>
                </select>
              </div>

              {tipoEquipo && (
                <div className='mb-4'>
                  <label
                    className='mb-[1px] block text-sm font-semibold text-gray-700'
                    htmlFor='problema'
                  >
                    Selecciona el problema
                  </label>
                  <select
                    {...register('problema', { required: true })}
                    className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                <label
                  className='mb-[1px] block text-sm font-semibold text-gray-700'
                  htmlFor='descripcionProblema'
                >
                  Descripción del problema (opcional)
                </label>
                <textarea
                  {...register('descripcionProblema')}
                  className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='descripcionProblema'
                  rows='3'
                ></textarea>
              </div>

              <div className='mb-4'>
                <label
                  className='mb-[1px] block text-sm font-semibold text-gray-700'
                  htmlFor='archivo'
                >
                  Subir imagen (opcional, solo puedes subir 1)
                </label>
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='w-full rounded-lg border border-gray-300 px-4 py-1 leading-tight text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              <div className='flex justify-center'>
                <button
                  type='submit'
                  className={`mt-4 rounded bg-gradient-to-r from-[#21262D] to-[#414B66] px-4 py-2 font-bold text-white ${
                    isSubmitting ? 'cursor-not-allowed opacity-50' : ''
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
  )
}

export default EquipmentDetails
