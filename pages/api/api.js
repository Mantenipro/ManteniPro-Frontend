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