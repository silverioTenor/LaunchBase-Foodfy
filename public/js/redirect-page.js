const Redirect = {
  cards: document.querySelectorAll('.recipes .recipe'),
  to() {
    Redirect.cards.forEach(card => {
      card.addEventListener('click', () => {
        location.href = '/recipes/show';
      });
    });
  }
}

Redirect.to();