const { compare } = require('bcryptjs');

const BaseValidator = require('./BaseValidator');
const User = require('../models/User');

const baseValidator = new BaseValidator();

class SessionValidator {

  async login(request, response, next) {
    try {
      const toast = baseValidator.verify(request.body);

      if (toast) return response.render('session/login', { toast });

      const { email, password } = request.body;

      const userDB = new User();
      const user = await userDB.findOne({ where: { email } });

      if (!user) return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });

      const passwordChecked = await compare(password, user.password);

      if (!passwordChecked && password !== user.password) {
        return response.render('session/login', {
          toast: {
            status: 'error',
            message: 'email/senha inválido!'
          }
        });
      }

      if (password === user.password) request.resetPassword = true;

      request.user = {
        userID: user.id,
        isAdmin: user.is_admin,
        name: user.name,
        email: user.email,
      };

      next();
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível. Tente novamente!'
        }
      });
    }
  }

  async reset(request, response, next) {
    try {
      const toast = baseValidator.verify(request.body);

      if (toast) return response.render('session/reset', { toast });

      const { token, email, password, passwordRepeat } = request.body;

      const userDB = new User();
      const user = await userDB.findOne({ where: { email } });

      if (!user) return response.render('session/reset', {
        token,
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });

      if (password !== passwordRepeat) {
        return response.render('session/reset', {
          token,
          toast: {
            status: 'error',
            message: 'As senhas não coincidem!'
          }
        });
      }

      if (token !== user.reset_token || Date.now() > user.reset_token_expires) {
        return response.render('session/reset', {
          toast: {
            status: 'error',
            message: 'Token inválido! Refaça o processo.'
          }
        });
      }

      request.user = {
        id: user.id,
        password
      };

      next();
    } catch (err) {
      console.log(err);

      return response.render('session/reset', {
        token: request.body.token,
        toast: {
          status: 'error',
          message: 'Sistema indisponível. Tente novamente!'
        }
      });
    }
  }

  async forgot(request, response, next) {
    try {
      const toast = baseValidator.verify(request.body);

      if (toast) return response.render('session/forgot', { toast });

      const { email } = request.body;

      const userDB = new User();
      const user = await userDB.findOne({ where: { email } });

      if (!user) return response.render('session/forgot', {
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });

      request.user = user;

      next();
    } catch (err) {
      console.log(err);

      return response.render('session/forgot', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível. Tente novamente!'
        }
      });
    }
  }
}

module.exports = SessionValidator;