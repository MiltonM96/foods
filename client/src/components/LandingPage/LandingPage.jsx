import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={Styles.LandingPage}>
            <h1 className={Styles.landingh1}>Bienvenidos a las recetas de la abuela</h1>
            <Link to='/home' className={Styles.ingreso}>
                <button className={Styles.buttonIng}>Ingresar al sitio</button>
            </Link>
        </div>
    )
}