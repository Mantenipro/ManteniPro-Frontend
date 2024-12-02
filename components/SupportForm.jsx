import { useState, useEffect } from 'react'
import { supportTicket } from '@/pages/api/api'
import { fetchUserData } from '../pages/api/api'
import { FiCheckCircle } from 'react-icons/fi'

const SupportForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const data = await fetchUserData()
        setUserData(data)
        // Verificar si stripeCustomerId está presente, no solo isActive
        setIsSubscriptionActive(!!data?.stripeCustomerId) // Verifica si stripeCustomerId existe
      } catch (error) {
        //console.error('Error fetching subscription status:', error)
      }
    }
    fetchSubscriptionStatus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar si el usuario tiene suscripción activa
    if (!isSubscriptionActive) {
      alert('Esta característica se habilita al adquirir algún plan.')
      return
    }

    setStatus('loading')

    try {
      const response = await supportTicket(formData)

      if (response) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setShowSuccessModal(true)
        setTimeout(() => {
          setShowSuccessModal(false)
          closeModal()
        }, 5000)
      } else {
        throw new Error('Error al enviar el mensaje')
      }
    } catch (error) {
      //console.error('Error al enviar el mensaje:', error)
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md'
    >
      <label className='mb-4 block'>
        <span className='text-gray-700'>Nombre:</span>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
        />
      </label>
      <label className='mb-4 block'>
        <span className='text-gray-700'>Email:</span>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
        />
      </label>
      <label className='mb-4 block'>
        <span className='text-gray-700'>Mensaje:</span>
        <textarea
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
        />
      </label>
      <button
        type='submit'
        className='w-full rounded-md bg-[#f8f130] px-4 py-2 font-semibold text-black shadow-md hover:bg-[#ece74e] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar'}
      </button>

      {status === 'success' && <p>Mensaje enviado con éxito.</p>}
      {status === 'error' && <p>Hubo un error. Intenta de nuevo.</p>}

      {showSuccessModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='rounded-lg bg-white p-6 shadow-lg'>
            <FiCheckCircle className='mx-auto mb-4 text-5xl text-green-500' />
            <p className='text-center text-lg text-black'>
              ¡El mensaje se ha sido enviado exitosamente!
            </p>
          </div>
        </div>
      )}
    </form>
  )
}

export default SupportForm
