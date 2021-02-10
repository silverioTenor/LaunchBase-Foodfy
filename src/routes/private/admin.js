const { Router } = require('express');

const ProfileController = require('../../app/controllers/ProfileController');

const adminRouter = Router();

adminRouter.get('/profile', ProfileController.profile);

module.exports = adminRouter;