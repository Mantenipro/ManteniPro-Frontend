const API_URL = 'https://mantenipro-api-4.onrender.com';

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