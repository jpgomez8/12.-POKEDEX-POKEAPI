import { useState } from "react";
import { getPokemon } from "../src/services/pokeApi";

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState("");

    const handleSearch = async () => {
        const data = await getPokemon(search.toLowerCase());
        setPokemon(data);
    };

    return (
        <div>
            <h1>Buscar Pokémon</h1>
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Ingrese nombre o ID"
            />
            <button onClick={handleSearch}>Buscar</button>

            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                </div>
            )}
        </div>
    );
}

export default App;
