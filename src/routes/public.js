const { Router } = require('express');

const publicRoutes = Router();

const HomeController = require('../app/controllers/HomeController');

const homeController = new HomeController();

publicRoutes.get('/', homeController.home);
publicRoutes.get('/recipes', homeController.recipes);
publicRoutes.get('/recipes/show/:id', homeController.recipeShow);
publicRoutes.get('/about', homeController.about);
publicRoutes.get('/chefs', homeController.chefs);
publicRoutes.get('/chefs/show/:id', homeController.chefShow);

module.exports = publicRoutes;