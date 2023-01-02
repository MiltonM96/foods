import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../../redux/actions/actions';
import Styles from './SearchBar.module.css';

function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        // console.log(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await dispatch(getNameRecipes(name));
        if(result === 404){
            alert("Receta no encontrada");
        }
        console.log(result);
    }

    return (
        <div className={Styles.divSearch}>
            <input 
                type='text'
                placeholder='Buscar...'
                onChange = {(e) => handleInputChange(e)}
            />

            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}

export default SearchBar