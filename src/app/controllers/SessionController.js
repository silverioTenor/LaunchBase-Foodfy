const { hash } = require('bcryptjs');
const User = require('../models/User');

const CreateTokenToResetPasswordService = require('../services/CreateTokenToResetPassword.service');

class SessionController {

  loginForm(request, response) {
    return response.render('session/login');
  }

  async login(request, response) {
    try {
      const user = request.user;

      if (request.resetPassword) {
        const createTokenToResetPassword = new CreateTokenToResetPasswordService();
        await createTokenToResetPassword.execute(user.userID, user.email);

        return response.render('session/login', {
          toast: {
            status: 'info',
            message: 'Verifique sua caixa de email para continuar.'
          }
        });
      }

      request.session.user = user;

      return response.render(`private/users/profile`, {
        user: {
          ...user,
          firstName: user.name.split(' ')[0]
        },
        toast: {
          status: 'success',
          message: `Bem vindo(a) ${user.name.split(' ')[0]}!`,
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível. Tente novamente mais tarde.'
        }
      });
    }
  }

  logout(request, response) {
    const user = request.session.user;

    request.session.destroy();

    return response.render('session/login', {
      toast: {
        status: 'success',
        message: `Até mais, ${user.name.split(' ')[0]}!`,
      }
    });
  }

  forgotForm(request, response) {
    return response.render('session/forgot');
  }

  async forgot(request, response) {
    try {
      const user = request.user;

      const createTokenToResetPassword = new CreateTokenToResetPasswordService();
      await createTokenToResetPassword.execute(user.id, user.email);

      return response.render('session/login', {
        toast: {
          status: 'info',
          message: 'Verifique sua caixa de email para continuar.'
        }
      });
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

  resetForm(request, response) {
    const { token } = request.query;
    return response.render('session/reset', { token });
  }

  async reset(request, response) {
    try {
      const { user } = request;

      const password = await hash(user.password, 8);

      const values = { id: user.id, column: 'id' };

      const userDB = new User();
      await userDB.update(values, {
        password,
        reset_token: '',
        reset_token_expires: '',
      });

      return response.render('session/login', {
        toast: {
          status: 'success',
          message: 'Senha alterada com sucesso! Faça seu login.'
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento!'
        }
      });
    }
  }
}

module.exports = SessionController;