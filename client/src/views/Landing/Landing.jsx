import React from 'react';
import styles from './Landing.module.css';
import button from '../../assets/Button_Pokemon.png'
import { Link } from 'react-router-dom';
function Landing() {
  
  return (
    <div className={styles.pokemonLanding}>

        <Link to='/home'>
          <img className={styles.button} src={button} alt="Icono button" />
        </Link>

    </div>
  )
}

export default Landing