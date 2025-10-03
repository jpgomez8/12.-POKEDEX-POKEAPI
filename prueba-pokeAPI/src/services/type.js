import { fetchFromPokeAPI } from './pokeApi';

/**
 * Obtiene los detalles de un tipo de Pokémon.
 * @param {string} typeName - Nombre del tipo (ej: "fire", "water")
 * @returns {Promise<Object>} - Datos del tipo
 */
export async function getTypeDetails(typeName) {
  return await fetchFromPokeAPI(`type/${typeName.toLowerCase()}`);
}