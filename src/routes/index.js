const { Router } = require('express');
const routes = Router();

const public = require('./public');
const admin = require('./private/admin');

routes.use('/', public);
routes.use('/admin', admin);

// Aliás
routes.get('/admin', (request, response) => response.redirect('/admin/profile'));

module.exports = routes;