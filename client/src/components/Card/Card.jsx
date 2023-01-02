import React from 'react'
import {Link} from 'react-router-dom';
import Styles from './Card.module.css';

function Card({name, healthScore, diets, image, id}) {
  return (
    <div className={Styles.cardContainer}>
        {/* <Link to={`/detail/${recipes.id}`}> */}
        <h3 className={Styles.nameCard}>{name}</h3>
        {/* </Link> */}
        <p className={Styles.healtCard}>{healthScore}</p>
        
        <img className={Styles.imageCard} src={image} alt="imagen" width="200px" height="250px"/>
        <h5 className={Styles.dietsCard}>{diets} </h5>
    </div>
  )
}

export default Card