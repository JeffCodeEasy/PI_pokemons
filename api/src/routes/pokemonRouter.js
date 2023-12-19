const {Router} = require('express');
const { getPokemon, postPokemon, getIdPokemon } = require('../handlers/pokemonHandler');

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemon);
pokemonRouter.get('/:id', getIdPokemon);
pokemonRouter.post('/', postPokemon);

module.exports = pokemonRouter