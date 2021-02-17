const CreateTokenToResetPasswordService = require('../services/CreateTokenToResetPassword.service');

const SessionController = {
  loginForm(request, response) {
    return response.render('session/login');
  },
  async login(request, response) {
    try {
      const { user } = request;

      if (request.resetPassword) {
        const createTokenToResetPassword = new CreateTokenToResetPasswordService();
        await createTokenToResetPassword.execute(user.id, user.email);

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
  },
  logout(request, response) {
    return
  },
  forgotForm(request, response) {
    return response.render('session/forgot');
  },
  forgot(request, response) {
    return
  },
  resetForm(request, response) {
    return response.render('session/reset');
  },
  reset(request, response) {
    return
  },
}

module.exports = SessionController;