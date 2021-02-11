const { Router } = require('express');

const sessionRoutes = Router();

const SessionController = require('../app/controllers/SessionController');

sessionRoutes.get('/login', SessionController.loginForm);

sessionRoutes.get('/forgot-password', SessionController.forgotForm);
sessionRoutes.get('/password-reset', SessionController.resetForm);

module.exports = sessionRoutes;