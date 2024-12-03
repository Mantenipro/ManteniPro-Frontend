import React, { useEffect, useState } from 'react'
import { Source_Sans_3 } from 'next/font/google'
import Link from 'next/link'
import {
  FaExclamationCircle,
  FaSpinner,
  FaCheckCircle,
  FaPaperPlane
} from 'react-icons/fa'
import { fetchComments, addComment, fetchUserProfile } from '../pages/api/api'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion } from 'framer-motion'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const StatusDetailLayout = ({ initialData }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [userRole, setUserRole] = useState('') // Cambiar a 'user' para probar
  const [showPendingTime, setShowPendingTime] = useState(false)
  const [showInProgressTime, setShowInProgressTime] = useState(false)
  const [showCompletedTime, setShowCompletedTime] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false) // Estado para controlar si la imagen está abierta

  const [previousStatus, setPreviousStatus] = useState(null) // Estado para guardar el estado anterior del reporte
  const report = initialData?.data?.report

  useEffect(() => {
    if (report) {
      const interval = setInterval(async () => {
        try {
          const fetchedComments = await fetchComments(report._id)
          setComments(Array.isArray(fetchedComments) ? fetchedComments : [])
        } catch (error) {
          //console.error('Error fetching comments:', error)
        }
      }, 3000) // Actualiza cada 3 segundos

      // Limpiamos el intervalo cuando el componente se desmonta
      return () => clearInterval(interval)
    }
  }, [report]) // Dependencia en el reporte para que se ejecute solo cuando el reporte cambie

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const token = window.localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        const profileData = await fetchUserProfile()
        setUserRole(profileData.data.role)
      } catch (error) {
        //console.error('Error fetching user profile:', error)
      }
    }
    fetchUserProfileData()
  }, [])

  useEffect(() => {
    if (report?.status === 'in-progress' && previousStatus !== 'in-progress') {
      // Aquí puedes realizar acciones adicionales si lo necesitas
    }
    setPreviousStatus(report?.status)
  }, [report?.status, previousStatus])

  const handleImageClick = () => {
    setIsImageOpen(true) // Mostrar la imagen en grande
  }

  const handleCloseImage = () => {
    setIsImageOpen(false) // Cerrar la imagen ampliada
  }

  if (!report) {
    return <div>Loading...</div>
  }

  const date = new Date(report.created_at).toLocaleDateString()

  // Función para asignar clases de estilo según el estado actual
  const getStatusClasses = (status) => {
    return status === report.status
      ? 'flex items-center rounded border-4 border-[#FFD700] bg-[#051540] p-2 text-[#EEE727]' // Clase resaltada
      : 'flex items-center rounded border-2 border-[#21262D] p-2 text-[#21262D]' // Clase normal
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const newCommentObj = await addComment(report._id, newComment)

      if (newCommentObj) {
        // Añadimos el nuevo comentario directamente al estado de comentarios
        setComments((prevComments) => [...prevComments, newCommentObj])
        setNewComment('') // Limpiamos el campo de entrada
      }
    } catch (error) {
      //console.error('Error al enviar el comentario:', error)
    }
  }

  const CommentTime = ({ createdAt }) => {
    return (
      <span>
        {formatDistanceToNow(new Date(createdAt), {
          addSuffix: true,
          locale: es
        })}
      </span>
    )
  }
  return (
    <div className='flex items-center justify-center'>
      <div className='max-h-screen animate-fadeIn space-y-4 overflow-y-auto scrollbar-hide md:h-[560px] md:w-3/4'>
        <div className='rounded border p-2 shadow-lg'>
        <div className='flex flex-col justify-between rounded border-b-2 p-2 md:flex-col md:items-center'>
        <div>
          <h3 className='p-2 text-lg font-bold'>{report.title}</h3>
        </div>
        <div className='mb-3 mt-2 flex flex-wrap space-x-4'>
          <button
            className='flex cursor-pointer items-center rounded border bg-white p-2 hover:bg-gray-200 sm:w-full md:w-auto'
            onClick={() => {
              document
                .getElementById('comments-section')
                .scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <img
              src='/comment.svg'
              alt='icon'
              className='mr-2 h-4 w-4 object-cover'
            />
            Comentarios
          </button>
          {userRole === 'admin' && (
            <Link
              href={{
                pathname: '/AsignaciondeTicket',
                query: {
                  ticketId: report._id
                }
              }}
              className='flex cursor-pointer items-center rounded border bg-white p-2 hover:bg-gray-200 sm:w-full md:w-auto'
            >
              <img
                src='/Cargo.svg'
                alt='icon'
                className='mr-2 h-4 w-4 object-cover'
              />
              Asignar
            </Link>
          )}
          {report.status !== 'pending' && (
  <Link
    href={{
      pathname: '/CierreTicket',
      query: {
        ticketId: report._id // Agrega el id del reporte aquí
      }
    }}
    className='flex cursor-pointer items-center rounded border bg-white p-2 hover:bg-gray-200 sm:w-full md:w-auto'
  >
    <img
      src='/Close.svg'
      alt='icon'
      className='mr-2 h-4 w-4 object-cover'
    />
    Cerrar
  </Link>
)}
        </div>
      </div>

          <div>
            <div className='mt-4 flex flex-col justify-around space-y-2 md:flex-row md:space-y-0'>
              <div className='flex flex-col items-center p-2 text-center'>
                <div
                  className={`${getStatusClasses('pending')} mb-3`}
                  onMouseEnter={() => setShowPendingTime(true)}
                  onMouseLeave={() => setShowPendingTime(false)}
                >
                  <FaExclamationCircle className='mr-2 h-5 w-5' />
                  Abierto
                </div>
                {showPendingTime && (
                  <div>Tiempo en Abierto: {report.timeOpen}</div>
                )}
                <div className='hidden md:block'>ID Orden de Trabajo:</div>
                <span className='hidden md:block'>{report.orderNumber}</span>
              </div>
              <div className='flex flex-col items-center p-2 text-center'>
              <div className='flex flex-col items-center p-2 text-center'>
  {report.status === 'in-progress' ? (
    <motion.div
      className={`${getStatusClasses('in-progress')}`}
      onMouseEnter={() => setShowInProgressTime(true)}
      onMouseLeave={() => setShowInProgressTime(false)}
    >
      {/* Animación de carga usando Framer Motion */}
      <motion.div
        className="mr-2"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
        aria-label="Loading spinner" // Mejora de accesibilidad
      >
        <FaSpinner className="h-5 w-5" />
      </motion.div>
      <span>En Progreso</span>
    </motion.div>
  ) : (
    <div className={getStatusClasses('in-progress')}>
      <FaSpinner className="mr-2 h-5 w-5 text-gray-400" />
      <span>En Progreso</span>
    </div>
  )}
  
</div>
             
                <div className='hidden md:block'>Tiempo transcurrido:</div>
                <span className='hidden md:block'>{report.totalTime}</span>
              </div>
              <div className='flex flex-col items-center p-2 text-center'>
                <div className={`${getStatusClasses('completed')} mb-3`}>
                  <FaCheckCircle className='mr-2 h-5 w-5' />
                  Completado
                </div>
                <div className='hidden md:block'>Fecha:</div>
                <span className='hidden md:block'>{date}</span>
              </div>
            </div>

            <div className='mt-2 flex flex-col justify-around space-y-2 md:hidden md:flex-row md:space-y-0'>
              <div className='flex flex-col p-2 text-center'>
                <div>ID Orden de Trabajo:</div>
                <span>{report.orderNumber}</span>
              </div>
              <div className='flex flex-col p-2 text-center'>
                <div>Tiempo transcurrido:</div>
                <span>{report.totalTime}</span>
              </div>
              <div className='flex flex-col p-2 text-center'>
                <div>Fecha:</div>
                <span>{date}</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center border-t-2 p-2 md:flex-row'>
            <div>
              <div className='mb-2'>
                <span className='font-semibold'>Reportado por:</span>
              </div>
              <div className='rounded-lg bg-white p-4 text-sm shadow-md'>
                <div className='flex items-center space-x-4'>
                  <img
                    src={report.user.photo || 'profilepic3.png'}
                    alt='User avatar'
                    className='h-12 w-12 rounded-full object-cover'
                  />
                  <div>
                    <p className='font-medium text-gray-800'>
                      {report.user.name}
                    </p>
                    <p className='text-gray-600'>{report.user.role}</p>
                    <p className='text-sm text-gray-500'>{report.user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='mx-4 h-auto border-l-2'></div>

            <div className='mt-5 max-w-sm rounded-lg bg-white p-6 shadow-md'>
              <div className='mb-2 mt-2 flex flex-col p-2'>
                <span className='font-semibold'>Dirección:</span>
                <span>{report.equipment.location}</span>
              </div>
              <div className='mb-2 mt-2 flex flex-col p-2'>
                <span className='font-semibold'>Compañía:</span>
                <span>{report.user.company.name}</span>
              </div>
            </div>
          </div>

          <div>
      <div className='text-md mb-2 p-6 font-semibold'>Descripción:</div>
      <div className='mx-2 rounded bg-gray-200 p-2 md:mx-6'>
        {report.description}
      </div>
      <div className='my-2 flex justify-center'>
        <img
          src={report.image ? report.image : '/noimg3.jpg'}
          alt='report-image'
          className='m-1 h-24 w-24 rounded-lg object-cover cursor-pointer'
          onClick={handleImageClick} // Al hacer clic, abrir la imagen grande
        />
      </div>

      {/* Modal para ver la imagen en grande */}
      {isImageOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={report.image ? report.image : '/noimg3.jpg'}
              alt="large-report-image"
              className="md:h-[50vh] md:w-[50vw]  max-h-[90vh]  max-w-[90vw] object-contain rounded-lg"
            />
            <button
              onClick={handleCloseImage}
              className="absolute top-0 right-0 p-2 text-white bg-black rounded-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>

          <div className='mx-4 my-4 h-auto border-b-2'></div>

          {/* Comments Section */}
          <div id='comments-section' className='bg-white p-6'>
            <h3 className='mb-4 text-xl font-semibold text-gray-800'>
              Comentarios
            </h3>

            <div className='mb-6 space-y-4'>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment._id}
                    className={`flex items-start space-x-4 rounded-lg bg-gray-50 p-4 transition-all duration-300 hover:bg-gray-100 ${
                      comment.author._id === report.user._id ||
                      comment.author._id === report.assignedTo
                        ? 'flex-row'
                        : 'flex-row-reverse'
                    }`}
                  >
                    <img
                      src={comment.author.photo || '/profilepic3.png'}
                      alt='user-avatar'
                      className='h-10 w-10 rounded-full object-cover'
                    />
                    <div
                      className={`text-left ${comment.author._id === report.user._id || comment.author._id === report.assignedTo ? '' : 'px-4 text-right'}`}
                    >
                      <div className='text-sm font-semibold text-gray-800'>
                        {comment.author.name}
                      </div>
                      <span className='text-sm text-gray-500'>
                        {<CommentTime createdAt={comment.created_at} />}
                      </span>
                      <p className='mt-1 text-gray-700'>{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay comentarios aún.</p>
              )}
            </div>

            <form
              onSubmit={handleCommentSubmit}
              className='mt-4 flex space-x-2'
            >
              <input
                type='text'
                placeholder='Escribe un comentario...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className='w-full rounded-md border border-gray-300 p-2 focus:outline-none'
              />
              <button
                type='submit'
                className='flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                <FaPaperPlane className='mr-2' /> Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusDetailLayout
