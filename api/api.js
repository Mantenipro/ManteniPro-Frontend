const API_URL = 'https://mantenipro-api.onrender.com'

export async function createReport(data) {
  const res = await fetch(`${API_URL}/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const json = await res.json()
  return json
}

// Función para crear un equipo
export async function createEquipment(
  equipmentName,
  model,
  company,
  owner,
  manufactureDate,
  brand,
  location,
  unitType,
  image,
  qr,
  token
) {
  try {
    const res = await fetch(`${API_URL}/equipment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        equipmentName,
        model,
        company,
        owner,
        manufactureDate,
        brand,
        location,
        unitType,
        image,
        qr
      })
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data
  } catch (error) {
    throw error
  }
}

// Función para obtener todos los usuarios
export async function getAllUsers(token) {
  try {
    const res = await fetch(`${API_URL}/users/all`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data.users
  } catch (error) {
    ////console.error("Error fetching all users:", error);
    throw error
  }
}

// Función para obtener usuarios (sin necesidad de token)
export async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'GET'
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data
  } catch (error) {
    ////console.error("Error fetching users:", error);
    throw error
  }
}

export async function getEquipmentByCompanyId(companyId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/company/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data
  } catch (error) {
    //console.error("Error fetching equipment by companyId:", error);
    throw error
  }
}

// Obtener equipo por ID de usuario
export async function getUserEquipmentById(equipmentId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/${equipmentId}`, {
      method: 'GET',
      headers: { Authorization: token, 'Content-Type': 'application/json' }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json
  } catch (error) {
    //console.error("Error fetching user equipment by ID:", error);
    throw error
  }
}

// Función para obtener todos los equipos
export async function getAllEquipments(token) {
  try {
    const res = await fetch(`${API_URL}/equipment`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data
  } catch (error) {
    //console.error("Error fetching all equipments:", error);
    throw error
  }
}

export async function getEquipmentById(equipmentId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/${equipmentId}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data // Devuelve solo los datos específicos del equipo
  } catch (error) {
    //console.error("Error fetching equipment by ID:", error);
    throw error
  }
}

// Función para editar un equipo
export async function editEquipment(equipmentId, updatedData, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/${equipmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(updatedData)
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data // Devuelve solo los datos del equipo actualizado
  } catch (error) {
    //console.error("Error editing equipment:", error);
    throw error
  }
}

// Función para eliminar un equipo por ID
export async function deleteEquipment(equipmentId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/${equipmentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.message // Opcionalmente, puedes retornar el mensaje de éxito de la respuesta
  } catch (error) {
    //console.error("Error deleting equipment:", error);
    throw error
  }
}

export async function getEquipmentByOwner(ownerId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/owner/${ownerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Añadiendo el token a los encabezados
      }
    })

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data // Devuelve solo los datos de los equipos
  } catch (error) {
    //console.error("Error fetching equipment by owner:", error);
    throw error
  }
}

export async function getReportsByUser(userId) {
  try {
    const res = await fetch(`${API_URL}/report/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Si la respuesta es 404 (no encontrado), no es un error, simplemente retorna un array vacío
    if (res.status === 404) {
      return [] // No hay reportes disponibles para este usuario
    }

    // Si la respuesta no es OK (pero no es 404), lanzamos un error
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data // Retorna los reportes obtenidos
  } catch (error) {
    // Si ocurre otro tipo de error, lo puedes manejar aquí
    console.error('Error fetching reports by user:', error)
    throw error // O bien lanzar el error si prefieres que el componente que llama esta función lo maneje
  }
}

export async function deleteReport(reportId) {
  try {
    const token = localStorage.getItem('token') // Obtén el token aquí
    const res = await fetch(`${API_URL}/report/${reportId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Asegúrate de que el token esté presente
      }
    })

    if (!res.ok) {
      const errorResponse = await res.json() // Captura la respuesta de error
      throw new Error(
        `Error ${res.status}: ${errorResponse.message || res.statusText}`
      )
    }

    const json = await res.json()
    return json.message // Mensaje de éxito
  } catch (error) {
    //console.error("Error deleting report:", error);
    throw error // Lanza el error para que pueda ser capturado en el componente
  }
}

// Función para obtener reportes por compañía
export async function getReportsByCompany(companyId, token) {
  try {
    const res = await fetch(`${API_URL}/report/company/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    // Si la respuesta es 404 (no encontrado), no es un error, simplemente retorna un array vacío
    if (res.status === 404) {
      return [] // No hay reportes disponibles, pero no es un error
    }

    // Si la respuesta no es OK (pero no es 404), lanzamos un error
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()
    return json.data // Retorna los reportes obtenidos
  } catch (error) {
    // Si ocurre otro tipo de error, lo puedes manejar aquí
    console.error('Error fetching reports by company:', error)
    throw error // O bien lanzar el error si prefieres que el componente que llama esta función lo maneje
  }
}

export async function fetchReportsByTecnico() {
  const token = localStorage.getItem('token') // Obtener el token del almacenamiento local
  try {
    const response = await fetch(`${API_URL}/report/tecnico`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      throw new Error('Error al obtener los reportes')
    }
    const json = await response.json()
    //console.log('Reportes del técnico:', json.data)
    return json.data
  } catch (error) {
    //console.error(error.message)
  }
}

// Nueva función para obtener asignación por ID de reporte
export const getAssignmentByReportId = async (reportId) => {
  try {
    const response = await fetch(`${API_URL}/assignment/byReport/${reportId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` // Añadir el token si es necesario para la autenticación
      }
    })

    const json = await response.json()

    if (!response.ok) {
      throw new Error(
        json.message || 'Error al obtener la asignación por reporte'
      )
    }

    //console.log('Asignación obtenida:', json);
    return json
  } catch (error) {
    //console.error('Error en la solicitud de asignación por reporte:', error);
    throw error
  }
}
