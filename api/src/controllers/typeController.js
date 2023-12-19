const axios = require('axios');
const {Type} = require('../db');

const pokemonType = async()=>{
    const types = (await axios.get('https://pokeapi.co/api/v2/type')).data.results.map((type)=>{
        return {name : type.name}
    })
    
    const existingTypes = await Type.findAll();
    if(existingTypes.length == 0){
        Type.bulkCreate(types);
    }

    return await Type.findAll();
};

module.exports = pokemonType