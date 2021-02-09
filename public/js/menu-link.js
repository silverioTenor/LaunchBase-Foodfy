const Link = {
  currentPage: location.pathname,
  links: document.querySelectorAll('.nav-menu a'),
  enable() {
    Link.links.forEach(link => {
      if (Link.currentPage.includes(link.getAttribute('href'))) {
        link.classList.add('activated_link');
      }
    });
  }
}

Link.enable();