const BaseValidator = require('./BaseValidator');

const baseValidator = new BaseValidator();

class RecipeValidator {

  post(request, response, next) {
    try {
      const toast = baseValidator.verify(request.body);

      if (toast) return response.render('private/recipes/create', { toast });

      if (request.files.length <= 0) return response.render('private/recipes/create', {
        chef: request.body,
        toast: {
          status: 'error',
          message: 'É obrigatório pelo menos 1 imagem!'
        }
      });

      next();
    } catch (err) {
      console.log(err);

      return response.render('private/recipes/create', {
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

      if (toast) return response.render('private/recipes/update', {
        chef: request.body,
        toast
      });

      let { removedPhotos } = request.body;

      if (request.files.length <= 0 && removedPhotos !== '') {

        removedPhotos = removedPhotos.split(',');
        const lastIndex = removedPhotos.length - 1;

        removedPhotos.splice(lastIndex, 1);

        if (removedPhotos.length === 5) return response.render('private/recipes/update', {
          chef: request.body,
          toast: {
            status: 'error',
            message: 'Envie pelo menos uma imagem!',
          }
        });
      }

      const newImages = request.files.map(file => file.path);
      request.images = { newImages };

      next();
    } catch (err) {
      console.log(err);

      return response.render('private/recipes/update', {
        chef: request.body,
        toast: {
          status: 'error',
          message: 'Erro inesperado! Tente novamente.'
        }
      });
    }
  }
}

module.exports = RecipeValidator;