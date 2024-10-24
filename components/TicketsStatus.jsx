import React, { useState, useEffect } from 'react'
import TicketCard from './TicketCard'
import { fetchUserProfile } from '../pages/api/api'

const TicketsStatus = ({
  ticketsPorHacer,
  ticketsEnProceso,
  ticketsCompletados
}) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [userRole, setUserRole] = useState('')

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
        console.error('Error fetching user profile:', error)
      }
    }

    fetchUserProfileData()
  }, [])

  const sections =
    userRole === 'admin'
      ? [
          { title: 'Por hacer', tickets: ticketsPorHacer },
          { title: 'En proceso', tickets: ticketsEnProceso },
          { title: 'Completados', tickets: ticketsCompletados }
        ]
      : userRole === 'tecnico'
        ? [
            { title: 'Por hacer', tickets: ticketsPorHacer },
            { title: 'Completados', tickets: ticketsCompletados }
          ]
        : [
            { title: 'En proceso', tickets: ticketsEnProceso },
            { title: 'Completados', tickets: ticketsCompletados }
          ]

  const handleNextSection = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length)
  }

  const handlePrevSection = () => {
    setCurrentSection(
      (prevSection) => (prevSection - 1 + sections.length) % sections.length
    )
  }

  return (
    <div className='rounded-lg bg-[#F5F5F5] p-4'>
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
        <StatusColumn
          title={sections[currentSection].title}
          tickets={sections[currentSection].tickets}
          handleNextSection={handleNextSection}
          handlePrevSection={handlePrevSection}
          showNavigation={true}
        />

        {userRole === 'admin' && (
          <div className='hidden md:block'>
            <StatusColumn title='En proceso' tickets={ticketsEnProceso} />
          </div>
        )}
        <div className='hidden md:block'>
          <StatusColumn title='Completados' tickets={ticketsCompletados} />
        </div>
      </div>
    </div>
  )
}

const StatusColumn = ({
  title,
  tickets,
  handleNextSection,
  handlePrevSection,
  showNavigation
}) => (
  <div className='group flex flex-col items-center'>
    <div className='mb-4 flex w-full items-center justify-between'>
      {showNavigation && (
        <button
          onClick={handlePrevSection}
          className='block rounded-full bg-gray-200 p-2 md:hidden'
        >
          <img
            src='/icon/left-arrow-icon.png'
            alt='Left arrow'
            className='h-4 w-4'
          />
        </button>
      )}
      <div className='flex flex-grow items-center justify-center'>
        <span className='mr-2 h-3 w-3 rounded-full bg-gradient-to-r from-[#21262D] to-[#414B66]'></span>
        <h2 className='text-center text-xl font-semibold'>{title}</h2>
      </div>

      {showNavigation && (
        <button
          onClick={handleNextSection}
          className='block rounded-full bg-gray-200 p-2 md:hidden'
        >
          <img
            src='/icon/right-arrow-icon.png'
            alt='Right arrow'
            className='h-4 w-4'
          />
        </button>
      )}
    </div>

    <div className='h-1 w-full scale-x-0 transform bg-gradient-to-r from-[#21262D] to-[#414B66] transition-all duration-300 group-hover:scale-x-100'></div>

    <div
      className={`scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mt-4 w-full overflow-y-auto group-hover:bg-opacity-100`}
      style={{ height: '60vh' }}
    >
      <div className='flex flex-col items-center'>
        {tickets.length === 0 ? (
          <p>No hay tickets para mostrar</p>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              title={ticket.title}
              description={ticket.description}
              username={ticket.username}
              date={ticket.date}
              priority={ticket.priority}
              ticketId={ticket.ticketId}
            />
          ))
        )}
      </div>
    </div>

    <style jsx>{`
      @media (max-width: 640px) {
        div[style] {
          height: 65vh !important; /* Ajuste al 75% para pantallas móviles */
        }
      }
    `}</style>
  </div>
)

export default TicketsStatus
