const { Router } = require('express');
const routes = Router();

const admin = require('./admin');
const recipes = require('./recipes');

routes.use('/recipes', recipes);
routes.use('/', admin);

// Alias
routes.get('/admin', (request, response) => response.redirect('/admin/profile'));

module.exports = routes;