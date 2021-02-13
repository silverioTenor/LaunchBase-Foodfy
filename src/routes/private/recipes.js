const { Router } = require('express');

const RecipeController = require('../../app/controllers/RecipeController');

const recipeRoutes = Router();

recipeRoutes.get('/', RecipeController.index);
recipeRoutes.get('/create', RecipeController.create);
recipeRoutes.get('/show', RecipeController.show);
recipeRoutes.get('/update', RecipeController.update);

module.exports = recipeRoutes;