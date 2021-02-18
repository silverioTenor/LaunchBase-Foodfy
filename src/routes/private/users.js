const { Router } = require('express');

const adminRoutes = Router();

const ProfileController = require('../../app/controllers/ProfileController');
const UserController = require('../../app/controllers/UserController');
const UserValidator = require('../../app/validators/UserValidator');

const profileController = new ProfileController();
const userController = new UserController();
const userValidator = new UserValidator();

adminRoutes.get('/profile/:id', profileController.profile);
// adminRoutes.put('/profile/:id', profileController.put);

adminRoutes.get('/users/', userController.index);
adminRoutes.get('/users/create/', userController.create);
adminRoutes.get('/users/update/:id', userController.update);
adminRoutes.post('/users/', userValidator.post, userController.post);
adminRoutes.put('/users/', userValidator.put, userController.put);
adminRoutes.delete('/users/', userController.delete);

module.exports = adminRoutes;