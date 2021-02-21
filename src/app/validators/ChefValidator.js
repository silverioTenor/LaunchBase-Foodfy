const BaseValidator = require('./BaseValidator');

const baseValidator = new BaseValidator();

class ChefValidator {

  post(request, response, next) {
    try {
      const toast = baseValidator.verify(request.body);

      if (toast) return response.render('private/chefs/create', { toast });

      if (request.files.length <= 0) return response.render('private/chefs/create', {
        chef: request.body,
        toast: {
          status: 'error',
          message: 'A foto do chef é obrigatória!'
        }
      });

      request.avatar = {
        path: [request.files[0].path]
      };

      next();
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/create', {
        chef: request.body,
        toast: {
          status: 'error',
          message: 'Erro inesperado! Tente novamente.'
        }
      });
    }
  }

  put(request, response, next) {
    try {
      const toast = baseValidator.verify(request.body);

      if (toast) return response.render('private/chefs/update', { toast });

      if (request.files.length <= 0 && request.body.removedPhotos !== '') {
        return response.render('private/chefs/update', {
          chef: request.body,
          toast: {
            status: 'error',
            message: 'A foto do chef é obrigatória!',
          }
        });
      }

      const { id, name, removedPhotos } = request.body;

      request.chef = {
        id,
        name,
        removedPhotos,
        avatar: (request.files[0]?.path) ? [request.files[0].path] : [],
      };

      next();
    } catch (err) {
      console.log(err);

      return response.render('private/chefs/update', {
        chef: request.body,
        toast: {
          status: 'error',
          message: 'Erro inesperado! Tente novamente.'
        }
      });
    }
  }
}

module.exports = ChefValidator;