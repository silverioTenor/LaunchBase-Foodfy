const Validator = {
  fields: document.querySelectorAll('.input-container input'),
  button: document.querySelector('.login-buttons button[type=submit]'),
  errors: [],
  verify() {
    Validator.button.addEventListener('click', (e) => {
      Validator.clearErrors();

      Validator.fields.forEach(field => {
        const fieldType = field.getAttribute('type');
        const fieldSize = field.value.length;

        const { error, message } = Validator.checkField(fieldType, fieldSize, field.value);

        if (error) {
          e.preventDefault();

          const errorElement = Validator.createDivError(message);
          field.parentNode.appendChild(errorElement);

          field.classList.add('input-error');
        }
      });
    });
  },
  checkField(type, size, value) {
    let error = false;
    let message = '';

    if (type && size === 0) {
      error = true;
      message = 'campo obrigatório'
    }
    else if (type === 'email') {
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!value.match(mailFormat)) {
        error = true;
        message = 'email inválido'
      }
    }
    else if (type === 'password' && size < 6) {
      error = true;
      message = 'mínimo 6 caracteres'
    }

    return {
      error,
      message
    };
  },
  createDivError(message) {
    const errorElement = document.createElement('small');

    errorElement.innerHTML = message;

    return errorElement;
  },
  clearErrors() {
    Validator.errors = [];

    Validator.fields.forEach(field => {
      const errorElement = document.querySelector('small');

      if (errorElement) errorElement.remove();

      field.classList.remove('input-error');
    });
  }
}

if (Validator.button) Validator.verify();