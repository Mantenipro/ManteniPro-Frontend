import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa'
import { ImSpinner8 } from 'react-icons/im'
import { changePassword } from '../pages/api/api'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/router'

const PasswordChangeForm = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const passwordRequirements = [
    { id: 1, text: 'Al menos 8 caracteres', regex: /.{8,}/ },
    { id: 2, text: 'Contiene letra mayúscula', regex: /[A-Z]/ },
    { id: 3, text: 'Contiene letra minúscula', regex: /[a-z]/ },
    { id: 4, text: 'Contiene números', regex: /[0-9]/ },
    { id: 5, text: 'Contiene un carácter especial', regex: /[!@#$%^&*]/ }
  ]

  const validatePassword = (password) => {
    return passwordRequirements.every((req) => req.regex.test(password))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  useEffect(() => {
    const newErrors = {}

    if (formData.newPassword) {
      if (!validatePassword(formData.newPassword)) {
        newErrors.newPassword = 'La contraseña no cumple los requisitos'
      }
    }

    if (
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
  }, [formData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsLoading(true)

    try {
      const result = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })

      if (result.success === true) {
        // Reset form after successful submission
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        toast.success(
          result.message || 'La contraseña se cambió correctamente',
          {
            position: window.innerWidth < 640 ? 'top-center' : 'bottom-left', // top-center para pantallas pequeñas
            style: {
              fontSize: '20px',
              padding: '20px',
              maxWidth: '90vw', // Ajuste para pantallas pequeñas
              width: 'auto'
            }
          },
          setTimeout(() => {
            router.push('/perfil') // Redirige al resetPassword después de enviar el correo
          }, 2000)
        )
      } else {
        // Handle errors returned by the API
        setErrors({ apiError: result.message || 'Error al cambiar la contraseña' })
        toast.error(result.message || 'Error al cambiar la contraseña')
      }
    } catch (error) {
      setErrors({ apiError: error.message })
      toast.error(error.message)
    } finally {
      setIsLoading(false)
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-100 p-4'>
      <Toaster />
      <div className='w-full max-w-2xl space-y-6 rounded-xl bg-white p-8 shadow-xl'>
        <h2 className='mb-8 text-center text-3xl font-bold text-gray-800'>
          Cambio de Contraseña
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Current Password Field */}
          <div className='relative'>
            <label
              htmlFor='currentPassword'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Contraseña actual
            </label>
            <div className='relative'>
              <input
                type={showPasswords.current ? 'text' : 'password'}
                id='currentPassword'
                name='currentPassword'
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'} transition-all focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label='Current Password'
                required
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('current')}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                aria-label={
                  showPasswords.current ? 'Hide password' : 'Show password'
                }
              >
                {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div>
            <label
              htmlFor='newPassword'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Nueva contraseña
            </label>
            <div className='relative'>
              <input
                type={showPasswords.new ? 'text' : 'password'}
                id='newPassword'
                name='newPassword'
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} transition-all focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label='New Password'
                required
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('new')}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                aria-label={
                  showPasswords.new ? 'Hide password' : 'Show password'
                }
              >
                {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className='mt-4 space-y-2'>
              {passwordRequirements.map((req) => (
                <div
                  key={req.id}
                  className='flex items-center text-sm'
                  aria-label={req.text}
                >
                  {formData.newPassword &&
                  req.regex.test(formData.newPassword) ? (
                    <FaCheck className='mr-2 text-green-500' />
                  ) : (
                    <FaTimes className='mr-2 text-red-500' />
                  )}
                  <span
                    className={
                      formData.newPassword &&
                      req.regex.test(formData.newPassword)
                        ? 'text-green-500'
                        : 'text-gray-500'
                    }
                  >
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor='confirmPassword'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Confirmar nueva contraseña
            </label>
            <div className='relative'>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full rounded-lg border px-4 py-3 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} transition-all focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-label='Confirm New Password'
                required
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('confirm')}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                aria-label={
                  showPasswords.confirm ? 'Hide password' : 'Show password'
                }
              >
                {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='mt-1 text-sm text-red-500' role='alert'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={
              isLoading ||
              Object.keys(errors).length > 0 ||
              !formData.currentPassword ||
              !formData.newPassword ||
              !formData.confirmPassword
            }
            className='flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isLoading ? (
              <>
                <ImSpinner8 className='animate-spin' />
                <span>Guardando...</span>
              </>
            ) : (
              'Cambiar Contraseña'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordChangeForm
