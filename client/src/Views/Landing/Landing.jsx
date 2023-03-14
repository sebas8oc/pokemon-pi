import style from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return(
    <body className={style.body}>
        <div className={style.wrap}>
              <div className={style.divTitulo}>
                  <h1
                  className={style.titulo}>POKEMON PI
                  </h1>
                  <h2 className={style.nombre}>Sebastian Otero Cruz</h2>
             </div>          
              <div className={style.divBoton}>
                <Link to="/home"><button className={style.home}>Home</button></Link>
              </div>
        </div>
        <div className={style.bcolor}></div>
    </body>
  )
}

export default Landing;