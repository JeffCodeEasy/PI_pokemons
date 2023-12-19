import axios from 'axios' ;

export function postPokemon(state){
    return async function (dispatch){
        try {
            const {data} = await axios.post("http://localhost:3001/pokemon", state);
            dispatch({
                type: "POST_POKEMON",
                payload: data
            })
            alert("Pokemon Creado");
            return data;
        } catch (error) {
            // console.log(error);
            // alert(error.response.data.error);

        }
    }
}


export function getPokemon(){
    return async function (dispatch){
        try {
            const {data} = await axios.get("http://localhost:3001/pokemon/")
            dispatch({
                type: "GET_POKEMONS",
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getNamePokemon(name){
    return async function(dispatch){
        try {
            const {data} = await axios.get(`http://localhost:3001/pokemon/?name=${name}`)
            dispatch({
                type: "GET_NAME_POKEMONS",
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getTypes(){
    return async (dispatch)=>{
        try {
            const {data} = await axios.get('http://localhost:3001/types')
            dispatch({
                type: "GET_TYPES",
                payload: data
            })
        } catch (error) {
            
        }
    }
}


export const orderByName = (payload) => {
    return {
      type: "ORDER_BY_NAME",
      payload,
    };
  };


  export const filterByType = (payload) => {
    return {
      type: "FILTER_BY_TYPE",
      payload,
    };
  };


  export const filterCreated = (payload) => {
    return {
      type: "FILTER_CREATED",
      payload,
    };
  };