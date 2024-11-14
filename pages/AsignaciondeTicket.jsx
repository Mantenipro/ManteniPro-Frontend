/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useState, useEffect } from 'react'
import LefthDashboard from '@/components/LefthDashboard'
import { Montserrat, Source_Sans_3 } from 'next/font/google'
import { useRouter } from 'next/router'
import { getReportById, addAssignment } from './api/api'
import TecnicoSelect from '../components/TecnicoSelect'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { MdArrowBackIosNew } from 'react-icons/md'

const montserrat = Montserrat({ subsets: ['latin'] })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'] })

export default function AsignaciondeTicket() {
    const { register, setValue, handleSubmit } = useForm()
  const [showProfilesMenu, setShowProfilesMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const [initialData, setInitialData] = useState(null)

  const { ticketId } = router.query

  useEffect(() => {
    const fetchData = async () => {
      if (ticketId) {
        console.log('ticketId:', ticketId)
        const data = await getReportById(ticketId)
        setInitialData(data)
      }
    }
    fetchData()
  }, [ticketId])
  
  const report = initialData?.data?.report

  if (!initialData) {
    return <p>Cargando datos...</p>
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfilesMenu = () => {
    setShowProfilesMenu(!showProfilesMenu)
  }

  const handleBack = () => {
    router.back()
  }

  const onSubmit = async (data) => {
    console.log('Asignar a:', data.assignTo)
    console.log('Fecha de Inicio:', data.startDate)
    console.log('Prioridad:', data.priority)

    data.status = 'in-progress'
    try {
        await addAssignment(data.assignTo, ticketId, data.priority, data.status )
        toast.success('Asignación realizada con éxito', {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto'
          }
        })
        setTimeout(() => {
          router.push('/ticketsDashboard') // Redirige al usuario para que cambie la contraseña
        }, 2000)
    } catch (error) {
        console.error('Error al realizar la asignación:', error.message)
        toast.error(error.message, {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto'
          }
        })
    }
  }

    return (
      <div
        className={`${montserrat.className} relative flex h-dvh flex-row lg:flex-grow`}
      >
        <Toaster />{' '}
        <div
          className={`${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed z-40 h-full w-[50%] transform bg-gradient-to-b from-[#31416d] to-[#232c48] transition-transform duration-300 ease-in-out md:w-[30%] lg:static lg:w-[15%] lg:translate-x-0`}
        >
          <LefthDashboard />
        </div>
        <main className='flex-1 p-6'>
          <div className='flex items-center justify-between'>
            <div className='left-4 top-4 z-50 lg:hidden'>
              <button
                onClick={toggleMenu}
                className='flex h-10 w-10 items-center justify-center rounded-md bg-[#21262D] p-2 text-white focus:outline-none'
              >
                {isMenuOpen ? '✖' : '☰'}
              </button>
            </div>
            <button
              onClick={handleBack}
              className='absolute right-[1.5rem] top-[1.5rem] z-50 flex h-10 w-10 items-center justify-center rounded-md bg-[#21262D] p-2 text-white focus:outline-none lg:static lg:ml-4'
            >
              <MdArrowBackIosNew className='h-5 w-5' />
            </button>
          </div>

          <div>
            <h1
              className={`mb:text-left mb-2 ml-3 my-4 text-center text-3xl font-bold ${montserrat.className}`}
              style={{ color: '#2E3A59' }}
            >
              Asignacion de Ticket
            </h1>
          </div>

          <section className='mx-auto max-w-lg overflow-y-auto rounded bg-[#F5F5F5] p-4 text-sm shadow-md md:h-[550px] md:w-2/3'>
            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='images'
              >
                Imágenes (Arrastrar o agregar imagenes)
              </label>
              <input
                type='file'
                id='images'
                className='w-full rounded border p-2'
                multiple
              />
            </div>

            {/* <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='description'
              >
                Descripcion
              </label>
              <textarea
                id='description'
                className='w-full rounded border p-2'
                rows='4'
                placeholder='Equipo cuenta con el problema.....'
              >
                {report.description}
              </textarea>
            </div> */}

            <div className='mb-4'>
              <label
                className='mb-2 block font-bold text-gray-700'
                htmlFor='location'
              >
                Localización
              </label>
              <input
                type='text'
                id='location'
                className='w-full rounded border p-2'
                value={report.equipment.location}
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label
                  className='mb-2 block font-bold text-gray-700'
                  htmlFor='assignTo'
                >
                  Asignar a
                </label>
                <TecnicoSelect register={register} setValue={setValue} />
              </div>
              <div className='mb-4'>
                <label
                  className='mb-2 block font-bold text-gray-700'
                  htmlFor='startDate'
                >
                  Fecha de Inicio
                </label>
                <input
                  type='date'
                  id='startDate'
                  className='w-full rounded border p-2'
                  {...register('startDate', { required: true })}
                  min={new Date().toISOString().split('T')[0]} // Establecer la fecha mínima a hoy
                />
              </div>
              <div className='mb-4'>
                <label
                  className='mb-2 block font-bold text-gray-700'
                  htmlFor='priority'
                >
                  Prioridad
                </label>
                <select
                  id='priority'
                  className='w-full rounded border p-2'
                  {...register('priority', { required: true })}
                >
                  <option value='baja'>Baja</option>
                  <option value='media'>Media</option>
                  <option value='alta'>Alta</option>
                </select>
              </div>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                >
                  Asignar
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    )
 }