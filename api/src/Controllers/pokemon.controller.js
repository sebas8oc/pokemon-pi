const axios = require("axios");
const {Pokemon} = require("../db.js");
const {getPokemonsFromApi} = require("../Services/pokemonsfromapi.service.js");
const {returnUrl} = require("../Services/returnrul.service.js");
const {Op} = require("sequelize");

//Este es el controlador para buscar todos los pokemones.
//Ejemplo: http://localhost:3001/pokemons

exports.getAllPokemons = async (req, res) => {
  try {
    const api = await getPokemonsFromApi();
    const apiData = await api.data.results.map((pokemon) => {
      const obj = {
        name: pokemon.name,
        url: pokemon.url,
      }
      return obj;
    });
    const checkPokemon = async (req, res) => {
      const pokemon = apiData.map(async(res) => {
        const urlData = await returnUrl(res.url);
        const pokeData = {
          pokemonId: urlData.id ?? 00000,
          name: res.name ?? "Desconocido",
          image: urlData.sprites["front_default"] ?? "NoImagen",
          hp: urlData.stats[0].base_stat ?? "Desconocido",
          attack: urlData.stats[1].base_stat ?? "Desconocido",
          defense: urlData.stats[2].base_stat ?? "Desconocido",
          speed: urlData.stats[5].base_stat ?? "Desconocido",
          height: urlData.height ?? "Desconocido",
          weight: urlData.weight ?? "Desconocido",
          type: urlData.types.map((t) => t.type.name),
          //Cambiar keys a español como viene en el read.me
        };
        return pokeData;
      });
      const pokemonData = Promise.all(pokemon);
      return pokemonData;
    };
      const data = await checkPokemon();
    const pokemonsSave = await Pokemon.findAll();
    res.status(200).send({API:data, DB:pokemonsSave});
  } catch (error) {
    res.send({error:error.message});
  }
} 

//Este es el controlador para buscar todos los pokemones por ID.
//Ejemplo: http://localhost:3001/pokemons/10

 exports.getPokemonId = async (pokemonId) => {
  try {
    const dbPokemon = await Pokemon.findByPk(pokemonId);
    if (dbPokemon) {
      return dbPokemon.toJSON();
    }
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const type = response.data.types.map((i) => i.type.name
    );
    console.log("Tipos: --", type)
    const pokemon = { 
      name: response.data.name,
      hp: response.data.stats[0].base_stat,
      speed: response.data.stats[5].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      weight: response.data.weight,
      height: response.data.height,
      image: response.data.sprites.front_default,
      type: type,
      //Cambiar a español
    };
    return pokemon;
  }catch (error) {
    res.send({error:error.message});
  }
}

  exports.idSearch = async (req, res) => {
    try{
      const id = req.params.id;
      const pokemon = await this.getPokemonId(id);
      res.status(200).send(pokemon);
    } catch (error) {
      res.send({error:error.message});
    }
  };


//Este es el controlador para buscar todos los pokemones por Nombre.
//Ejemplo: http//localhost:3001/pokemons/search?name=charmander

exports.pokemonName = async (req, res) => {
  try {
    const { name } = req.query;
    console.log("Nombre --", name);
    const response = await axios.get(
     `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const listFilter = await Pokemon.findAll({
      where: {
        name: { [Op.iRegexp]: name },
      },
    });
    if (response) {
      const pokeName = {
        name: response.data.name,
        hp: response.data.stats[0].base_stat,
        speed: response.data.stats[5].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        weight: response.data.weight,
        height: response.data.height,
        image: response.data.sprites.front_default,
        type: response.data.types.map((e) => e.type.name),
        //Cambiar a español
      };
      res.send(pokeName);
    } else if (listFilter.length !== 0) {
      res.send(listFilter);
    } else {
      return res.sendStatus(404).json("Not found in DB");
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};

//Este es el controlador para crear pokemons nuevos.
//Ejemplo: http//localhost:3001/pokemons

exports.createPokemon = async (req, res) => {
  try {
    const {
      //Cambiar a español
      pokemonId,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      type,
    } = req.body;
    const pokemon = Pokemon.create({
      //Cambiar a español
      pokemonId,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      type,
    });
    if (
      !pokemonId &&
      !name &&
      !image &&
      !hp &&
      !attack &&
      !defense &&
      !speed &&
      !height &&
      !weight &&
      !type 
     //Cambiar a español
    ) {
      res.send({error: new Error("Informacion incompleta") });
    }
    if (!pokemon) {
      res.send({ message: "No se creo el Pokemon" });
    }
    res.status(201).send("Se creo el Pokemon");
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};