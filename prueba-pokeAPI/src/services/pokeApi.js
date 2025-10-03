const API_URL = import.meta.env.VITE_API_URL;

export async function fetchFromPokeAPI(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error en endpoint "${endpoint}":`, error);
    throw error;
  }
}