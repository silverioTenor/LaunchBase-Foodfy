const { Router } = require('express');
const { upload } = require('../../app/middlewares/upload');

const recipeRoutes = Router();

const RecipeController = require('../../app/controllers/RecipeController');
const RecipeValidator = require('../../app/validators/RecipeValidator');

const recipeController = new RecipeController();
const recipeValidator = new RecipeValidator();

recipeRoutes.get('/', recipeController.index);
recipeRoutes.get('/create', recipeController.create);
recipeRoutes.get('/show', recipeController.show);
recipeRoutes.get('/update', recipeController.update);
recipeRoutes.post('/', upload.array('photo', 5), recipeValidator.post, recipeController.post);

module.exports = recipeRoutes;