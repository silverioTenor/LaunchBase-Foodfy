const RemoveUser = {
  buttonContainer: document.querySelector('.action-buttons'),
  invoke() {
    RemoveUser.buttonContainer.children[1].addEventListener('click', () => {
      console.log("Usuário removido com sucesso!");
    });
  }
}

RemoveUser.invoke();