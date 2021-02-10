const ContainerToggle = {
  buttons: document.querySelectorAll('.header-box span'),
  toggle() {
    ContainerToggle.buttons.forEach(button => {
      const nextElement = button.parentElement.nextElementSibling;

      button.addEventListener('click', () => {
        if (!nextElement.classList.contains('activated_content')) {
          nextElement.classList.remove('disabled_content');
          nextElement.classList.add('activated_content');
          button.innerHTML = "mostrar";

          setTimeout(() => {
            nextElement.style.display = 'none';
          }, 700);
        }
        else {
          nextElement.classList.remove('activated_content');
          nextElement.classList.add('disabled_content');
          button.innerHTML = "esconder";

          setTimeout(() => {
            nextElement.style.display = 'block';
          }, 30);
        }
      });
    });
  }
}

ContainerToggle.toggle();