const User = require('../models/User');

const CheckFields = {
  verify(body) {
    const keys = Object.keys(body);

    keys.forEach(key => {
      if (body[key] === '' && key !== 'removedPhotos' && body[key !== 'isAdmin']) {
        return {
          status: 'error',
          message: 'Preencha os campos corretamente'
        }
      }
    });
  }
}

const UserValidator = {
  async post(request, response, next) {
    try {
      let toast = CheckFields.verify(request.body);

      if (toast) return response.render('private/users/create', {
        user: request.body,
        toast
      });

      const { name, email, is_admin } = request.body;

      const user = new User();

      const hasUser = await user.findOne({ where: { email } });

      if (hasUser) return response.render('private/users/create', {
        user: body,
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
        user: body,
        toast: {
          status: 'error',
          message: 'Erro inexperado! Tente novamente mais tarde.'
        }
      });
    }
  },
  async put(request, response, next) {
    try {
      let toast = CheckFields.verify(request.body);

      if (toast) return response.render('private/users/update', {
        user: request.body,
        toast
      });

      const { id, name, email, password } = request.body;

      const userDB = new User();

      const user = await userDB.findByID(id);

      if (user.password !== password) return response.render('private/users/update', {
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