const { Router } = require('express');
const routes = Router();

const admin = require('./admin');
const recipes = require('./recipes');

routes.use('/', admin);
routes.use('/recipes', recipes);

// Alias
routes.get('/admin', (request, response) => response.redirect('/admin/profile'));

module.exports = routes;