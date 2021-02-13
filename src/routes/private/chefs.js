const { Router } = require('express');

const ChefController = require('../../app/controllers/ChefController');

const recipeRoutes = Router();

recipeRoutes.get('/', ChefController.index);
recipeRoutes.get('/create', ChefController.create);
recipeRoutes.get('/show', ChefController.show);
recipeRoutes.get('/update', ChefController.update);

module.exports = recipeRoutes;