import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './Form.module.css';

function validate(form){
  let errors = {};
  if(!form.name){
    errors.name = 'Se requiere un nombre';
  } if(form.name.length > 60){
    errors.name = 'Debe contener como máximo 45 caracteres';
  } if(!form.healthScore){
    errors.healthScore = 'Se requiere un health Score';
  } if (!(/^\d+$/.test(form.healthScore))){
    errors.healthScore = 'Debe ser numerico'
  } if(form.healthScore > 100 || form.healthScore <= 0){
    errors.healthScore = 'Se requiere un numero entre 1 y 100';
  } if(!form.summary){
    errors.summary = 'Se requiere un resumen';
  } if(!form.image){
    errors.image = 'Se requiere imagen';
  }
  if (
    !/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/.test(
      form.image
    )
  ) {
    errors.image = "Url de imagen inválida";
  }
  
  return errors;
}


function Form() {
  const dispatch = useDispatch();
  //const diets = useSelector((state) => state.diets); //sirve para mostrarlo en el hipotetico select
  const history = useHistory();
  let i = 0;

  const [form, setForm] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: [],
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({});

  const [step, setStep] = useState("");

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const property = event.target.name;
    setForm({
      ...form,
      [property] : value
    })
    setErrors(validate({
      ...form,
      [property] : value
    }))
  }

  const handleCheckChange = (event) => {
    if(event.target.checked){
      setForm({
        ...form,
        diets: [...form.diets, event.target.value]
      })
    } else{
      const filter = form.diets.filter(e => e !== event.target.value)
      setForm({
        ...form,
        diets: [...filter]
      })
    }
    console.log(form.diets);
  }

  // para un hipotetico select
  // const handleSelectChange = (event) => {
  //   setForm({
  //     ...form,
  //     diets: [...form.diets, event.target.value]
  //   })
  // }
  // const handleDelete = (diet) => {
  //   setForm({
  //     ...form,
  //     diets: form.diets.filter(e => e !== diet)
  //   })
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(form);
    if (!Object.values(form).includes('')) {
      if(Object.keys(errors).length === 0){
        const result = await dispatch(postRecipe(form));
        console.log(result);
        if(result.status){
          alert("Receta creada!!!");
          setForm({
            name: "",
            summary: "",
            healthScore: "",
            steps: [],
            image: "",
            diets: [],
          });
          history.push('/home');
        }
        else{
          alert("Nombre de receta repetido, por favor ingrese otro nombre");
        }
      }
    }   
    
  }

  const addStep = (event) => {
    event.preventDefault();
    if(form.steps.length < 10) {
      if(step.length > 0) {
        setForm({
          ...form,
          steps: [...form.steps, step]
        })
        setStep('');
      } 
    }else{
      alert('Hasta 10 pasos');
    }
  }

  const deleteStep = (s) => {
    setForm({
      ...form,
      steps: form.steps.filter(step => step !== s.target.value)
    })
    console.log(s.target.value);
  }

  const handleStepsChange = (event) => {
    setStep(event.target.value);
  }

  return (
    <div className={Styles.containerForm}>
      <div className={Styles.buttonAndTitle}>
        <Link to='/home'><button>Volver</button></Link>
      </div>
      
      <div className={Styles.form}>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <h1 className={Styles.creaTuReceta}>Crea tu receta!</h1>
          <div className={Styles.nameForm}>
            <label>Nombre: </label>
            <input
              className={errors.name && Styles.warning}
              type="text"
              value={form.name}
              name="name"
              onChange={(e)=>handleInputChange(e)}
            />{errors.name && <p className={Styles.danger}>{errors.name}</p>}
          </div>
          <div className={Styles.summaryForm}>
            <label>Resumen: </label>
            <input
              className={errors.summary && Styles.warning}
              type="text"
              value={form.summary}
              name="summary"
              onChange={(e)=>handleInputChange(e)}
            />{errors.summary && <p className={Styles.danger}>{errors.summary}</p>}
          </div>
          <div className={Styles.healthForm}>
            <label>Health Score: </label>
            <input
            className={errors.healthScore && Styles.warning}
              type="text"
              value={form.healthScore}
              name="healthScore"
              onChange={(e)=>handleInputChange(e)}
            />{errors.healthScore && <p className={Styles.danger}>{errors.healthScore}</p>}
          </div>
          <div className={Styles.stepsForm}>
            <label>Paso a paso: </label>
              <div className={Styles.stepForm}><textarea
              type="text"
              value={step}
              name="steps"
              onChange={(e)=>handleStepsChange(e)}
              /><button onClick={(e)=> addStep(e)}> Agregar </button>
              </div>
            {/* {
            form.steps.map((s) => 
              <div className={Styles.stepForm}>
                <ul><button type="button" value={s} onClick={(s) => deleteStep(s)}> x </button><p>{s}</p></ul>
              </div>
            )
            } */}
            
          </div>
          <div className={Styles.imageForm}>
            <label>Imagen: </label>
            <input
              className={errors.image && Styles.warning}
              type="text"
              value={form.image}
              name="image"
              onChange={(e)=>handleInputChange(e)}
            />{errors.image && <p className={Styles.danger}>{errors.image}</p>}
          </div>
          <div className={Styles.divTodoDiets}>
          <div className={Styles.dietsLabel}><label>Diets: </label></div>
          <div className={Styles.dietsForm}>
            <label><input
              type="checkbox"
              value="gluten free"
              name="gluten free"
              onChange={(e)=>handleCheckChange(e)}
            />gluten free</label>
            <label><input
              type="checkbox"
              value="dairy free"
              name="dairy free"
              onChange={(e)=>handleCheckChange(e)}
            />dairy free</label>
            <label><input
              type="checkbox"
              value="ketogenic"
              name="ketogenic"
              onChange={(e)=>handleCheckChange(e)}
            />ketogenic</label> 
            <label><input
              type="checkbox"
              value="lacto ovo vegetarian"
              name="lacto ovo vegetarian"
              onChange={(e)=>handleCheckChange(e)}
            />lacto ovo vegetarian</label> 
            <label><input
              type="checkbox"
              value="paleolithic"
              name="paleolithic"
              onChange={(e)=>handleCheckChange(e)}
            />paleolithic</label> 
            <label><input
              type="checkbox"
              value="vegan"
              name="vegan"
              onChange={(e)=>handleCheckChange(e)}
            />vegan</label> 
            <label><input
              type="checkbox"
              value="pescatarian"
              name="pescatarian"
              onChange={(e)=>handleCheckChange(e)}
            />pescatarian</label> 
            <label><input
              type="checkbox"
              value="primal"
              name="primal"
              onChange={(e)=>handleCheckChange(e)}
            />primal</label>
            <label><input
              type="checkbox"
              value="fodmap friendly"
              name="fodmap friendly"
              onChange={(e)=>handleCheckChange(e)}
            />fodmap friendly</label>
            <label><input
              type="checkbox"
              value="whole 30"
              name="whole 30"
              onChange={(e)=>handleCheckChange(e)}
            />whole 30</label>
          </div>
          </div>
          {/* <select onChange={(e) => handleSelectChange(e)}>
            {diets.map((d) => { 
              return <option value={d.name}>{d.name}</option>
            })}
          </select> */}
          {form.diets.length > 0 ? 
          <div className={Styles.mostrarDiets}>
          {
            form.diets.map((d) =>
              <ul><p className={Styles.cadaDieta}>{d}</p></ul>
            )
          }
          </div> :
          <div></div>
          }
          {/* otra forma */}
          {/* <ul><li>{form.diets.map(el => el + ', ')}</li></ul> */}
          <button className={Styles.buttonSubmitForm} type="submit">Crear receta</button>
        </form>
      </div>
      {form.steps.length > 0 ?
      <div className={Styles.mostrarSteps}>
      {
        form.steps.map((s) => 
          <div className={Styles.mostrarStep}>
            <ul><button className={Styles.deleteStepButton} type="button" value={s} onClick={(s) => deleteStep(s)}> x </button><p>{s}</p></ul>
          </div>
        )
      }
      </div> :
      <div></div>
      }
      {/* forma para el hipotetico select */}
      {/* {
        form.diets.map((d) => 
          <div>
            <p>{d}</p>
            <button onClick={() => handleDelete(d)}>x</button>
          </div>  
        )
      } */}
    </div>
    
  )
}

export default Form