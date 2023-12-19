const pokemonType = require("../controllers/typeController");

const typesGet = async(__, res)=>{
    try {
        const pokemonTypes = await pokemonType();
        return res.status(200).json(pokemonTypes)
    } catch (error) {
        console.error('Error en typesGet(handlers):', error);
        return res.status(500).json({ error: 'Hubo un error al obtener los tipos de Pokémon.' });
    }
};

module.exports = typesGet;