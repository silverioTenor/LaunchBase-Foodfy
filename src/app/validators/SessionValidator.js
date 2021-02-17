const { compare } = require('bcryptjs');

const BaseValidator = require('./BaseValidator');
const User = require('../models/User');

const SessionValidator = {
  async login(request, response, next) {
    try {
      const toast = BaseValidator.verify(request.body);

      if (toast) return response.render('private/chefs/create', { toast });

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

      request.user = user;

      next();
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível. Tente novamente mais tarde.'
        }
      });
    }
  },
}

module.exports = SessionValidator;