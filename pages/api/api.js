const API_URL = 'http://localhost:8000'

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.error || 'Error al iniciar sesión')
  }

  return json.data.token
}

export const registerForm = async (
  email,
  password,
  fullname,
  companyName,
  zipCode
) => {
  try {
    const data = { email, password, fullname, companyName, zipCode }

    console.log(data)

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, fullname, companyName, zipCode })
    })

    if (!response.ok) {
      throw new Error('Error en el registro')
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la solicitud de registro:', error)
    throw error
  }
}

export const activateAccount = async (data) => {
  console.log(data)

  try {
    const response = await fetch(`${API_URL}/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Error al activar la cuenta')
    }

    return await response.json()
  } catch (error) {
    console.error('Error al activar la cuenta:', error)
    throw error
  }
}

export const recoverPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/requestPasswordReset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    // Log para verificar que la URL es correcta
    console.log('URL de solicitud:', `${API_URL}/requestPasswordReset`)

    if (!response.ok) {
      // Capturar el código de estado para más detalles
      const errorMessage = `Error al recuperar la contraseña: ${response.status} ${response.statusText}`
      console.error(errorMessage)
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    console.error('Error en la solicitud de recuperación de contraseña:', error)
    throw error
  }
}

export const resetPassword = async (data) => {
  console.log(data)

  try {
    const response = await fetch(`${API_URL}/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Error al restablecer la contraseña')
    }

    const result = await response.json()

    // Verificar si la respuesta es exitosa
    if (response.status === 200) {
      return {
        success: true,
        message: 'Contraseña restablecida exitosamente',
        data: result
      }
    }

    return result
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error)
    throw error
  }
}

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) {
      throw new Error('Error fetching products')
    }
    const products = await response.json()
    console.log('Products:', products)
    return products
  } catch (error) {
    console.error('Error:', error)
  }
}

export const createCheckoutSession = async (priceId) => {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ priceId }) // Enviamos el priceId al backend
  })

  return await response.json()
}

// api/api.js
export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/companies`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API')
    }

    const data = await response.json()

    const startDate = data.subscription_type
      ? new Date(data.subscription_type.currentPeriodStart).toLocaleDateString()
      : 'Fecha no disponible'
    const endDate = data.subscription_type
      ? new Date(data.subscription_type.currentPeriodEnd).toLocaleDateString()
      : 'Fecha no disponible'
    const subscriptionId = data.subscription_type
      ? data.subscription_type.stripeSubscriptionId
      : 'ID no disponible'

    return {
      company: data.name,
      email: data.email,
      password: data.password,
      subscription: data.isActive ? 'Activa' : 'Inactiva',
      phone: data.phone_number,
      address: data.address,
      startDate: startDate,
      endDate: endDate,
      subscriptionId: subscriptionId
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateUserData = async (data) => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/companies`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: data.phone,
        address: data.address
      })
    })

    if (!response.ok) {
      throw new Error('Error al actualizar los datos en la API')
    }

    const updatedData = await response.json()
    return {
      phone: updatedData.phone_number,
      address: updatedData.address
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const cancelSubscription = async () => {
  try {
    const response = await fetch(`${API_URL}/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subscriptionId: user.subscriptionId })
    })

    if (!response.ok) {
      throw new Error('Error al cancelar la suscripción')
    }

    const result = await response.json()
    console.log('Suscripción cancelada:', result)

    // Verificar si la suscripción se canceló correctamente
    if (
      result.message ===
      'Subscription suspended and database updated successfully'
    ) {
      // Actualiza el estado de la suscripción del usuario
      setUser({
        ...user,
        subscription: 'Cancelada, activa hasta ' + user.endDate // Actualiza el estado de la suscripción
      })
    } else {
      console.error('Error al cancelar la suscripción:', result.error)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

export const reactivateSubscription = async (subscriptionId) => {
  try {
    const response = await fetch(`${API_URL}/reactivate-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subscriptionId })
    })

    if (!response.ok) {
      throw new Error('Error al reactivar la suscripción')
    }

    const result = await response.json()
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorMessage = `Error fetching profile data: ${response.status} - ${response.statusText}`
      console.error(errorMessage)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    console.log('Profile data:', data) // Para ver qué datos se están recibiendo
    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw new Error(error.message)
  }
}