const { Router } = require('express');

const sessionRoutes = Router();

const SessionController = require('../app/controllers/SessionController');
const SessionValidator = require('../app/validators/SessionValidator');

const sessionController = new SessionController();
const sessionValidator = new SessionValidator();

sessionRoutes.get('/login', sessionController.loginForm);
sessionRoutes.post('/login', sessionValidator.login, sessionController.login);

sessionRoutes.get('/forgot-password', sessionController.forgotForm);
sessionRoutes.get('/password-reset', sessionController.resetForm);
sessionRoutes.post('/password-reset', sessionValidator.reset, sessionController.reset);

module.exports = sessionRoutes;