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

      return response.redirect(`/admin/profile/${user.userID}`);
    } catch (err) {
      console.log(err);

      return response.render('session/login', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível. Tente novamente mais tarde.'
        }
      });
    }






    request.session.user = request.user;
    return res.redirect(`/admin/profile/${request.user.userID}`);
  }

  logout(request, response) {
    request.session.destroy();
    return response.redirect('/session/login');
  }

  forgotForm(request, response) {
    return response.render('session/forgot');
  }

  forgot(request, response) {
    return
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