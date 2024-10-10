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


export const createPaymentIntent = async () => {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount: 1000, currency: 'usd' }) // Example amount and currency
  })

  const data = await response.json()
  setClientSecret(data.clientSecret)
}