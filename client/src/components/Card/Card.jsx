import style from "./Card.module.css";

const Card = (props) => {
  return(
    <div className={style.card}>
      <p>name:{props.name}</p>
      <p>image:{props.image}</p>
      <p>hp:{props.hp}</p>
      <p>attack:{props.attack}</p>
      <p>defense:{props.defense}</p>
      <p>speed:{props.speed}</p>
      <p>height:{props.height}</p>
      <p>weight:{props.weight}</p>
      <p>type:{props.type}</p>
    </div>
  )
}

export default Card;