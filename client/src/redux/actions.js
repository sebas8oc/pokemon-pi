import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";

export const getPokemons = () => {
  return async function (dispatch) {
    const apiData = await axios.get(
      "https://pokeapi.co/api/v2/pokemon"
    )

    
     console.log(apiData);
     const pokemons = apiData.data.results;

    dispatch({type: GET_POKEMONS, payload: pokemons});
  };
};

//  export const getPokemon = (id) => {
//    return async function (dispatch) {
//      const apiData = await axios.get(
//       `https:pokeapi.coapiv2pokemon${id}`
//      );
//      const pokemon = apiData.data;
//      dispatch({ type: "GET_POKEMON", payload: pokemon}); 
//    };
// };

//   export const filterBySource = () => {
//     dispatch({ type: "FILTER_BY_SOURCE"});
//   };

