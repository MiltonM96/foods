const  axios  = require('axios');
const { Recipe, Diet } = require('../db');
const {API_KEY} = process.env;

// let diets = [
// 	{
// 		id: 'gluten free',
// 		name: 'gluten free',
// 	},
// 	{
// 		id: 'dairy free',
// 		name: 'dairy free'
// 	},
// 	{
// 		id: 'paleolithic',
// 		name: 'paleolithic'
// 	},
// 	{
// 		id: 'ketogenic',
// 		name: 'ketogenic',
// 	},
// 	{
// 		id: 'lacto ovo vegetarian',
// 		name: 'lacto ovo vegetarian',
// 	},
// 	{
// 		id: 'vegan',
// 		name: 'vegan',
// 	},
// 	{
// 		id: 'pescatarian',
// 		name: 'pescatarian',
// 	},
// 	{
// 		id: 'paleo',
// 		name: 'paleo',
// 	},
// 	{
// 		id: 'primal',
// 		name: 'primal',
// 	},
// 	{
// 		id: 'fodmap friendly',
// 		name: 'fodmap friendly'
// 	},
// 	{
// 		id: 'whole 30',
// 		name: 'whole 30',
// 	},
// ];

const getDiets = async (req,res) => {
	try {
		// const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
		// {
		// 	headers: { Accept: "application/json", "Accept-Encoding": "identity" },
		// 	params: { trophies: true },
		// }); 
		const dietsApi = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');
		const diets = dietsApi.data.results.map(el => el.diets);
		const dietEach = diets.flat();//es como un map con un for adentro
		const result = new Set(dietEach);//elimina repetidos
		result.forEach(el => {
			Diet.findOrCreate({
				where: { name: el }
			})
		})
		const allDiets = await Diet.findAll()
		
		res.status(200).send(allDiets);
	} catch (error) {
		res.status(404).send({error: error.message});
	}
    // try {
    //     let Diets = await Diet.findAll();
    //     if(!Diets.length) {
    //         await Diet.bulkCreate(diets);
    //         Diets = await Diet.findAll();
    //     }
    //     res.status(200).json(Diets);
    // } catch (error) {
    //     res.status(404).send({error: error.message});
    // }
}

module.exports = {
    getDiets,
}