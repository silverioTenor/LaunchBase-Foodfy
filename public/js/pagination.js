const Pagination = {
  init() {
    const pagination = document.querySelector('.pagination');
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const filter = pagination.dataset.filter;

    const pages = Pagination.paginate(page, total);

    const buttonsContainer = Pagination.createPaginationButtons(pages, filter);
    pagination.appendChild(buttonsContainer);
  },
  paginate(selectedPage, totalPages) {
    let pages = [],
      oldPage;

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

      const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
      const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
      const pagesAfterSelectedPage = currentPage <= selectedPage + 2;

      if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

        if (oldPage && currentPage - oldPage > 2) pages.push('...');

        if (oldPage && currentPage - oldPage == 2) pages.push(currentPage - 1);

        pages.push(currentPage);
        oldPage = currentPage;
      }
    }

    return pages;
  },
  createPaginationButtons(pages, filter) {
    let elements = document.createElement('div');

    pages.forEach(page => {
      if (String(page).includes('...')) {
        const spanElement = document.createElement('span');
        spanElement.innerHTML = page;

        elements.appendChild(spanElement);
      } else {
        const element = document.createElement('a');

        if (filter) {
          element.setAttribute('href', `?page=${page}&filter=${filter}`);
        } else {
          element.setAttribute('href', `?page=${page}`);
        }

        element.innerHTML = page;

        elements.appendChild(element);
      }
    });

    return elements;
  }
}

if (document.querySelector('.pagination')) {
  Pagination.init();
}