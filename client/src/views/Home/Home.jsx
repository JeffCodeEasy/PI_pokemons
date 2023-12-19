import React, {useEffect} from 'react'
import styles from './Home.module.css'
import Cards from '../../components/Cards/Cards'
import {useDispatch, useSelector} from 'react-redux';
import {orderByName, getPokemon, getTypes, filterByType, filterCreated} from '../../redux/actions'
import { useState } from 'react';

function Home() {

  //Hooks react-redux
  const dispatch = useDispatch();
  const allPokemons = useSelector((state)=> state.allPokemons)
  
  const types = useSelector((state)=> state.types)
  const [, setOrden] = useState("");
  
  // Paginado
  const [currentPage, setCurrentPage] = useState(0);

  const pokemonsPerPage = 10;
  const startIndex = currentPage * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;
  const displayedPokemons = allPokemons.slice(startIndex, endIndex);

  useEffect(()=>{
    if(displayedPokemons.length === 0) setCurrentPage(0);

  },[displayedPokemons])


  const nextHandler = () => {
    if (endIndex >= allPokemons.length) return; // Validación para detenerse
    setCurrentPage(currentPage + 1);
  }

  const prevHandler = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  }

  const nextHandler2 = () => {
  const nextPage = currentPage + 2;
  const maxPageIndex = Math.floor((allPokemons.length - 1) / pokemonsPerPage);

    if (nextPage <= maxPageIndex) {
      setCurrentPage(nextPage);}
  }

const prevHandler2 = () => {
    if (currentPage === 0) return;
    if((currentPage - 2) < 0) return;
    setCurrentPage(currentPage - 2);
}

  
  useEffect(()=>{
    dispatch(getPokemon())
    dispatch(getTypes())
  }, [dispatch])


  // Filters
  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(0);
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleFilterTypes = (e) => {
    e.preventDefault();
    if (e.target.value !== "Tipos") {
      dispatch(filterByType(e.target.value));
    }
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  };

  return (
    <div className={styles.home}>
      
        <div className={styles.filters}>
          <select onChange={(e) => handleSort(e)} className={styles.azButton}>
            <option value="asc">A - Z</option>
            <option value="des">Z - A</option>
          </select>

          <select onChange={(e) => handleFilterTypes(e)} className={styles.typesButton}>
            <option>Tipos</option>
            <option value="All">Todos</option>
            {types?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>

          <select onChange={(e) => handleFilterCreated(e)} className={styles.origenButton}>
            <option value="All">Origen</option>
            <option value="created">DB</option>
            <option value="api">API</option>
          </select>
        </div>
        
        

      <Cards allPokemons={displayedPokemons}/> <br />
      <button className={styles.button} onClick={prevHandler2}>{'<<'}</button>
      <button className={styles.button} onClick={prevHandler}>Prev</button>
      <button className={styles.button} >{currentPage}</button>
      <button className={styles.button} onClick={nextHandler}>Next</button>
      <button className={styles.button} onClick={nextHandler2}>{'>>'}</button>
    </div>
  )
}

export default Home