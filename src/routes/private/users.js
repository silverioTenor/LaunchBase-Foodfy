const { Router } = require('express');

const adminRoutes = Router();

const ProfileController = require('../../app/controllers/ProfileController');
const UserController = require('../../app/controllers/UserController');

const ProfileValidator = require('../../app/validators/ProfileValidator');
const UserValidator = require('../../app/validators/UserValidator');

const { onlyUsers, onlyAdmin } = require('../../app/middlewares/authenticatedRoutes');

const profileController = new ProfileController();
const userController = new UserController();

const profileValidator = new ProfileValidator();
const userValidator = new UserValidator();

adminRoutes.get('/profile/:id', onlyUsers, profileController.profile);
adminRoutes.put('/profile/', profileValidator.put, profileController.put);

adminRoutes.get('/users/', onlyUsers, onlyAdmin, userController.index);
adminRoutes.get('/users/create/', onlyUsers, onlyAdmin, userController.create);
adminRoutes.get('/users/update/:id', onlyUsers, onlyAdmin, userController.update);
adminRoutes.post('/users/', userValidator.post, userController.post);
adminRoutes.put('/users/', userValidator.put, userController.put);
adminRoutes.delete('/users/', userController.delete);

module.exports = adminRoutes;