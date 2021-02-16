const BaseValidator = {
  verify(body) {
    const keys = Object.keys(body);

    keys.forEach(key => {
      if (body[key] === '' && key !== 'removedPhotos' && body[key !== 'is_admin']) {
        return {
          status: 'error',
          message: 'Preencha os campos corretamente.'
        }
      }
    });
  }
}

module.exports = BaseValidator;