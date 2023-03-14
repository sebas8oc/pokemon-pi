const axios = require("axios");
const {Router} = require ("express");
const pokemonRouter = Router();
const {getAllPokemons, idSearch, pokemonName, createPokemon} = require("../Controllers/pokemon.controller.js")

pokemonRouter.get("/", getAllPokemons);
pokemonRouter.get("/search", pokemonName); 
pokemonRouter.get("/:id", idSearch);
pokemonRouter.post("/", createPokemon);

 // NIY : NOT IMPLEMENTED YET

module.exports = pokemonRouter;