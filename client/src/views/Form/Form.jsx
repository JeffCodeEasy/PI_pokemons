import React from 'react'
import styles from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { postPokemon } from '../../redux/actions'

function Form() {



  const dispatch = useDispatch();

  // State Global types
  const pokemonTypes = useSelector((state) => state.types);

  // State inputs
  const [state, setState] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: '',
    types: []
  })
  console.log(state.image)

  // State Errors
  const [error, setError] = useState({
    name: 'El nombre es requerido',
    hp: 'Requiere ser un número',
    attack: 'Requiere ser un número',
    defense: 'Requiere ser un número',
    speed: 'Requiere ser un número',
    weight: 'Requiere ser un número',
    height: 'Requiere ser un número',
    image: 'La URL de la imagen es requerida',
    types: 'Máximo 2'
  })

  // Validaciones de inputs
  const validate = (state, fieldName) => {
    switch (fieldName) {
      case 'name':
        if (state.name === '') {
          return setError({ ...error, name: 'El nombre es requerido' });
        }
        if(state.name.length < 5 || state.name.length > 30) return setError({ ...error, name: 'El nombre requiere entre 5 a 30 carácteres' });
        else {
          return setError({ ...error, name: '' });
        };

      case 'hp':
        if(isNaN(parseInt(state.hp))) return setError({...error, hp: 'Requiere que ser un número'});
        if(state.hp < 0) return setError({...error, hp: 'Se requiere numero positivo'});
        else return setError({...error, hp: ''});
      case 'attack':
        if(isNaN(parseInt(state.attack))) return setError({...error, attack: 'Requiere que ser un número'});
        if(state.attack < 0) return setError({...error, attack: 'Se requiere numero positivo'});
        else return setError({...error, attack: ''});
      case 'defense':
        if(isNaN(parseInt(state.defense))) return setError({...error, defense: 'Requiere que ser un número'});
        if(state.defense < 0) return setError({...error, defense: 'Se requiere numero positivo'});
        else return setError({...error, defense: ''});
      case 'speed':
        if(isNaN(parseInt(state.speed))) return setError({...error, speed: 'Requiere que ser un número'});
        if(state.speed < 0) return setError({...error, speed: 'Se requiere numero positivo'});
        else return setError({...error, speed: ''});
        case 'height':
          if(isNaN(parseInt(state.height))) return setError({...error, height: 'Requiere que ser un número'});
          if(state.height < 0) return setError({...error, height: 'Se requiere numero positivo'});
          else return setError({...error, height: ''});    
      case 'weight':
        if(isNaN(parseInt(state.weight))) return setError({...error, weight: 'Requiere que ser un número'});
        if(state.weight < 0) return setError({...error, weight: 'Se requiere numero positivo'});
        else return setError({...error, weight: ''});

      case 'image':
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:\d{1,5})?(\/\S*)?$/;
        if (state.image === '') {
          return setError({ ...error, image: 'La URL de la imagen es requerida' });
        }
        if(!urlRegex.test(state.image)){
          return setError({...error, image: 'URL inválida'})
        } else {
          return setError({ ...error, image: '' });
        };
      case 'types':
          if(state.types.length > 1) setError({...error, types: ''});
            break

      default:
        break;
    }
  }

  // Disabled Button
  const disableFunction = ()=>{
    let disabled = true;
    for (let err in error) {
      if (error[err] === "" || error[err].length === 0) disabled = false;
      else {
        disabled = true;
        break;
      }
    }
    return disabled;
  }

  // Handle Inputs
  const handleChange = (event)=>{
    setState({
      ...state,
      [event.target.name] : event.target.value
    });

    validate({
      ...state,
      [event.target.name] : event.target.value
    }, event.target.name)
  }

  // Handle Post
  const handleSubmit = (event)=>{
    event.preventDefault();
    dispatch(postPokemon(state));
    setState({
      name: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      image: '',
      types: []
    });
  }

  // Handle Types
  const handleSelect = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;

    if (!state.types.includes(selectedValue)) {
      setError({...error, types: ''})
      // Agrega el valor seleccionado al arreglo
      setState({...state, types: [...state.types, selectedValue]})
    } else {
      // Muestra un mensaje de error o realiza alguna acción
      alert('Este tipo ya ha sido seleccionado.');
    }
  };

  // Handle Delete Types
  const handleDelete = (e) => {
    setState({
      ...state, // estado anterior
      types: state.types.filter((t) => t !== e),
    });
  };


  const imagesAleatorio = [
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-gengar-pixel/pokemon-gengar-pixel-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-mimikyu/pokemon-mimikyu-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-charizard-pixel/pokemon-charizard-pixel-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-snorlax-pixel/pokemon-snorlax-pixel-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-miltank/pokemon-miltank-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-starmie/pokemon-starmie-doodle.gif", 
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-corsola/pokemon-corsola-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-ledyba/pokemon-ledyba-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-pichu/pokemon-pichu-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-bellossom/pokemon-bellossom-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-mareep/pokemon-mareep-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-aipom/pokemon-aipom-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-celebi/pokemon-celebi-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-elekid/pokemon-elekid-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-tentacruel/pokemon-tentacruel-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-seadra/pokemon-seadra-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-kadabra/pokemon-kadabra-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-slowbro/pokemon-slowbro-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-pidgeot/pokemon-pidgeot.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-ivysaur/pokemon-ivysaur.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-rhyhorn/pokemon-rhyhorn-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-gyarados/pokemon-gyarados-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-hitmonchan/pokemon-hitmonchan-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-arcanine/pokemon-arcanine-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-ninetales/pokemon-ninetales-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-mr-mime/pokemon-mr-mime-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-golduck/pokemon-golduck.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-vaporeon/pokemon-vaporeon.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-butterfree/pokemon-butterfree.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-nidoking/pokemon-nidoking.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-dragonite/pokemon-dragonite.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-charmeleon/pokemon-charmeleon.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-mewtwo/pokemon-mewtwo.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-pidgey/pokemon-pidgey-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-bulbasaur/pokemon-bulbasaur-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-gastly/pokemon-gastly-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-pidgeotto/pokemon-pidgeotto-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-dratini/pokemon-dratini-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-caterpie/pokemon-caterpie-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-zapdos/pokemon-zapdos-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-wartortle/pokemon-wartortle-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-charizard/pokemon-charizard-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-oddish/pokemon-oddish-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-weedle/pokemon-weedle-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-flareon/pokemon-flareon-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-victreebel/pokemon-victreebel-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-raichu/pokemon-raichu-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-venomoth/pokemon-venomoth-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-poliwhirl/pokemon-poliwhirl-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-psyduck/pokemon-psyduck-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-scyther/pokemon-scyther-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-hitmonlee/pokemon-hitmonlee-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/auto-draft/pokemon-haunter-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-meowth/pokemon-meowth-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-moltres/pokemon-moltres-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-vulpix/pokemon-vulpix-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-wigglytuff/pokemon-wigglytuff-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-vileplume/pokemon-vileplume-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-machoke/pokemon-machoke-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-ponyta/pokemon-ponyta-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-jolteon/pokemon-jolteon-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-gengar/pokemon-gengar-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-cubone/pokemon-cubone-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-bellsprout/pokemon-bellsprout-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-articuno/pokemon-articuno-doodle.gif",
    "https://custom-doodle.com/wp-content/uploads/doodle/pokemon-squirtle-swag/pokemon-squirtle-swag-doodle.gif",
  ];

 const aleatorio = ()=>{
   const imagenAleatoria = imagesAleatorio[Math.floor(Math.random() * imagesAleatorio.length)];
    if(state.image === ""){
      setState({ ...state, image: imagenAleatoria });
      setError({...error, image: ''})
    }else{
      setState({...state, image: ''});
      setState({...state, image: imagenAleatoria});
      setError({...error, image: ''});
    }
 }

  return (
    <div className={styles.form}>

      <form onSubmit={handleSubmit} className={styles.inputs}>

        <div className={styles.card}>
          <p className={styles.heading}>Create</p>
  
          <div className={styles.inputDiv}>
          <input type="text" className={styles.input} placeholder="Name" name='name' onChange={handleChange} />
          <label className={styles.errorLabel}>{error.name}</label>
          </div>

          <div className={styles.inputDiv}>
          <input className={styles.input} type="number" placeholder="Hp" name='hp' onChange={handleChange}/>
          <label className={styles.errorLabel}>{error.hp}</label>
          </div>

          <div className={styles.inputDiv}>
          <input className={styles.input} type="number" placeholder="Attack" name='attack' onChange={handleChange}/>
          <label className={styles.errorLabel}>{error.attack}</label>
          </div>

          <div className={styles.inputDiv}>
          <input className={styles.input} type="number" placeholder="Defense" name='defense' onChange={handleChange}/>
          <label className={styles.errorLabel}>{error.defense}</label>
          </div>

          <div className={styles.inputDiv}>
          <input className={styles.input} type="number" placeholder="Speed" name='speed' onChange={handleChange}/>
          <label className={styles.errorLabel}>{error.speed}</label>
          </div>

          <div className={styles.inputDiv}>
          <input className={styles.input} type="number" placeholder="Weight" name='weight' onChange={handleChange}/>
          <label className={styles.errorLabel}>{error.weight}</label>
          </div>

          <div className={styles.inputDiv}>
          <input className={styles.input} type="number" placeholder="Height" name='height' onChange={handleChange}/>
          <label className={styles.errorLabel}>{error.height}</label>
          </div>

          <div className={styles.inputDiv}>
          <input className={styles.input} type="text" placeholder="URL imagen" value={state.image}  name='image' onChange={handleChange}/>
          <label className={styles.errorLabel}>{error.image}</label>
          </div>
          <button className={styles.aleatorio} type='button' onClick={aleatorio}>URL Aleatorio</button>
          
          
          <div className={styles.buttonDiv}>
            <button disabled={disableFunction()} className={`${styles.submit} ${disableFunction() ?  styles.disabled : ''}`} type='submit'>Submit</button>
          </div>
        
        </div>

        <div className={styles.types}>
          <p className={styles.heading}>Types</p>
          <select name='types' onChange={(e) => handleSelect(e)} className={styles.selectType} disabled={state.types.length >= 2}>
              {pokemonTypes.map((t, index) => (
                  <option key={index} value={t.name}>
                    {t.name}
                  </option>
              ))}
          </select>

          <div className={styles.fila}>
            {state.types.map((e, index) => (
              <div className={styles.divDelete} key={index}>
                <p className={styles.typeElegido} >
                  {e}
                </p>
                <button className={styles.botonX} onClick={() => handleDelete(e)}>
                  X
                </button>
              </div>
            ))}

            <label className={styles.errorLabel}>{error.types}</label>
          </div>

          <img className={styles.pokemon} src={state.image} alt="" />

        </div>
      </form>
    </div>
  )
}

export default Form