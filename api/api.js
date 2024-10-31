const API_URL = 'http://localhost:8000';

export async function createReport(data) {
  const res = await fetch(`${API_URL}/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
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
        Authorization: token,
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
        qr,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data; 
  } catch (error) {
    console.error("Error creating equipment:", error);
    throw error; 
  }
}

// Función para obtener todos los usuarios
export async function getAllUsers(token) {
  try {
    const res = await fetch(`${API_URL}/users/all`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data.users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

// Función para obtener usuarios (sin necesidad de token)
export async function getUsers() {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getEquipmentByCompanyId(companyId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/company/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching equipment by companyId:", error);
    throw error;
  }
}

// Obtener equipo por ID de usuario
export async function getUserEquipmentById(equipmentId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/${equipmentId}`, {
      method: 'GET',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching user equipment by ID:", error);
    throw error;
  }
}

// Función para obtener todos los equipos
export async function getAllEquipments(token) {
  try {
    const res = await fetch(`${API_URL}/equipment`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching all equipments:", error);
    throw error;
  }
}

export async function getEquipmentById(equipmentId, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/${equipmentId}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data; // Devuelve solo los datos específicos del equipo
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    throw error;
  }
}

// Función para editar un equipo
export async function editEquipment(equipmentId, updatedData, token) {
  try {
    const res = await fetch(`${API_URL}/equipment/${equipmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data; // Devuelve solo los datos del equipo actualizado
  } catch (error) {
    console.error("Error editing equipment:", error);
    throw error;
  }
}