import { fetchFromPokeAPI } from './pokeApi';

export async function getEvolutionChainByUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener la cadena evolutiva");
    return await response.json();
  } catch (error) {
    console.error("Error en evolución:", error);
    throw error;
  }
}