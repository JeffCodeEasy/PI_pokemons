import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import button from '../../assets/Button_Pokemon.png';
import {useDispatch} from "react-redux"
import { getNamePokemon } from '../../redux/actions';
import linkendin from '../../assets/linkedin.png';
import github from '../../assets/github.png';
import opening from '../../assets/Opening Pokémon Temporada 1 Latino.mp3'


function NavBar() {
  const location = useLocation();
  const isHome = location.pathname === '/home';

  const dispatch = useDispatch();

  const [name, setName] = useState('');


  const handleSearch = () => {
    // Dispatch the action to get pokemon by name
    dispatch(getNamePokemon(name));
    setName('')
  };

  // Handle Input
  const handleChange = (event)=>{
    setName(event.target.value)
  }

  // HandleKeyPress
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch(); // Trigger search on Enter key press
    }
  };

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.navBar}>
      <Link to='/'>
        <img className={styles.button} src={button} alt="Icono button" />
      </Link>
      {isHome ? (
        <span style={{ color: 'white' }}>HOME</span>
      ) : (
        <Link  to='/home'>
          HOME
        </Link>
      )}

      <Link to='/form'>
        CREATE
      </Link>

      <a href="https://www.linkedin.com/in/jeremy-fernandez-704ab9237/" rel="noreferrer"  target="_blank">
      <img className={styles.icons} src={linkendin} alt="linkedin" />
      </a>

      <a href="https://github.com/JeremyeElestudiante" rel="noreferrer"  target="_blank">
      <img className={styles.icons} src={github} alt="github" />
      </a>
      
      <audio ref={audioRef} src={opening} autoPlay loop />
      <button className={styles.audio} onClick={togglePlay}>
        {isPlaying ? 'Pausa' : 'Reproducir'}
      </button>

      <input type="text" className={styles.searchInput} onChange={handleChange} onKeyPress={handleKeyPress} value={name}  autoComplete='off'/>
      
    </div>
  );
}

export default NavBar;