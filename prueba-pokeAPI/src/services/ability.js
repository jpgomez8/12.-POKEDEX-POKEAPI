import { fetchFromPokeAPI } from './pokeApi';

/**
 * Obtiene los detalles de una habilidad específica.
 * @param {string} abilityName - Nombre de la habilidad (ej: "overgrow")
 * @returns {Promise<Object>} - Datos de la habilidad
 */
export async function getAbilityDetails(abilityName) {
  return await fetchFromPokeAPI(`ability/${abilityName.toLowerCase()}`);
}