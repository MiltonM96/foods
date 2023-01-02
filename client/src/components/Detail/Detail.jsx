import React from 'react'
import {useEffect} from  'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, cleanDetail, deleteRecipe } from '../../redux/actions/actions';
import Styles from './Detail.module.css'

function Detail(props) {
  console.log(props);

  const dispatch = useDispatch();
  // const redirect  = redirect ();

  useEffect(() => {
    dispatch(getDetail(props.match.params.detailId));
  }, [dispatch]);

  function handleClean(event){
    event.preventDefault();
    dispatch(cleanDetail(event.target.value));
    window.location = '/home';
  }

  async function handleDelete(event){
    event.preventDefault();
    const result = await dispatch(deleteRecipe(event.target.value));
    console.log(result);
    window.location = '/home';
  }

  const myRecipe = useSelector((state) => state.detail);
  console.log(myRecipe);
  
  return (
    <div className={Styles.container}>
      <Link to='/home'>
        <button className={Styles.buttonVolver} value="button" onClick={(e) => {handleClean(e)}}>Volver</button>
      </Link>
      {
        myRecipe.length ?
        <div>
          <Link to='/home'>
            <button className={Styles.buttonEliminar} value="button" onClick={(e) => {handleDelete(e)}}>Eliminar receta</button>
          </Link>
          <h1 className={Styles.name}>{myRecipe[0].name}</h1>
          <img className={Styles.image} src={myRecipe[0].image} alt="" width="300" height="300"/>
          
          <div className={Styles.diets}>
            <h3>Diets: </h3>
            {
              myRecipe[0].createdInDb ?
              myRecipe[0].diets?.map((d)=>
                <h5 className={Styles.diet}>{d.name} </h5>) :
              myRecipe[0].diets?.map((d) =>
                <h5 className={Styles.diet}>{d}</h5>)
            }
          </div>

          {/* <h5 className={Styles.diets}>{myRecipe[0].createdInDb ? myRecipe[0].diets?.map(d=>d.name + (', ')) : myRecipe[0].diets?.map((d) => d + (' '))}</h5> */}
          <h3>Summary: </h3><p className={Styles.summary}>{myRecipe[0].summary}</p>
          {myRecipe[0].steps ? 
          <div className={Styles.steps}>
            <h3>Steps:</h3>
            {
              myRecipe[0].createdInDb ?
              myRecipe[0].steps?.map((s) =>
                <p className={Styles.step}>{s}</p>
              ) :
              myRecipe[0].steps?.map((s) =>
                <div><p className={Styles.step}>{s.step}</p></div>
              )
            }
          </div> :
          <div></div>
          }
          {/* <div>
            <p>{myRecipe[0].createdInDb ? myRecipe[0].steps.map((step) => step + (' ')) : myRecipe[0].steps?.map((step) => step.step + (' \n '))}</p>
          </div> */}
        </div> :
        <div className={Styles.loading}><p>Loading...</p></div>
      }
      {/* <Link to='/home'>
        <button className={Styles.buttonVolver} value="button" onClick={(e) => {handleClean(e)}}>Volver</button>
      </Link> */}
    </div>
  )
}

export default Detail