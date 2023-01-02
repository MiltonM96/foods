import axios from 'axios';
import { API_URL } from '../../config';
import { GET_RECIPES, FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, FILTER_CREATED, GET_NAME_RECIPES, GET_DIETS, GET_DETAILS, CLEAN_DETAIL } from './TypesActions';

export function getRecipes(){
    return async function(dispatch) {
        var json = await axios.get(`${API_URL}/recipes`,{
            // headers: { Accept: "application/json", "Accept-Encoding": "identity" },
            // params: { trophies: true },
        }); 
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}

export function getNameRecipes(name){
    return async function(dispatch) {
        try {
            var json = await axios.get(`${API_URL}/recipes?name=` + name);
            return dispatch({
                type: GET_NAME_RECIPES,
                payload: json.data
            })
        } catch (error) {
            return error.response.status;
        }
    }
}

export function getDiets(){
    return async function (dispatch){
        var json = await axios.get(`${API_URL}/diets`, {

        });
        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
}

export function postRecipe(payload){
    return async function (dispatch) {
        try {
            const response = await axios.post(`${API_URL}/recipes`, payload);
            // console.log(response.status);
            return response;
        } catch (error) {
            // console.log(error.response.status);
            return error;
        }
        
    }
}

export function deleteRecipe(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`${API_URL}/recipes`, payload);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export function filterRecipesByDiet(payload){
    return{
        type: FILTER_BY_DIET,
        payload
    }
}

export function orderByScore(payload){
    return{
        type: ORDER_BY_SCORE,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function getDetail(id){
    return async function (dispatch) {
        try {
            var json = await axios.get(`${API_URL}/recipes/` + id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error.response.status);
        }
    }
}

export function cleanDetail(payload){
    return{
        type: CLEAN_DETAIL,
        payload
    }
}