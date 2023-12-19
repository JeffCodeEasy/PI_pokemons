import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

function Cards(props) {
  return (

    <div className={styles.container}>
        {props.allPokemons.map(pokemon=>{
          return <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            hp={pokemon.hp}
            attack={pokemon.attack}
            defense={pokemon.defense}
            image={pokemon.image}

          />
        })}

    </div>
  )
}

export default Cards