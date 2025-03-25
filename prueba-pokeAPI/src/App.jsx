import { useState } from "react";
import { getPokemon } from "../src/services/pokeApi";
import "./App.css";

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        const data = await getPokemon(search.toLowerCase());
        setPokemon(data);
    };

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

            {pokemon && (
                <div className="pokemon-info">
                    <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</h2>
                    <h3>ID: {pokemon.id}</h3>
                    <img 
                        src={pokemon.sprites.front_default} 
                        alt={pokemon.name} 
                    />
                    <p>Altura: {pokemon.height} Peso: {pokemon.weight}</p>
                </div>
            )}
        </div>
    );
}

export default App;
