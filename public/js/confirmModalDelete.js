const ModalDelete = {
  buttonCanceled: document.querySelector('.remove-canceled'),
  modalContainer: document.querySelector('.remove-modal-container'),
  modal: document.querySelector('.remove-modal-container .remove-modal'),
  active() {
    ModalDelete.modalContainer.classList.remove('dismiss');
    ModalDelete.modal.classList.remove('dismiss');

    ModalDelete.modalContainer.classList.add('active');
    ModalDelete.modal.classList.add('active');
  },
  dismiss() {
    ModalDelete.buttonCanceled.addEventListener('click', () => {
      ModalDelete.modalContainer.classList.remove('active');
      ModalDelete.modal.classList.remove('active');

      ModalDelete.modalContainer.classList.add('dismiss');
      ModalDelete.modal.classList.add('dismiss');
    });
  }
}