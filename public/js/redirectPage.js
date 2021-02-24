const Redirect = {
  cards: document.querySelectorAll('.recipes .recipe'),
  to() {
    Redirect.cards.forEach(card => {
      const id = card.getAttribute('id');

      card.addEventListener('click', () => {
        location.href = `/recipes/show/${id}`;
      });
    });
  }
}

Redirect.to();