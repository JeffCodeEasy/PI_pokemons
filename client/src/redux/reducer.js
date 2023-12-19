let pokemonState = {
    allPokemons: [],
    allPokemonsBackup: [],
    types: [],
};

const rootReducer = (state = pokemonState, action) =>{
    switch(action.type){
        case "GET_POKEMONS":
            return {...state, allPokemons: action.payload, allPokemonsBackup: action.payload}

        case "GET_NAME_POKEMONS":
            return {...state, allPokemons: action.payload};
        
        case "GET_TYPES":
            return {...state, types: action.payload}
        
        case "ORDER_BY_NAME":
            let sortedAll =
                action.payload === "asc"
                ? state.allPokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                        }
                        if (b.name > a.name) {
                          return -1;
                        }
                        return 0;
                      })
                    : state.allPokemons.sort((a, b) => {
                        if (a.name > b.name) {
                          return -1;
                        }
                        if (b.name > a.name) {
                          return 1;
                        }
                        return 0;
                      });
                return {
                  ...state,
                  allPokemons: sortedAll,
                };
                
        case "FILTER_BY_TYPE":
            let filterType;
            if (action.payload === "All") {
                filterType = state.allPokemonsBackup;
            } else {
                    filterType = state.allPokemonsBackup.filter((e) =>
                e.types.includes(action.payload)
                );
            }
            return {
                ...state,
                allPokemons: filterType,
            }; 
        case "FILTER_CREATED":
            const createdFilter = action.payload === "created"
                    ? state.allPokemonsBackup.filter((e) => e.createdInDb)
                    : state.allPokemonsBackup.filter((e) => !e.createdInDb);
            return {
                ...state,
                allPokemons: action.payload === "All" ? state.allPokemonsBackup : createdFilter,
            };

        case "POST_POKEMON":
            return {
                ...state, allPokemonsBackup: [...state.allPokemonsBackup, action.payload]
            } 

        default:
            return {...state}; 
        }

        
 
    };

export default rootReducer;