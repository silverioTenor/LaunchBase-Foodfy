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
    let toast = CheckFields.verify(request.body);

    if (toast) return response.render('private/users/create', { user: body, toast });

    const { name, email, is_admin } = request.body;

    const user = new User();

    const hasUser = await user.findOne({ where: { email } });

    toast = {
      status: 'error',
      message: 'Email já cadastrado!'
    }

    if (hasUser) return response.render('private/users/create', { user: body, toast });

    const statusAdministrative = (is_admin === 'on') ? true : false;

    request.bodyValidated = {
      name,
      email,
      isAdmin: statusAdministrative
    }

    next();
  }
}

module.exports = UserValidator;