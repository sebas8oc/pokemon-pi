import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {

	const pokemons = useSelector(state => state.pokemons)

  return(
    <div className={style.container}>
     {pokemons.map(pokemon => {
       return <Card 
          pokemonId={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          hp={pokemon.hp}
          attack={pokemon.attack}
          defense={pokemon.defense}
          speed={pokemon.speed}
          height={pokemon.height}
          weight={pokemon.weight}
          type={pokemon.type}
       />
     })}
    </div>
  )
}

export default CardsContainer;