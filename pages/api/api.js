const API_URL = 'https://mantenipro-api-1tyv.onrender.com'

export async function login(email, password) {
  try {
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
      throw new Error(json.message || 'Error al iniciar sesión')
    }
    console.log('Respuesta de la API:', json)
    return json.data
  } catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error)
    throw error
  }
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

export const activateAccountUser = async (data) => {
  console.log(data)

  try {
    const response = await fetch(`${API_URL}/userActivate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Error al activar la cuenta')
    }

    return result
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

    const result = await response.json()

    if (!response.ok) {
      // Capturar el código de estado para más detalles
      const errorMessage = `Error al recuperar la contraseña: ${result.message}`
      console.error(errorMessage)
      throw new Error(errorMessage)
    }

    return result
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

export async function changePassword(data) {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/changePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Error al cambiar la contraseña')
    }

    return await response.json()
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error)
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
      : '-'
    const endDate = data.subscription_type
      ? new Date(data.subscription_type.currentPeriodEnd).toLocaleDateString()
      : '-'
    const subscriptionId = data.subscription_type
      ? data.subscription_type.stripeSubscriptionId
      : 'ID no disponible'
    const cancelAtPeriodEnd = data.subscription_type
      ? data.subscription_type.cancelAtPeriodEnd
      : false // Valor por defecto si es null o undefined

    return {
      company: data.name,
      email: data.email,
      password: data.password,
      subscription: data.isActive,
      phone: data.phone_number,
      address: data.address,
      startDate: startDate,
      endDate: endDate,
      subscriptionId: subscriptionId,
      cancelAtPeriodEnd: cancelAtPeriodEnd,
      hasReachedTicketLimit : data.subscription_type.hasReachedTicketLimit
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

export const updateUser = async (userId, userData) => {
  console.log('Datos del usuario:', userData)
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const updatedUser = await response.json()
    console.log('Usuario actualizado:', updatedUser)
    return { success: true, data: updatedUser }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Usuario eliminado:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    return { success: false, error: error.message }
  }
}

export const cancelSubscription = async (subscriptionId) => {
  try {
    const response = await fetch(`${API_URL}/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subscriptionId })
    })

    if (!response.ok) {
      throw new Error('Error al cancelar la suscripción')
    }

    const result = await response.json()
    console.log('Respuesta de la API:', result)
    return result
  } catch (error) {
    throw new Error(error.message)
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
    console.log('Respuesta de la API:', result)
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
    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw new Error(error.message)
  }
}

export const sendUserData = async (data) => {
  console.log('Datos enviados:', data)

  // Eliminar el campo 'photo' de los datos
  const { photo, ...dataWithoutPhoto } = data

  try {
    const token = localStorage.getItem('token') // Asumiendo que el token se guarda en localStorage

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Enviar el token en los headers
      },
      body: JSON.stringify(dataWithoutPhoto)
    })

    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }

    const result = await response.json()
    console.log('Respuesta de la API:', result)
    return result // Retornar la respuesta de la API
  } catch (error) {
    console.error('Error al enviar los datos:', error)
    return { success: false, error: error.message } // Retornar un objeto de error
  }
}

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token') // Reemplaza con tu token real
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log('Respuesta de la API:', data)
    if (data.success) {
      // Filtrar usuarios por rol
      const usuariosFiltrados = data.data.users.filter(
        (user) => user.role === 'usuario'
      )
      return usuariosFiltrados
    } else {
      console.error('Error al obtener usuarios:', data.error)
      return []
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error)
    return []
  }
}

export const fetchTechnician = async () => {
  try {
    const token = localStorage.getItem('token') // Reemplaza con tu token real
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log('Respuesta de la API:', data)
    if (data.success) {
      // Filtrar usuarios por rol
      const tecnicosFiltrados = data.data.users.filter(
        (user) => user.role === 'tecnico'
      )
      return tecnicosFiltrados
    } else {
      console.error('Error al obtener usuarios:', data.error)
      return []
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error)
    return []
  }
}

export const resendActivationCode = async (email) => {
  try {
    const response = await fetch(`${API_URL}/resend-activation-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        result.message || 'Error al reenviar el código de activación'
      )
    }

    return result
  } catch (error) {
    console.error('Error al reenviar el código de activación:', error)
    throw error
  }
}

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      return data
    } else {
      console.error('Error al obtener usuario:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error)
    return null
  }
}

export const fetchEquimentById = async (equipmentId) => {
  try {
    const response = await fetch(
      `http://localhost:8000/equipment/${equipmentId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      return data
    } else {
      console.error('Error al obtener equipo:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error)
    return null
  }
}

export const unlockUser = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/unlockUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    const data = await response.json()

    if (response.ok) {
      return { success: true, data }
      // Manejar la respuesta exitosa
      console.log('Usuario desbloqueado exitosamente')
    } else {
      return { success: false, error: data.message }
      // Manejar errores
      console.error('Error al desbloquear el usuario')
    }
  } catch (error) {
    return { success: false, error: error.message }
    console.error('Error al realizar la solicitud:', error)
  }
}

export const getReportById = async (reportId) => {
  try {
    const response = await fetch(`${API_URL}/report/${reportId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      return data
    } else {
      console.error('Error al obtener reporte:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error)
    return null
  }
}


export async function fetchComments(reportId) {
  try {
    const response = await fetch(`${API_URL}/comments?reportId=${reportId}`)
    if (!response.ok) {
      throw new Error('Error al obtener los comentarios')
    }
    const comments = await response.json()
    console.log(comments)
    return comments
  } catch (error) {
    console.error(error.message)
  }
}

export async function addComment(reportId, content) {
  const token = localStorage.getItem('token') // Obtener el token del almacenamiento local
  const data = {
    content: content
  }
  try {
    const response = await fetch(`${API_URL}/comments?reportId=${reportId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Error al agregar el comentario')
    }
    const newComment = await response.json()
    console.log(newComment)
  } catch (error) {
    console.error(error.message)
  }
}

export async function addAssignment(technicianId, reportId, priority, status) {
  const data = {
    technician: technicianId,
    report: reportId,
    priority: priority,
    status: status
  }

  try {
    const response = await fetch(`${API_URL}/assignment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Error al agregar la asignación')
    }

    const newAssignment = await response.json()
    console.log(newAssignment)
  } catch (error) {
    console.error(error.message)
  }
}

export const updateAssignment = async (assignmentId, solution, finishedAt, VaBo, token) => {
  try {
    const response = await fetch(`${API_URL}/assignments/${assignmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ solution, finishedAt, VaBo })
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || 'Error al actualizar la asignación');
    }
    
    console.log('Asignación actualizada:', json);
    return json;
  } catch (error) {
    console.error('Error en la solicitud de actualización:', error);
    throw error;
  }
};

export const updateAssignmentByReport = async (reportId, solution, finishedAt, VaBo, token) => {
  try {
    // Cuerpo de la solicitud con los datos que queremos actualizar
    const response = await fetch(`${API_URL}/assignment/byReport/${reportId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Agregado el encabezado de autorización con el token
      },
      body: JSON.stringify({ solution, finishedAt, VaBo }) // Enviar los datos para actualizar
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Error al actualizar la asignación por ID de reporte')
    }

    return result
  } catch (error) {
    console.error('Error al actualizar la asignación:', error)
    throw error
  }
}