/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react'
import { FaEdit, FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
import {
  fetchUserData,
  updateUserData,
  cancelSubscription,
  reactivateSubscription,
  fetchUserProfile
} from '../pages/api/api'

const UserProfile = () => {
  const [user, setUser] = useState({
    company: '',
    email: '',
    password: '',
    subscription: '',
    phone: '',
    address: '',
    startDate: '',
    endDate: '',
    subscriptionId: '' // Agrega el ID de la suscripción
  })

  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [editMode, setEditMode] = useState({
    phone: false,
    address: false
  })

  const [errors, setErrors] = useState({
    phone: '',
    address: ''
  })

  const [loading, setLoading] = useState(true) // Estado para manejar la carga
  const [apiError, setApiError] = useState(null) // Estado para manejar errores de la API
  const [userRole, setUserRole] = useState('') // Estado para el rol del usuario

  const router = useRouter() // Hook para redirección

  // Función para obtener datos de la API
  const loadUserData = async () => {
    try {
      const userData = await fetchUserData()
      console.log('Datos de usuario cargados:', userData) // Verificar si los datos se cargan correctamente
      setUser(userData)
      setLoading(false)
    } catch (error) {
      setApiError(error.message)
      setLoading(false)
    }
  }

  // Función para obtener el perfil del usuario
  const loadUserProfile = async () => {
    try {
      const profileData = await fetchUserProfile()
      console.log('Perfil de usuario:', profileData)
      setUserRole(profileData.data.role)
      // Asignar el correo y contraseña al perfil del usuario autenticado
      setUserProfile({
        name: profileData.data.name,
        email: profileData.data.email,
        password: profileData.data.password,
        company: profileData.data.company.name
      })
    } catch (error) {
      setApiError(error.message)
    }
  }

  // Llama a loadUserData y loadUserProfile en el lugar adecuado, por ejemplo, en un useEffect
  useEffect(() => {
    loadUserData()
    loadUserProfile()
  }, [])

  // Función para actualizar datos en la API
  const handleUpdateUserData = async (data) => {
    try {
      const updatedData = await updateUserData(data)
      setUser((prevUser) => ({
        ...prevUser,
        phone: updatedData.phone,
        address: updatedData.address
      }))
    } catch (error) {
      setApiError(error.message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm()

  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/150'
  )

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true })
  }

  const handleChange = (e, field) => {
    const value = e.target.value
    setUser({ ...user, [field]: value })
    validateField(field, value)
  }

  const validateField = (field, value) => {
    let error = ''
    switch (field) {
      case 'phone':
        if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be 10 digits'
        }
        break
      default:
        break
    }
    setErrors({ ...errors, [field]: error })
  }

  const handleSave = (field) => {
    if (!errors[field]) {
      setEditMode({ ...editMode, [field]: false })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      const result = await cancelSubscription(user.subscriptionId)
      console.log('Suscripción cancelada:', result)
      setUser((prevUser) => ({
        ...prevUser,
        subscription: 'Inactiva'
      }))
      checkSubscriptionStatus()
      router.push('/ticketsDashboard') // Llamar a la función para aplicar la lógica
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const checkSubscriptionStatus = useCallback(() => {
    if (user.subscription === 'Inactiva') {
      setUser((prevUser) => ({
        ...prevUser,
        startDate: '-',
        subscription: `Cancelada, activa hasta ${prevUser.endDate}`
      }))
    }
  }, [user.subscription]) // Las dependencias son los valores que utiliza internamente

  // Llama a `checkSubscriptionStatus` dentro del useEffect
  useEffect(() => {
    checkSubscriptionStatus()
  }, [checkSubscriptionStatus])

  const handleReactivateSubscription = async () => {
    try {
      const result = await reactivateSubscription(user.subscriptionId)
      console.log('Suscripción reactivada:', result)

      if (
        result.message ===
        'Subscription reactivated and database updated successfully'
      ) {
        setUser((prevUser) => ({
          ...prevUser,
          subscription: 'Activa'
        }))
        router.push('/ticketsDashboard') // Redirigir después de reactivar
      } else {
        console.error('Error al reactivar la suscripción:', result.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const renderField = (field, label, type = 'text', editable = true) => (
    <div className='mb-4' key={field}>
      <label
        htmlFor={field}
        className='mb-1 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type={type}
          id={field}
          name={field}
          {...register(field)} // Usamos register
          defaultValue={
            // Usamos defaultValue en lugar de value
            userRole === 'admin'
              ? (user[field] ?? '') // Si es admin, usa el estado "user"
              : (userProfile[field] ?? '') // Si no, usa el estado "userProfile"
          }
          disabled={!editable || !editMode[field]}
          className={`w-full border px-3 py-2 ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${editMode[field] ? 'bg-white' : 'bg-gray-100'}`}
          aria-label={label}
        />
        {editable && (
          <button
            type='button'
            onClick={() =>
              editMode[field] ? handleSave(field) : handleEdit(field)
            }
            className='absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500 transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none'
            aria-label={editMode[field] ? 'Save' : 'Edit'}
          >
            {editMode[field] ? <FaCheck /> : <FaEdit />}
          </button>
        )}
      </div>
      {(errors[field] || formErrors[field]) && (
        <p className='mt-1 text-sm text-red-600' id={`${field}-error`}>
          {errors[field] || 'This field is required'}
        </p>
      )}
    </div>
  )

  // Mostrar un estado de carga o error si hay un problema al obtener los datos
  if (loading) {
    return <div>Cargando datos...</div>
  }

  if (apiError) {
    return <div>Error: {apiError}</div>
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='animate-fadeIn h-[40rem] w-full max-w-2xl space-y-8 overflow-y-auto rounded-lg bg-white p-8 shadow-xl scrollbar-hide'>
        {/* Encabezado con imagen */}
        <div className='text-center'>
          <div className='relative inline-block'>
            <img
              src={profileImage}
              alt='Company Logo'
              className='mx-auto h-32 w-32 transform rounded-full object-cover shadow-lg transition duration-300 ease-in-out hover:scale-105'
            />
            <label
              htmlFor='profile-image-upload'
              className='absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white transition duration-300 ease-in-out hover:bg-blue-600'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </label>
            <input
              id='profile-image-upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
            />
          </div>
          <h2 className='mt-4 text-3xl font-bold text-gray-900'>
            Company Profile
          </h2>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(handleUpdateUserData)}
          className='space-y-6'
        >
          {renderField('company', 'Company Name', 'text', false)}
          {userRole === 'admin' ? (
            <>
              {renderField('email', 'Email', 'email', false)}
              {renderField('password', 'Password', 'password', false)}
              {renderField('subscription', 'Subscription', 'text', false)}
              {renderField('phone', 'Phone', 'tel', true)}
              {renderField('address', 'Address', 'text', true)}
              {renderField('startDate', 'Start Date', 'text', false)}
              {renderField('endDate', 'End Date', 'text', false)}
            </>
          ) : (
            <>
              {renderField('name', 'Name', 'text', false)}
              {renderField('email', 'Email', 'email', false)}
              {renderField('password', 'Password', 'password', false)}
            </>
          )}
          <button
            type='submit'
            className='w-full rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600'
          >
            Save All Changes
          </button>
        </form>
        {userRole === 'admin' && (
          <>
            <button
              onClick={handleCancelSubscription}
              className='mt-4 w-full rounded-md bg-red-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-red-600'
            >
              Cancel Subscription
            </button>
            <button
              onClick={handleReactivateSubscription}
              className='mt-4 w-full rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-green-600'
            >
              Reactivate Subscription
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default UserProfile
