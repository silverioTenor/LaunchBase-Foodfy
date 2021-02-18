const { Router } = require('express');

const recipeRoutes = Router();

const RecipeController = require('../../app/controllers/RecipeController');

const recipeController = new RecipeController();

recipeRoutes.get('/', recipeController.index);
recipeRoutes.get('/create', recipeController.create);
recipeRoutes.get('/show', recipeController.show);
recipeRoutes.get('/update', recipeController.update);

module.exports = recipeRoutes;