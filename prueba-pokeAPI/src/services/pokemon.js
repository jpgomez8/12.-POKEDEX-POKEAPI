import { fetchFromPokeAPI } from './pokeApi';

export async function getPokemon(name) {
  return await fetchFromPokeAPI(`pokemon/${name.toLowerCase()}`);
}

export async function getPokemonSpecies(name) {
  return await fetchFromPokeAPI(`pokemon-species/${name.toLowerCase()}`);
}

export async function getPokemonById(id) {
  return await fetchFromPokeAPI(`pokemon/${id}`);
}