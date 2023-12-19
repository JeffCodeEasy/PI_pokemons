import React, { useEffect, useState } from 'react'
import styles from './Detail.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';



function Detail() {

  const {id} = useParams();

  const [pokemon, setPokemon] = useState({});
  useEffect(()=>{
    axios.get(`http://localhost:3001/pokemon/${id}`).then(({ data }) => {
        return setPokemon(data);
      });
  },[id])

  return (
    <div className={styles.detail}>
      <div className={styles.resultsSummaryContainer}>

      <div className={styles.resultsSummaryContainerResult}>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      <div className={styles.resultsSummaryContainerOptions}>
        <div className={styles.headingSecondary} >{pokemon.name}</div>
        <div className={styles.summaryResultOptions}>
          <div className={styles.resultOption}>
            <div className={styles.iconBox}>
            
                <span className={styles.reactionIconText}>Hp:</span>
            </div>
            <div className= {styles.resultBox}><span>{pokemon.hp}</span> / 100</div>
          </div>
            <div className={styles.resultOption }>
              <div className={styles.iconBox}>
              
                <span className={styles.memoryIconText}>Attack</span>
              </div>
              <div className={styles.resultBox}><span>{pokemon.attack}</span> / 100</div>
            </div>
            <div className={styles.resultOption }>
              <div className={styles.iconBox}>
              
                <span className={styles.verbalIconText}>Defense</span>
              </div>
              <div className={styles.resultBox}><span>{pokemon.defense}</span> / 100</div>
            </div>
            <div className={styles.resultOption }>
              <div className={styles.iconBox}>
                
                <span className={styles.reactionIconText}>Height</span>
              </div>
              <div className={styles.resultBox}><span>{pokemon.height}</span> / 100</div>
            </div>
            <div className={styles.resultOption }>
              <div className={styles.iconBox}>
              
          
                <span className={styles.memoryIconText}>Weight</span>
              </div>
              <div className={styles.resultBox}><span>{pokemon.weight}</span> / 100</div>
            </div>
            <div className={styles.resultOption }>
              
              <div className={styles.iconBox}>
                <span className={styles.verbalIconText}>Type</span>
              </div>
              <div className={styles.resultBox}>
                <span>{pokemon.types?.join(', ')}</span>
                  
              </div>

            </div>
          </div>
        </div>
        </div>

      
    </div>
  )
}

export default Detail