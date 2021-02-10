const { Router } = require('express');
const routes = Router();

const public = require('./public');
const admin = require('./private/admin');
const session = require('./session');

routes.use('/', public);
routes.use('/admin', admin);
routes.use('/session', session);

// Alias
routes.get('/admin', (request, response) => response.redirect('/admin/profile'));
routes.get('/session', (request, response) => response.redirect('/session/login'));

module.exports = routes;