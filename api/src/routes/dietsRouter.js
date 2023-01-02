const { Router } = require('express');
const { getDiets } = require('../controllers/diet.controller')

const dietsRouter = Router();

dietsRouter.get('/', getDiets);

module.exports = dietsRouter;