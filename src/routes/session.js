const { Router } = require('express');

const sessionRoutes = Router();

const SessionController = require('../app/controllers/SessionController');
const SessionValidator = require('../app/validators/SessionValidator');

const { isLogged } = require('../app/middlewares/authenticatedRoutes');

const sessionController = new SessionController();
const sessionValidator = new SessionValidator();

sessionRoutes.get('/login', isLogged, sessionController.loginForm);
sessionRoutes.post('/login', sessionValidator.login, sessionController.login);
sessionRoutes.post('/logout', sessionController.logout);

sessionRoutes.get('/forgot-password', isLogged, sessionController.forgotForm);
sessionRoutes.get('/password-reset', isLogged, sessionController.resetForm);
sessionRoutes.post('/forgot-password', sessionValidator.forgot, sessionController.forgot);
sessionRoutes.post('/password-reset', sessionValidator.reset, sessionController.reset);

module.exports = sessionRoutes;