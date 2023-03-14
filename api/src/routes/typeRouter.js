const { default: axios } = require("axios");
const { Router } = require("express");
 const { getAllTypes } = require("../controllers/type.controller.js");

const pokemonTypeRouter = Router();
pokemonTypeRouter.get("/", getAllTypes);

module.exports = pokemonTypeRouter;