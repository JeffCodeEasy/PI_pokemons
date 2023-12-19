import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Card({name, id, hp, attack, defense, image}) {
  
  return (

    <div className={styles.card}>
      <Link to={`/detail/${id}`}>
          <div className={styles.topSection}>
            <div className={styles.border}></div>
              <img src={image} alt={name}  />    
          </div>
      
      <div className={styles.bottomSection}>
        <span className={styles.title}>{name}</span>

        <div className={styles.row}>
          <div className={styles.item}>
            <span className={styles.bigText}>{attack}%</span>
            <span className={styles.regularText}>Attack</span>
          </div>

          <div className={styles.item}>
            <span className={styles.bigText}>{hp}</span>
            <span className={styles.regularText}>Hp</span>
          </div>

          <div className={styles.item}>
            <span className={styles.bigText}>{defense}%</span>
            <span className={styles.regularText}>Defense</span>
          </div>
          
        </div>
      </div>
      
      </Link>  
    </div>
  )
}

export default Card