const { Router } = require('express');

const sessionRoutes = Router();

const SessionController = require('../app/controllers/SessionController');

sessionRoutes.get('/password-reset', SessionController.reset);

module.exports = sessionRoutes;