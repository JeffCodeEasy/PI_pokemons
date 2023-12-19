const {unirDatosDByAPI, pokemonesPostDB, pokemonesID, pokemonesName} = require('../controllers/pokemonController')

const getPokemon = async(req, res)=>{
    try {
        const {name} = req.query;
            
        if(name){
            const pokemonName = await pokemonesName(name);
            return res.status(200).json(pokemonName);
        }
        const listadoPokemones = await unirDatosDByAPI()
         return res.status(200).json(listadoPokemones);
    } catch (error) {
        console.error('Error en getPokemon(handlers):', error);
        return res.status(500).json({error: 'Error en getPokemon(Handlers)'})
    }
};

const getIdPokemon = async(req, res)=>{
    try {
        const {id} = req.params;
        const pokemonID = await pokemonesID(id);
        return res.status(200).json(pokemonID);
    } catch (error) {
        console.error('Error en getIdPokemon(handlers):', error);
        return res.status(500).json({error: 'No existe un pokemon con el ID proporcionado'});
    }
};

// const getNamePokemon = async(req, res)=>{
//     try {
//         const {name} = req.query;
//         const pokemonName = await pokemonesName(name);
//         res.status(200).json(pokemonName);
//     } catch (error) {
//         res.status(400).json({error: 'Hubo un error en getNamePokemon(handlers)'})
//     }
// };

const postPokemon = async(req, res)=>{
    try {
        const {name, hp, attack, defense, speed, height, weight, image, types } = req.body
        const pokemonPost = await pokemonesPostDB(name, hp, attack, defense, speed, height, weight, image, types);
        
        return res.status(200).json(pokemonPost);

    } catch (error) {
        console.error('Error en postPokemon(handlers):', error);
        return res.status(500).json({ error: 'Hubo un error al crear un Pokémon (El name debe debe contener entre 5 y 30 caracteres y los otros campos tienen que ser numeros positivos).' });
    }
}

module.exports = {
    getPokemon,
    getIdPokemon,
    // getNamePokemon,
    postPokemon
}