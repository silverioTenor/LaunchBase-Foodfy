const { Router } = require('express');
const routes = Router();

const public = require('./public');

routes.use('/', public);

module.exports = routes;