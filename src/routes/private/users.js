const { Router } = require('express');

const ProfileController = require('../../app/controllers/ProfileController');
const UserController = require('../../app/controllers/UserController');

const UserValidator = require('../../app/validators/UserValidator');

const adminRoutes = Router();

adminRoutes.get('/profile/:id', ProfileController.profile);

adminRoutes.get('/users/', UserController.index);
adminRoutes.get('/users/create/', UserController.create);
adminRoutes.get('/users/update/:id', UserController.update);
adminRoutes.post('/users/create', UserValidator.post, UserController.post);

module.exports = adminRoutes;