/* eslint-disable @next/next/no-img-element */
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { Business, Engineering, Person } from '@mui/icons-material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const userStories = [
  {
    title: 'Gestión de Técnicos: alta y baja de personal técnico.',
    description:
      'Como dueño de la empresa, quiero poder crear cuentas de usuario para nuevos técnicos que se unen al equipo, asi como eliminar o desactivar el acceso de técnicos que ya no trabajan con nosotros. Esto permitirá gestionar de manera eficiente el equipo técnico y asegurar que solo personal activo tenga acceso',
    icon: <Business fontSize='large' />,
    color: 'bg-[#E2EBF7]',
    text: 'text-black',
    name: 'Juan Francisco - Reparaciones SA '
  },
  {
    title:
      ' Reportar un problema en el equipo a través del portal de usuarios para nuevos clientes',
    description:
      'Como usuario, deseo poder reportar incidencias en los equipos de manera sencilla y rápida a través de un portal en línea. Quiero escanear un código QR para identificar el equipo, describir el problema de forma detallada y, si es necesario, adjuntar archivos multimedia. Además, espero recibir una confirmación inmediata de que mi solicitud ha sido registrada y está siendo procesada. Administradora en Mantenimiento Express, quiero poder crear cuentas de usuario para mis clientes en una plataforma segura. Quiero asignar permisos según el tipo de cliente y recibir confirmación de registro vía correo electrónico.',
    icon: <Person fontSize='large' />,
    color: 'bg-[#E2EBF7]',
    text: 'text-black',
    name: 'Ana Rodríguez - Cliente'
  },
  {
    title: 'Revisar y gestionar un ticket de mantenimiento',
    description:
      'Como ingeniero, necesito una plataforma en línea que me permita gestionar integralmente los tickets de mantenimiento. Deseo poder acceder a toda la información relevante del ticket, actualizar su estado en tiempo real, documentar las acciones realizadas y mantener una comunicación fluida con el usuario para garantizar la resolución efectiva de los problemas.',
    icon: <Engineering fontSize='large' />,
    color: 'bg-[#E2EBF7]',
    text: 'text-black',
    name: 'Carlos Méndez - Técnico'
  },
  {
    title: 'Creación de usuarios',
    description:
      'Como Gerente Como dueño de la empresa, quiero tener la capacidad de crear cuentas de usuarios para nuevos clientes, asi como eliminar o desactivar el acceso a aquellos que ya no trabajan con nosotros. Permitiéndome gestionar quien tiene acceso al portal y asegurándome quien pueda ingresar. operaciones en Soluciones Industriales, quiero consultar el estado de los reportes de mantenimiento en mi empresa. Deseo recibir actualizaciones en tiempo real y notificaciones cuando un problema se resuelva.',
    icon: <Business fontSize='large' />,
    color: 'bg-[#E2EBF7]',
    text: 'text-black',
    name: 'María López - Soluciones Industriales'
  },
  {
    title: 'Visualizar el estado desde el lado del cliente',
    description:
      'Como Como usuario que ah reportado una incidencia en un equipo, quiero poder consultar el estado de mi solicitud en cualquier momento a través del portal en linea. Deseo recibir actualizaciones claras sobre el progreso del reporte, desde la confirmación inicial hasta la resolución final, para estar informado sobre cuando se espera que el problema sea solucionado en Tecnologías Avanzadas, necesito una plataforma en la que pueda gestionar tickets de mantenimiento. Quiero ver detalles de cada solicitud, asignar técnicos y marcar los trabajos como completados.',
    icon: <Person fontSize='large' />,
    color: 'bg-[#E2EBF7]',
    text: 'text-black',
    name: 'Daniel Sánchez - Cliente'
  },
  {
    title: 'Historial de mantenimiento',
    description:
      'Como ingeniero en campo, quiero poder acceder al historial de mantenimiento del equipo. Esto me permitirá entender mejor el contexto de la incidencia actual y asegurarme de que estoy utilizando los procedimientos correctos para resolver el problema.',
    icon: <Engineering fontSize='large' />,
    color: 'bg-[#E2EBF7]',
    text: 'text-black',
    name: 'Laura Fernández - Tecnico'
  }
]

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false
}

export default function UserStoriesCarousel() {
  return (
    <section className='py-16'>
      <div className='container mx-auto text-center'>
        <h2
          className={`mb-14 text-2xl font-medium md:text-4xl ${montserrat.className}`}
        >
          Historias de Usuario
        </h2>
        <Slider {...settings} className='mx-5 md:mx-0'>
          {userStories.map((story, index) => (
            <div
              key={index}
              className={`relative ${story.color} ${story.text} mx-4 flex h-[400px] flex-col justify-between rounded-xl p-6 text-left shadow-lg`}
            >
              <div>
                <div className='mb-4 flex items-center'>
                  <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md'>
                    {story.icon}
                  </div>
                  <div className='ml-4'>
                    <h3
                      className={`text-xl font-semibold ${montserrat.className}`}
                    >
                      {story.title}
                    </h3>
                    <p className='mt-2 text-gray-700'>{`Nombre: ${story.name}`}</p>
                  </div>
                </div>
                <p
                  className={`text-gray-600 ${sourceSans3.className} ${story.text} mt-4 max-h-[220px] overflow-y-auto pr-2`}
                >
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
