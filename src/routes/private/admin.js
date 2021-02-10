const { Router } = require('express');

const ProfileController = require('../../app/controllers/ProfileController');
const UserController = require('../../app/controllers/UserController');

const adminRoutes = Router();

adminRoutes.get('/profile', ProfileController.profile);

adminRoutes.get('/users/create', UserController.create);
adminRoutes.get('/users/update', UserController.update);

module.exports = adminRoutes;