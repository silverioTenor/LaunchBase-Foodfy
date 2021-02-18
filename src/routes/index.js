const { Router } = require('express');

const routes = Router();

const public = require('./public');
const private = require('./private');
const session = require('./session');

routes.use('/', public);
routes.use('/admin', private);
routes.use('/session', session);

// Alias
routes.get('/session', (request, response) => response.redirect('/session/login'));

module.exports = routes;