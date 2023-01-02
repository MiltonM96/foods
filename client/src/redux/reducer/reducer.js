import { GET_RECIPES, FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, FILTER_CREATED, GET_NAME_RECIPES, POST_RECIPE, DELETE_RECIPE, GET_DIETS, GET_DETAILS, CLEAN_DETAIL } from "../actions/TypesActions";

const initialState = {
    recipes: [],
    detail: [],
    allRecipes: [],
    diets: []
}

function rootReducer(state=initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_NAME_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
        case POST_RECIPE: 
        return {
            ...state,
        }
        case DELETE_RECIPE:
            return{
                ...state,
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }

        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes;
            const dietFiltered = action.payload === 'All' ? allRecipes : allRecipes.filter(el => el.diets.includes(action.payload));
            return {
                ...state,
                recipes: dietFiltered
            }
        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) : 
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            return{
                ...state,
                recipes: sortedArr
            }
        case ORDER_BY_SCORE:
            let sortedScore = action.payload === 'mayor' ?
            state.recipes.sort(function (a, b) {
                if(a.healthScore > b.healthScore){
                    return -1;
                }
                if(b.healthScore > a.healthScore){
                    return 1;
                }
                return 0
            }) :
            state.recipes.sort(function (a, b) {
                if(a.healthScore > b.healthScore){
                    return 1;
                }
                if(b.healthScore > a.healthScore){
                    return -1;
                }
                return 0;
            })
            return{
                ...state,
                recipes: sortedScore
            }
        case FILTER_CREATED:
            const createdFilter = action.payload === 'created' ? state.allRecipes.filter(el => el.createdInDb) : state.allRecipes.filter(el => !el.createdInDb);
            return{
                ...state,
                recipes: action.payload === 'All' ? state.allRecipes : createdFilter
            }
        case GET_DETAILS:
            return{
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
            return{
                ...state,
                detail: []
            }
        default:
            return {...state};
    }
}

export default rootReducer;