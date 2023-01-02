const { Router } = require('express');
const  axios  = require('axios');
const { Recipe } = require('../db');
const { getRecipes, getRecipeById, createRecipe, getAllRecipes, getDbInfo } = require('../controllers/recipe.controller');

const recipesRouter = Router();


recipesRouter.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        const recipesTotal = await getAllRecipes();
        if(name){
            //busco en la base de datos
            // const responseDB = await Recipe.findAll({
            //     where: {
            //         name: {
            //             [Op.substring]: name
            //         }
            //     }
            // })
            const recipeName = recipesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

            recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("Recipe not found");
        } else {
            res.status(200).json(recipesTotal);
        }
    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


recipesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const recipesTotal = await getAllRecipes();
    // if(id.length > 12) {
    //     const recipeDB = await Recipe.findByPk(id,{
    //         include: {
    //             model: Diet,
    //             atributes: ["name"],
    //             through: {
    //                 attributes: [],
    //                 },
    //             },
    //         });
    //     res.status(200).json(recipeDB);
    // }
    
    if(id){
        const recipeId = await recipesTotal.filter(el => el.id == id);
        // console.log(recipeId);
        recipeId.length ? 
        res.status(200).json(recipeId) :
        res.status(404).send("No se encontro esa receta")
    }
});


recipesRouter.post('/', createRecipe);

recipesRouter.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        const recipe = await Recipe.findByPk(id);
        await recipe.destroy();
        res.status(200).send(recipe);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = recipesRouter;