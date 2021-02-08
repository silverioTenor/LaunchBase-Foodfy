const { Router } = require('express');
const publicRoutes = Router();

const HomeController = require('../../app/controllers/HomeController');

publicRoutes.get('/', HomeController.home);
publicRoutes.get('/recipes', HomeController.recipes);
publicRoutes.get('/about', HomeController.about);

module.exports = publicRoutes;