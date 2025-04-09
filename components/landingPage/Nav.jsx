import { useState } from 'react'
import emailjs from 'emailjs-com'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const isSunday = (dateString) => {
    const date = new Date(dateString)
    return date.getDay() === 0 // 0 corresponde a domingo
  }

  const isValidTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours >= 9 && (hours < 20 || (hours === 20 && minutes === 0)) // Entre 9:00 y 20:00
  }

  const sendEmail = (e) => {
    e.preventDefault()

    if (isSunday(formData.date)) {
      alert('No se pueden agendar demos los domingos.')
      return
    }

    if (!isValidTime(formData.time)) {
      alert('El horario debe estar entre las 9:00 AM y las 8:00 PM.')
      return
    }

    const serviceId = 'service_b41h2e5'
    const templateId = 'template_wzg9xkj'
    const userId = 'z2U466-wfiojGUUIA'

    emailjs
      .send(serviceId, templateId, formData, userId)
      .then((response) => {
        alert(
          '¡Correo enviado exitosamente, nos pondremos en contacto contigo lo mas pronto posible!'
        )
        setFormData({
          name: '',
          lastname: '',
          email: '',
          phone: '',
          date: '',
          time: ''
        })
        setShowForm(false)
      })
      .catch((error) => {
        alert('Hubo un error al enviar el correo.')
        console.error(error)
      })
  }

  return (
    <nav className='flex h-[80px] bg-white p-2 shadow-lg md:justify-between'>
      <div className='mr-4 flex items-center justify-center md:w-[17rem]'>
        <img src='/logoManteniPro.svg' alt='Logo ManteniPro' />
      </div>

      <div className='flex items-center space-x-2 md:space-x-4'>
        <Link href='/inicioSesion'>
          <button className='whitespace-nowrap rounded-xl border-[1px] border-gray-700 p-[10px_20px] text-xs font-medium text-gray-900 hover:bg-gradient-to-r hover:from-[#21262D] hover:to-[#414B66] hover:text-white md:text-base'>
            Iniciar Sesión
          </button>
        </Link>

        <Link href='/registroUsuario'>
          <button className='rounded-xl border-[1px] border-gray-700 p-[10px_20px] text-xs font-medium text-gray-900 hover:bg-gradient-to-r hover:from-[#21262D] hover:to-[#414B66] hover:text-white md:text-base'>
            Registrarme
          </button>
        </Link>

        {/* <button
          onClick={() => setShowForm(!showForm)}
          className='rounded-xl text-gray-900 border-[1px] border-gray-700 p-[10px_20px] md:text-base text-xs font-medium hover:bg-gradient-to-r hover:from-[#21262D] hover:to-[#414B66] hover:text-white'>
          Agendar Demo
        </button> */}
      </div>

      {showForm && (
        <div className='absolute right-[10px] top-[90px] w-[300px] rounded-lg bg-white p-6 shadow-lg md:w-[400px]'>
          <h2 className='mb-4 text-xl font-semibold'>Agendar Demo</h2>
          <form onSubmit={sendEmail}>
            <div className='mb-3'>
              <label className='block text-sm font-medium'>Nombre</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full rounded-lg border p-2'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-medium'>Apellido</label>
              <input
                type='text'
                name='lastname'
                value={formData.lastname}
                onChange={handleInputChange}
                className='w-full rounded-lg border p-2'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-medium'>Correo</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full rounded-lg border p-2'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-medium'>Teléfono</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                className='w-full rounded-lg border p-2'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-medium'>Fecha</label>
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
                className='w-full rounded-lg border p-2'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='block text-sm font-medium'>Hora</label>
              <input
                type='time'
                name='time'
                value={formData.time}
                onChange={handleInputChange}
                className='w-full rounded-lg border p-2'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full rounded-lg bg-gradient-to-r from-[#21262D] to-[#414B66] p-2 text-white'
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </nav>
  )
}
