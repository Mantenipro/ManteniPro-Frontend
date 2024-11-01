import React, { useState, useEffect } from 'react'
import { ImSpinner8 } from 'react-icons/im'
import { toast } from 'sonner'
import { FiCheckCircle } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { resendActivationCode } from '../pages/api/api'

const ResendActivationCode = ({ textColor, bgColor }) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (value && !validateEmail(value)) {
      setError('Por favor ingrese un correo electrónico válido')
    } else {
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('El correo electrónico es requerido')
      return
    }
    if (!validateEmail(email)) {
      setError('Por favor ingrese un correo electrónico válido')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Simular llamada a API
      const response = await resendActivationCode(email)
      console.log(response)
      if (response.success) {
        setIsSuccess(true)
        setEmail('')
        // Iniciar el contador de 5 segundos
        const interval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
              clearInterval(interval)
              window.close() // Cerrar la ventana después de 5 segundos
            }
            return prevCountdown - 1
          })
        }, 1000)
      } else {
        setError(
          response.message || 'Ocurrió un error. Por favor intente nuevamente.'
        )
        toast.error(
          response.message || 'Ocurrió un error. Por favor intente nuevamente.'
        )
      }
    } catch (error) {
      setError('Ocurrió un error. Por favor intente nuevamente.')
      toast.error('Ocurrió un error. Por favor intente nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full p-8'>
        <h2 className={`mb-6 text-2xl font-bold ${textColor} text-center`}>
          Reenviar Código de Activación
        </h2>

        {isSuccess ? (
          <div className='text-center' role='alert'>
            <FiCheckCircle className='mx-auto mb-4 text-5xl text-green-500' />
            <p className={`text-lg ${textColor}`}>
              ¡El código de activación ha sido enviado exitosamente!
            </p>
            <p className={`text-lg ${textColor}`}>
              La ventana se cerrará automáticamente en {countdown} segundos.
            </p>
            <button
              onClick={() => window.close()} // Cerrar la ventana manualmente
              className='mt-6 rounded-lg bg-[#EEE727] px-6 py-2 text-black transition-all duration-300 hover:bg-[#FFEE00]'
              aria-label='Cerrar ventana'
            >
              Cerrar Ventana
            </button>
            <button
              onClick={() => router.push('/inicioSesion')} // Redirigir a la página de inicio de sesión
              className='ml-4 mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white transition-all duration-300 hover:bg-blue-700'
              aria-label='Iniciar sesión'
            >
              Iniciar Sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className={`mb-1 block text-sm font-medium text-gray-700 ${textColor}`}
              >
                Correo Electrónico
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={handleEmailChange}
                className={`w-full rounded-lg border px-4 py-2 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                placeholder='ejemplo@correo.com'
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'email-error' : undefined}
                disabled={isLoading}
              />
              {error && (
                <p
                  id='email-error'
                  className='mt-2 text-sm text-red-600'
                  role='alert'
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='flex w-full items-center justify-center rounded-lg bg-[#EEE727] px-6 py-3 text-black transition-all duration-300 hover:bg-[#FFEE00] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              disabled={isLoading || !!error}
            >
              {isLoading ? (
                <>
                  <ImSpinner8 className='mr-2 animate-spin' />
                  Enviando...
                </>
              ) : (
                'Enviar Código de Activación'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResendActivationCode
