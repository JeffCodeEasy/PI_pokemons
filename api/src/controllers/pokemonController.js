const axios = require('axios');

const {Pokemon, Type} = require('../db')


const pokemonesAPI = async()=>{
    const  API =  (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')).data.results

    // Promise.all = Es un iterador de promesas que resuelve las promesas y devuelve una promesa
    const pokeapi = await Promise.all(API.map(async (poke)=>{
        let pokemon = await axios.get(poke.url);

        return {
            id: pokemon.data.id,
            name: pokemon.data.name,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            image: pokemon.data.sprites.other.home.front_default,
            types: pokemon.data.types.map((tipo) => tipo.type.name),
        }
    }))

    return pokeapi
};

const pokemonesDB = async()=>{
    const pokemonsDB = await Pokemon.findAll({
        include: {
          //Incluime el model Tipo
          model: Type,
          //TRAEME EL ATRIBUTO NAME
          attributes: ['name'],
          //MEDIANTE LOS ATRIBUTOS, VA SIEMPRE, BUENA PRACTICA
          through: {
            attributes: [],
          },
        },
      });

      const pokemons = pokemonsDB?.map( pokemon => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          speed: pokemon.speed,
          height: pokemon.height,
          weight: pokemon.weight,
          image: pokemon.image,
          types: pokemon.types.map( types => types.name),
          createdInDb: true
        };
      });
      return pokemons;   
  
};

const unirDatosDByAPI = async () => {
    const datosDB = await pokemonesDB(); // Obtener datos de la base de datos
    const datosAPI = await pokemonesAPI(); // Obtener datos de la API

    // Realiza la unión de datos, por ejemplo, fusiona los arrays o realiza alguna lógica específica según tus necesidades
    const datosCombinados = [...datosAPI, ...datosDB];

    return datosCombinados;
};

const pokemonesID = async(id)=>{
    const pokemonFind = (await unirDatosDByAPI()).find((pokemon)=> pokemon.id == id);

    if(!pokemonFind) throw new Error(`No se encontró un pokemon con este id: ${id}`)

    return pokemonFind;
};

const pokemonesName = async(name)=>{
    const pokemons = await unirDatosDByAPI();

    const filterPokemons = pokemons.filter(poke => poke.name.toLowerCase().includes(name.toLowerCase()));
    if(!filterPokemons.length) throw Error(`No se encontró el pokemon con el nombre ${name}`)

    return filterPokemons;

};


   
const pokemonesPostDB = async (name, hp, attack, defense, speed, height, weight, image, types) => {
        // Expresión regular para validar una URL de imagen simple 
        const imageUrlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    
        // Funcion para validar sí funciona la URL
        const validarURL = async (image) => {
            try {
                const response = await axios.head(image); // Realiza una solicitud HEAD a la URL
                if (response.status === 200) {
                    return true; // La URL es funcional
                }
            } catch (error) {
                // Error al realizar la solicitud o código de estado diferente de 200
            }
            return false; // La URL no es funcional
        };
    
        if (hp <= 0 || attack <= 0 || defense <= 0 || speed <= 0 || height <= 0 || weight <= 0 || !imageUrlPattern.test(image) || !(await validarURL(image))) {
            throw new Error('Los valores de vida, ataque, defensa, velocidad, altura y peso deben ser mayores que 0, y la URL de la imagen debe ser válida.');
        }
    
        // Crear el Pokémon en la base de datos
        const DB = await Pokemon.create({ name, hp, attack, defense, speed, height, weight, image });
    
        types?.forEach(async (type)=>{
            let typesDB = await Type.findAll({where: { name : type}});
            await DB.addTypes(typesDB);
        });

        return DB
};

module.exports = {
    unirDatosDByAPI,
    pokemonesID,
    pokemonesName,
    pokemonesPostDB
}