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

// Función para obtener usuarios (sin necesidad de token)
export async function getUsers(token) {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        return json.data.posts; // Asegúrate de que esto sea lo que realmente deseas devolver
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

      
