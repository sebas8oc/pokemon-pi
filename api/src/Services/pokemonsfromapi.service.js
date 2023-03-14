const axios = require("axios");
const { POKEMON_API } = process.env;

exports.getPokemonsFromApi = async () => {
  const pokemonData = await axios.get(POKEMON_API);
  return pokemonData;
};