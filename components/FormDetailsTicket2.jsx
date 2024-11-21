import React, { useEffect, useState } from 'react'
import { Source_Sans_3 } from 'next/font/google'
import { FaExclamationCircle, FaSpinner, FaCheckCircle, FaPaperPlane } from 'react-icons/fa'
import { fetchComments, addComment } from '../pages/api/api'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

const StatusDetailLayout = ({ initialData }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const report = initialData?.data?.report

  useEffect(() => {
    if (report) {
      const interval = setInterval(async () => {
        try {
          const fetchedComments = await fetchComments(report._id)
          setComments(Array.isArray(fetchedComments) ? fetchedComments : [])
        } catch (error) {
          console.error('Error fetching comments:', error)
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [report])

  if (!report) {
    return <div>Loading...</div>
  }

  const date = new Date(report.created_at).toLocaleDateString()

  const getStatusClasses = (status) => {
    return status === report.status
      ? 'flex items-center rounded border-4 border-[#FFD700] bg-[#051540] p-2 text-[#EEE727]'
      : 'flex items-center rounded border-2 border-[#21262D] p-2 text-[#21262D]'
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const newCommentObj = await addComment(report._id, newComment)

      if (newCommentObj) {
        setComments((prevComments) => [...prevComments, newCommentObj])
        setNewComment('')
      }
    } catch (error) {
      console.error('Error al enviar el comentario:', error)
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
      <div className='animate-fadeIn max-h-screen space-y-4 overflow-y-auto scrollbar-hide md:h-[560px] md:w-3/4'>
        <div className='rounded border p-2 shadow-lg'>
          <div className='flex flex-col justify-between rounded border-b-2 p-2 md:flex-col md:items-center'>
            <div>
              <h3 className='p-2 text-lg font-bold'>{report.title}</h3>
            </div>
          </div>

          <div>
            <div className='mt-4 flex flex-col justify-around space-y-2 md:flex-row md:space-y-0'>
              <div className='flex flex-col items-center p-2 text-center'>
                <div className={`${getStatusClasses('pending')} mb-3`}>
                  <FaExclamationCircle className='mr-2 h-5 w-5' />
                  Abierto
                </div>
                <div className='hidden md:block'>ID Orden de Trabajo:</div>
                <span className='hidden md:block'>{report.orderNumber}</span>
              </div>
              <div className='flex flex-col items-center p-2 text-center'>
                <div className={`${getStatusClasses('in-progress')} mb-3`}>
                  <FaSpinner className='mr-2 h-5 w-5' />
                  En Progreso
                </div>
                <div className='hidden md:block'>Tiempo transcurrido:</div>
                <span className='hidden md:block'>{report.timeOpen}</span>
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
                <span>{report.user.company.address}</span>
              </div>
              <div className='mb-2 mt-2 flex flex-col p-2'>
                <span className='font-semibold'>Compañía:</span>
                <span>{report.user.company.name}</span>
              </div>
            </div>
          </div>

          <div>
  <div className="text-md mb-2 p-6 font-semibold">Descripción:</div>
  <div className="mx-2 rounded bg-gray-200 p-2 md:mx-6">
    {report.description}
  </div>
  <div className="my-2 flex justify-center">
    <img
      src={report.image ? report.image : '/noimg3.jpg'}
      alt="report-image"
      className="m-1 h-24 w-24 rounded-lg object-cover "
    />
  </div>
</div>

        
        
        </div>
      </div>
    </div>
  )
}

export default StatusDetailLayout
