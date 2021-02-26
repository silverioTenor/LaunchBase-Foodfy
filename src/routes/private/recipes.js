const { Router } = require('express');
const { upload } = require('../../app/middlewares/upload');

const recipeRoutes = Router();

const RecipeController = require('../../app/controllers/RecipeController');
const RecipeValidator = require('../../app/validators/RecipeValidator');

const { onlyUsers } = require('../../app/middlewares/authenticatedRoutes');

const recipeController = new RecipeController();
const recipeValidator = new RecipeValidator();

recipeRoutes.get('/', onlyUsers, recipeController.index);
recipeRoutes.get('/create', onlyUsers, recipeController.create);
recipeRoutes.get('/show/:id', onlyUsers, recipeController.show);
recipeRoutes.get('/update/:id', onlyUsers, recipeController.update);
recipeRoutes.post('/', upload.array('photo', 5), recipeValidator.post, recipeController.post);
recipeRoutes.put('/', upload.array('photo', 5), recipeValidator.put, recipeController.put);
recipeRoutes.delete('/', recipeController.delete);

module.exports = recipeRoutes;