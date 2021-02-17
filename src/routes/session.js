const { Router } = require('express');

const sessionRoutes = Router();

const SessionController = require('../app/controllers/SessionController');
const SessionValidator = require('../app/validators/SessionValidator');

sessionRoutes.get('/login', SessionController.loginForm);
sessionRoutes.post('/login', SessionValidator.login, SessionController.login);

sessionRoutes.get('/forgot-password', SessionController.forgotForm);
sessionRoutes.get('/password-reset', SessionController.resetForm);

module.exports = sessionRoutes;