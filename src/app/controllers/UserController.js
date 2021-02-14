const crypto = require('crypto');
const mailer = require('../../lib/mailer');

const User = require('../models/User');

const UserController = {
  index(request, response) {
    return response.render('private/users/index');
  },
  create(request, response) {
    return response.render('private/users/create');
  },
  async post(request, response) {
    try {
      const { name, email, is_admin } = request.bodyValidated;

      const password = crypto.randomBytes(6).toString('base64');

      const userDB = new User();
      const userID = await userDB.save({ name, email, password, is_admin });

      await mailer.sendMail({
        to: email,
        from: "no-reply@foodfy.com.br",
        subject: "Seja bem vindo!",
        html: `
          <h2>Cadastro feito com sucesso!</h2>
          <p>Esta é a sua senha de acesso: ${password} </p>
          <p>
            <a href="http://localhost:3000/session/login" target="_blank">Acessar plataforma</a>
          </p>
          <br>
          <h4><b>Atenção!</b></h4>
          <p>OBS: Troque-a assim que logar</p>
        `
      });

      return response.render('private/users/index', {
        toast: {
          status: 'success',
          message: 'Usuário cadastrado com sucesso!'
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('private/users/index', {
        toast: {
          status: 'error',
          message: 'Falha ao cadastrar usuário!'
        }
      });
    }
  },
  update(request, response) {
    return response.render('private/users/update');
  },
};

module.exports = UserController;