const API_URL = import.meta.env.VITE_API_URL;

export const getPokemon = async (name) => {
    try {
        const url = `${API_URL}pokemon/${name}`;
        console.log("🚀 Fetching:", url);  // Verifica la URL antes de hacer la petición

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error obteniendo el Pokémon:", error);
        return null;
    }
};
