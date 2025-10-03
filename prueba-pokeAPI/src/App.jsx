import { useState } from "react";
import { getPokemon, getPokemonSpecies, getPokemonById } from "../src/services/Pokemon";
import { getEvolutionChainByUrl } from "./services/Evolution";
import "./App.css";

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState("");
    const [evolutionData, setEvolutionData] = useState(null);
    const [pokemonId, setPokemonId] = useState(null); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);

        try {
            
            const pokemon = await getPokemon(search.toLowerCase());
            setPokemon(pokemon);
            setPokemonId(pokemon.id);

            const species = await getPokemonSpecies(search.toLowerCase());
            const evolutionChainUrl = species.evolution_chain.url;
            const evolutionData = await getEvolutionChainByUrl(evolutionChainUrl);
            setEvolutionData(evolutionData);
            
        } catch (error) {
            setError(error)
        }finally {
            setLoading(false);
        }
    };

    const handleNext = async () => { 
        setLoading(true);

        try {
            
            const pokemonSiguienteId = pokemonId + 1;
            const pokemonSiguiente = await getPokemonById(pokemonSiguienteId);
            setPokemon(pokemonSiguiente);
            setPokemonId(pokemonSiguiente.id);

            const species = await getPokemonSpecies(pokemonSiguiente.name);
            const evolutionChainUrl = species.evolution_chain.url;
            const evolutionData = await getEvolutionChainByUrl(evolutionChainUrl);
            setEvolutionData(evolutionData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    };

    const handleSearchFromEvolution = async (name) => {

        setSearch(name); 
        setLoading(true);
        try {
            const pokemon = await getPokemon(name);
            setPokemon(pokemon);
            setPokemonId(pokemon.id);

            const species = await getPokemonSpecies(name);
            const evolutionChainUrl = species.evolution_chain.url;
            const evolution = await getEvolutionChainByUrl(evolutionChainUrl);
            setEvolutionData(evolution);
            setError(null);
        } catch (error) {
            setError("No se pudo cargar el Pokémon");
        } finally {
            setLoading(false);
        }
    };

    function parseEvolutionChain(chain, currentName) {
        const names = [];
        let current = chain;
        while (current) {
            names.push(current.species.name);
            current = current.evolves_to[0];
        }
        return names.filter(name => name !== currentName.toLowerCase());
    }

    return (
        <div className="main-pokedex">
            <h2 className="pokedex-logo">Pokédex</h2>
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Ingrese nombre o ID"
            />
            <button onClick={handleSearch} className="btn-buscar">Buscar</button>

            {loading && <p>Cargando Pokémon...</p>}

            {pokemon && (
                <div className="pokemon-info">
                    <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</h2>
                    <h3>N&uacute;mero: {pokemon.id}</h3>
                    <img 
                        src={pokemon.sprites.front_default} 
                        alt={pokemon.name} 
                    />
                    
                    <button onClick={handleNext}>Siguiente Pokémon</button>
                    
                    <p>Altura: {pokemon.height} Peso: {pokemon.weight}</p>

                    {evolutionData && (
                    <div>
                        <h3>Evoluciones:</h3>
                        <ul className="evolution-list">
                            {parseEvolutionChain(evolutionData.chain, pokemon.name).map((name) => (
                                <li key={name}>
                                    <button onClick={() => {
                                        handleSearchFromEvolution(name);
                                    }}  className="evolution-link">
                                        {name.charAt(0).toUpperCase() + name.slice(1)}
                                    </button>
                                </li>
                                
                            ))}
                        </ul>
                    </div>
                    )}

                </div>
            )}
        </div>
    );
}

export default App;
