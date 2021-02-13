const { Router } = require('express');

const RecipeController = require('../../app/controllers/RecipeController');

const recipeRoutes = Router();

recipeRoutes.get('/', RecipeController.index);
recipeRoutes.get('/show', RecipeController.show);

module.exports = recipeRoutes;