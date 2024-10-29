import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { activateAccountUser } from '../pages/api/api'

const AccountActivation = ({ textColor, bgColor }) => {
  const [activationCode, setActivationCode] = useState(Array(6).fill(''))
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()))
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].current.focus()
    }
  }, [])

  useEffect(() => {
    if (router.isReady && router.query.token) {
      const { token } = router.query
      setToken(token)
    }
  }, [router.isReady, router.query])

  const handleCodeChange = (index, value) => {
    const newValue = value.replace(/\D/g, '')
    if (newValue.length <= 1) {
      const newCode = [...activationCode]
      newCode[index] = newValue
      setActivationCode(newCode)
      setError('')
      setIsValid(newCode.every((digit) => digit !== ''))

      if (newValue.length === 1 && index < 5) {
        inputRefs.current[index + 1].current.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !activationCode[index] && index > 0) {
      inputRefs.current[index - 1].current.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '')
    if (pastedData.length === 6) {
      const newCode = pastedData.split('')
      setActivationCode(newCode)
      setIsValid(true)
      setError('')
      inputRefs.current[5].current.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) {
      setError('Por favor ingresa un código de 6 dígitos')
      return
    }

    try {
      const activationCodeStr = activationCode.join('')
      const response = await activateAccountUser({
        token,
        activationCode: activationCodeStr
      })
      if (response.success) {
        toast.success('Cuenta activada exitosamente', {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto'
          }
        })

        setTimeout(() => {
          router.push('/inicioSesion')
        }, 1000) // Redirigir a la página de inicio de sesión
      } else {
        toast.error(response.message || 'Error al activar la cuenta', {
          position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
          style: {
            fontSize: '20px',
            padding: '20px',
            maxWidth: '90vw',
            width: 'auto'
          }
        })
      }
    } catch (error) {
      toast.error(error.message || 'Error al activar la cuenta', {
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
    <div className={`flex items-center justify-center p-4`}>
      <div className='w-full max-w-md space-y-6 rounded-xl p-8'>
        <div className='text-center'>
          <h1 className={`mb-6 text-3xl font-bold ${textColor}`}>
            Activa tu cuenta
          </h1>
          <p className={`mb-4 ${textColor}`}>
            Agrega los 6 dígitos que se enviaron a tu correo
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label
              htmlFor='activationCode'
              className={`block text-sm font-medium ${textColor}`}
            >
              Código de Activacion
            </label>
            <div className='flex justify-center gap-2'>
              {activationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs.current[index]}
                  type='text'
                  inputMode='numeric'
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className={`h-12 w-12 rounded-lg border-2 text-center text-xl font-semibold transition-colors duration-200 focus:outline-none ${
                    isValid && digit
                      ? 'border-green-500 focus:border-green-600'
                      : error
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-300 focus:border-blue-500'
                  }`}
                  maxLength='1'
                  aria-label={`Digit ${index + 1} of activation code`}
                />
              ))}
            </div>
            {error && (
              <p className='animate-fadeIn mt-1 text-sm text-red-500'>
                {error}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={!isValid}
            className={`w-full rounded-lg px-4 py-3 font-medium text-black transition-all duration-200 ${
              isValid
                ? 'transform bg-[#EEE727] hover:-translate-y-0.5 hover:bg-[#FFEE00]'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            Activar
          </button>
        </form>

        <div className={`text-center text-sm ${textColor}`}>
          No recibiste el código? &nbsp;
          <button
            onClick={() => router.push('/resendCodeEmail')}
            className={`font-medium text-blue-900 hover:text-blue-500 ${textColor}`}
          >
            Reenviar Código
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountActivation
