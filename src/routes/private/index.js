const { Router } = require('express');
const routes = Router();

const admin = require('./admin');
const recipes = require('./recipes');
const chefs = require('./chefs');

routes.use('/', admin);
routes.use('/recipes', recipes);
routes.use('/chefs', chefs);

// Alias
routes.get('/admin', (request, response) => response.redirect('/admin/profile'));

module.exports = routes;