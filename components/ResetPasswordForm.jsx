import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { resetPassword } from '../pages/api/api'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

const ResetPasswordForm = ({ textColor, bgColor }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState(null)
  const router = useRouter()

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  // Esperar hasta que `router.query` esté disponible
  useEffect(() => {
    if (router.isReady) {
      const { q } = router.query
      setToken(q)
    }
  }, [router.isReady, router.query])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === 'password') {
      if (!validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password:
            'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
        }))
        toast.error(
          'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.',
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left',
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw',
              width: 'auto'
            }, duration: 1000
          }
        )
      } else {
        setErrors((prev) => ({ ...prev, password: '' }))
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: 'Las contraseñas no coinciden'
        }))
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!errors.password && !errors.confirmPassword) {
      setIsLoading(true)
      try {
        const response = await resetPassword({
          token: token,
          newPassword: formData.password
        })

        if (response.success) {
          toast.success('Contraseña cambiada exitosamente', {
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
          }, 3000)
          setIsSuccess(true)
        } else {
          toast.error('Error al cambiar la contraseña')
          setErrors((prev) => ({
            ...prev,
            root: {
              credentials: {
                type: 'manual',
                message: 'Error al cambiar la contraseña'
              }
            }
          }))
        }
      } catch (error) {
        toast.error('Error al cambiar la contraseña')
        console.error('[Change password error]', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full p-8'>
        <div className='text-center'>
          <h1 className={`mt-6 text-3xl font-extrabold ${textColor}`}>
            Restablecer contraseña
          </h1>
          <p className={`mt-2 text-sm ${textColor}`}>
            Ingrese su nueva contraseña a continuación
          </p>
        </div>

        {isSuccess ? (
          <div className='relative flex items-center justify-center space-x-2 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 transition-all duration-500 ease-in-out'>
            <FaCheckCircle className='text-green-500' />
            <span>Restablecimiento de contraseña exitoso!</span>
          </div>
        ) : (
          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-4 rounded-md shadow-sm'>
              <div className='relative'>
                <label htmlFor='password' className='sr-only'>
                  New Password
                </label>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`relative block w-full appearance-none rounded-lg border px-3 py-2 ${errors.password ? 'border-red-700' : 'border-gray-300'} text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:z-10 focus:border-green-600 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                  placeholder='Nueva contraseña
'
                  value={formData.password}
                  onChange={handleInputChange}
                  aria-label='New Password'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className='h-5 w-5 text-gray-400' />
                  ) : (
                    <FaEye className='h-5 w-5 text-gray-400' />
                  )}
                </button>
              </div>

              <div className='relative'>
                <label htmlFor='confirmPassword' className='sr-only'>
                  Confirm Password
                </label>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className={`relative block w-full appearance-none rounded-lg border px-3 py-2 ${errors.confirmPassword ? 'border-red-600' : 'border-gray-300'} text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:z-10 focus:border-green-600 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                  placeholder='Confirmar Contraseña'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  aria-label='Confirm Password'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className='h-5 w-5 text-gray-400' />
                  ) : (
                    <FaEye className='h-5 w-5 text-gray-400' />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className='mt-1 max-w-xs break-words text-xs text-red-500'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={
                  isLoading ||
                  Object.values(errors).some((error) => error !== '')
                }
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-[#EEE727] px-4 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-[#FFEE00] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300'
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin' />
                ) : (
                  'Enviar'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordForm
