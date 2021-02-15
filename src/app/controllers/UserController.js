const crypto = require('crypto');
const mailer = require('../../lib/mailer');

const User = require('../models/User');

const UserController = {
  async index(request, response) {
    try {
      const userDB = new User();
      const users = await userDB.find();

      return response.render('private/users/index', { users });
    } catch (err) {
      console.log(err);

      return response.render('private/users/index', {
        toast: {
          status: 'error',
          message: 'Sistema indisponível no momento.'
        }
      });
    }
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
  async update(request, response) {
    try {
      const { id } = request.params;

      const userDB = new User();
      const user = await userDB.findByID(id);

      return response.render('private/users/update', { user });
    } catch (err) {
      console.log(err);

      return response.render('private/users/update', {
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });
    }
  },
  async put(request, response) {
    const { id, name, email } = request.bodyValidated;

    try {
      const val = { id, column: 'id' };

      const userDB = new User();
      await userDB.update(val, { name, email });

      return response.render('private/users/update', {
        user: { name, email },
        toast: {
          status: 'success',
          message: 'Dados atualizados com sucesso!'
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('private/users/update', {
        user: { name, email },
        toast: {
          status: 'error',
          message: 'Sistema indisponível. Tente novamente mais tarde.'
        }
      });
    }
  },
  async delete(request, response) {
    try {
      const { id } = request.body;

      const userDB = new User();
      await userDB.delete(id);

      return response.render('private/users/index', {
        toast: {
          status: 'success',
          message: 'Usuário removido com sucesso!'
        }
      });
    } catch (err) {
      console.log(err);

      return response.render('private/users/index', {
        toast: {
          status: 'error',
          message: 'Usuário não encontrado!'
        }
      });
    }
  }
};

module.exports = UserController;