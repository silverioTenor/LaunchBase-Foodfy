const { Router } = require('express');

const routes = Router();

const users = require('./users');
const recipes = require('./recipes');
const chefs = require('./chefs');

routes.use('/', users);
routes.use('/recipes', recipes);
routes.use('/chefs', chefs);

// Alias
routes.get('/', (request, response) => response.redirect('/admin/chefs'));

module.exports = routes;