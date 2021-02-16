const ToastMessage = {
  messageContainer: document.querySelector('.message-container'),
  dismiss() {
    const message = ToastMessage.messageContainer.classList;
    if (message.contains('dismiss')) {
      message.remove('dismiss');
    }
    setTimeout(() => {
      message.add('dismiss');
    }, 4000);
  }
}

if (document.querySelector('.message-container')) {
  ToastMessage.dismiss();
}