const { compare } = require('bcryptjs');

const User = require('../models/User');

const BaseValidator = require('./BaseValidator');

const baseValidator = new BaseValidator();

class UserValidator {

  async post(request, response, next) {
    try {
      let toast = baseValidator.verify(request.body);

      if (toast) return response.render('private/users/create', {
        user: request.body,
        toast
      });

      const { name, email, is_admin } = request.body;

      const user = new User();

      const hasUser = await user.findOne({ where: { email } });

      if (hasUser) return response.render('private/users/create', {
        user: request.body,
        toast: {
          status: 'error',
          message: 'Email já cadastrado!'
        }
      });

      const statusAdministrative = (is_admin === 'on') ? true : false;

      request.bodyValidated = {
        name,
        email,
        is_admin: statusAdministrative
      }

      next();
    } catch (err) {
      console.log(err);

      return response.render('private/users/create', {
        user: request.body,
        toast: {
          status: 'error',
          message: 'Erro inexperado! Tente novamente mais tarde.'
        }
      });
    }
  }

  async put(request, response, next) {
    try {
      let toast = baseValidator.verify(request.body);

      if (toast) return response.render('private/users/update', {
        user: request.body,
        toast
      });

      const { id, name, email, password } = request.body;

      const userDB = new User();

      const user = await userDB.findByID(id);

      const passwordChecked = await compare(password, user.password);

      if (!passwordChecked) return response.render('private/users/update', {
        user: request.body,
        toast: {
          status: 'error',
          message: 'Senha incorreta!'
        }
      });

      request.bodyValidated = { id, name, email };

      next();
    } catch (err) {
      console.log(err);

      return response.render('private/users/update', {
        user: request.body,
        toast: {
          status: 'error',
          message: 'Erro inesperado! Tente novamente.'
        }
      });
    }
  }
}

module.exports = UserValidator;