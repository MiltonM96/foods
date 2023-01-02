import React from 'react'
import {useState, useEffect} from  'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterRecipesByDiet, orderByName, orderByScore, filterCreated } from '../../redux/actions/actions';
import {Link, NavLink} from 'react-router-dom';
import Card from '../Card/Card';
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
import styled from 'styled-components'
import Styles from './Home.module.css'



const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);// es lo mismo qe hacer el mapStateToProps. Me traigo del reducer el estado
  const [order, setOrder] = useState('');
  const [order2, setOrder2] = useState('');
  const [currentPage, setCurrentPage] = useState(1);//estado local(pagina actual q empieza en 1)
  const [recipesPerPage, setRecipesPerPage] = useState(9);//Estado local(Cant de recetas por pag)
  const indexOfLastRecipe = currentPage * recipesPerPage //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage //0
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  //traemos del estado las recetas cuando el componente se monta
  useEffect(() => {
    dispatch(getRecipes())//es lo mismo que hacer el mapDispatchToProps
  },[dispatch])

  function handleClick(e){
    e.preventDefault();
    dispatch(getRecipes());
  }

  const handlePrevClick = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }
  const handleNextClick = () => {
    if(currentPage < (Math.ceil(allRecipes.length/recipesPerPage))){
      setCurrentPage(currentPage + 1);
    }
  }

  function refreshPage() {
    window.location.reload();
  }

  function handleFilterDiet(event){
    dispatch(filterRecipesByDiet(event.target.value));
    setCurrentPage(1);
  }

  function handleSortByName(event){
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${event.target.value}`);
  }

  function handleSortByScore(event){
    event.preventDefault();
    dispatch(orderByScore(event.target.value));
    setCurrentPage(1);
    setOrder2(`Ordenado ${event.target.value}`);
  }

  function handleFilterCreated(event) {
    dispatch(filterCreated(event.target.value));
  }

  

  return (
    <div className={Styles.container}>
        <div className={Styles.nav}>
          <button onClick={e => {refreshPage()}}> 
            Home
          </button>
          <Link to='/createRecipe'><button>Crear receta</button></Link>
          <SearchBar/>
        </div>

        <div className={Styles.imageTitule}>
          <h1 class={Styles.titule}>Las recetas de la abuela</h1>
        </div>
        <div class={Styles.filtersAndPag}>
        <div class={Styles.filters}>
          <select onChange={e => handleSortByName(e)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select onChange={e => handleSortByScore(e)}>
            <option value="mayor">Mayor health score</option>
            <option value="menor">Menor health score</option>
          </select>
          <select onChange={e => handleFilterDiet(e)}>
            <option value="All">Todos</option>
            <option value="gluten free">Gluten Free</option>
            <option value="dairy free">Dairy Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="lacto ovo vegetarian">Lacto ovo Vegetarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="primal">Primal</option>
            <option value="fodmap friendly">Fodmap friendly</option>
            <option value="whole 30">Whole 30</option>
          </select>
          <select onChange={e => handleFilterCreated(e)}>
            <option value="All">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
          </select>
          </div>

          <div className={Styles.paginate}>
            <button className={Styles.buttonPrev} onClick={() => handlePrevClick()}>Prev</button>
            <Paginate
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginate={paginate}/>
            <button className={Styles.buttonNext} onClick={() => handleNextClick()}>Next</button>
          </div>
          </div>
        <div className={Styles.cards}>
          {currentRecipes?.map((recipes) => {
            return(
              <div className={Styles.card}>
                <NavLink className={Styles.card} to={`/detail/${recipes.id}`}>
                <Card name={recipes.name} healthScore={recipes.healthScore} image={recipes.image ? recipes.image : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"/>} diets={recipes.createdInDb ? recipes.diets?.map(d=>d.name + (' ')) : recipes.diets?.map(d=>d + (' '))} key={recipes.id} />
                </NavLink>
              </div>
            )
          })}
        </div>
        
    </div>
  )
}

export default Home;