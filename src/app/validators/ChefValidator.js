const BaseValidator = require('./BaseValidator');

const ChefValidator = {
  post(request, response) {
    const toast = BaseValidator.verify(request.body);

    if (toast) return response.render('private/chefs/create', { toast });

    if (request.files.length <= 0) return response.render('private/chefs/create', {
      chef: request.body,
      toast: {
        status: 'error',
        message: 'A foto do chef é obrigatória!'
      }
    });

    next();
  },
}

module.exports = ChefValidator;