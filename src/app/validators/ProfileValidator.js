const { compare } = require('bcryptjs');

const User = require('../models/User');

const BaseValidator = require('./BaseValidator');

const baseValidator = new BaseValidator();

class ProfileValidator {

  async put(request, response, next) {
    try {
      let toast = baseValidator.verify(request.body);

      if (toast) return response.render('private/users/profile', {
        user: request.body,
        toast
      });

      const { id, name, email, password } = request.body;

      const userDB = new User();

      const user = await userDB.findByID(id);

      const passwordChecked = await compare(password, user.password);

      if (!passwordChecked && password !== user.password) {
        return response.render('private/users/profile', {
          user: request.body,
          toast: {
            status: 'error',
            message: 'Senha incorreta!'
          }
        });
      }

      request.user = user;
      request.bodyValidated = { id, name, email };

      next();
    } catch (err) {
      console.log(err);

      return response.render('private/users/profile', {
        user: request.body,
        toast: {
          status: 'error',
          message: 'Erro inesperado! Tente novamente.'
        }
      });
    }
  }
}

module.exports = ProfileValidator;