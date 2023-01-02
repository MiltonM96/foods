const { Router } = require('express');
const  axios  = require('axios');
const { Recipe, Diet} = require('../db');
const { Op } = require('sequelize');
const {API_KEY} = process.env;


const getApiInfo = async () => {
    // const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
    // {
    //     headers: { Accept: "application/json", "Accept-Encoding": "identity" },
    //     params: { trophies: true },
    // }); 
    const apiUrl = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');
    const apiInfo = await apiUrl.data.results.map((data) => {                 
        return {
            id: data.id,
            name: data.title,
            summary: data.summary,
            image: data.image,
            healthScore: data.healthScore,
            steps: data.analyzedInstructions[0]?.steps.map((step) => {
                return{
                    number: step.number,
                    step: step.step,
                }
            }),
            diets: data.diets,
        }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}

// const getRecipes = async (req, res) => {
//     try {
//         const { name } = req.query;
//         const recipesTotal = await getAllRecipes();
//         if(name){
//             //busco en la base de datos
//             // const responseDB = await Recipe.findAll({
//             //     where: {
//             //         name: {
//             //             [Op.substring]: name
//             //         }
//             //     }
//             // })
//             const recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

//             recipeName.length ?
//             res.status(200).send(recipeName) :
//             res.status(404).send("Recipe not found");
//         } else {
//             res.status(200).json(recipesTotal);
//         }
//     } catch (error) {
//         res.status(404).send({error: error.message});
//     }
// }

// const getRecipeById = async (req, res) => {
//     const { id } = req.params;
//     const recipesTotal = await getAllRecipes();
//     // if(id.length > 12) {
//     //     const recipeDB = await Recipe.findByPk(id,{
//     //         include: {
//     //             model: Diet,
//     //             atributes: ["name"],
//     //             through: {
//     //                 attributes: [],
//     //                 },
//     //             },
//     //         });
//     //     res.status(200).json(recipeDB);
//     // }
    
//     if(id){
//         const recipeId = await recipesTotal.filter(el => el.id == id);
//         // console.log(recipeId);
//         recipeId.length ? 
//         res.status(200).json(recipeId) :
//         res.status(404).send("No se encontro esa receta")
//     }
    
    
// }

const createRecipe = async (req, res) => {
    try {
        const { name, summary, image, healthScore, steps, createdInDb, diets } = req.body;
        const allRecipes = await getAllRecipes();
        const recipeName = await allRecipes.filter(el => el.name.toLowerCase() === name.toLowerCase());
        if(recipeName.length) {
            return res.status(404).send("YA HAY UNA CON ESE NOMBRE");
        }
        const newRecipe = await Recipe.create({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            summary,
            image,
            healthScore, 
            steps,
            createdInDb,
        });

        const dietsDb = await Diet.findAll({
            where: {
                name: diets
            }
        })
        await newRecipe.addDiets(dietsDb);
        console.log("creado");
        res.status(200).json("Creado con exito");
    } catch (error) {
        console.log(error);
        res.status(404).send({error: error.message});
    }
}

module.exports ={
    // getRecipes,
    createRecipe,
    // getRecipeById,
    getAllRecipes,
    getDbInfo,
}