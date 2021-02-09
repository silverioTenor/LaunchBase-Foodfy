const ImagesPreview = {
  previews: document.querySelectorAll('.small-banner-view img'),
  visible(event) {
    ImagesPreview.hidden();

    event.classList.add('photoActivated');
    Lightbox.banner.src = event.src;
  },
  hidden() {
    ImagesPreview.previews.forEach(preview => {
      preview.classList.remove('photoActivated');
    });
  }
}

const Lightbox = {
  lightbox: document.querySelector('.lightbox-container'),
  banner: document.querySelector('.banner-recipe-show > img'),
  openModal() {
    Lightbox.lightbox.classList.add('activated_modal');

    const modal = Lightbox.createLightboxModal();
    Lightbox.lightbox.appendChild(modal);
  },
  createLightboxModal() {
    const modal = document.createElement('div');
    modal.classList.add('lightbox-modal');

    const prev = Lightbox.createChangeImageButton('prevButton', 'left');
    modal.appendChild(prev);

    const next = Lightbox.createChangeImageButton('nextButton', 'right');
    modal.appendChild(next);

    const slideShow = Lightbox.createSlideshow();
    modal.appendChild(slideShow);

    const button = Lightbox.createCloseButton();
    modal.appendChild(button);

    return modal;
  },
  createChangeImageButton(position, sideButton) {
    const side = document.createElement('i');
    side.classList.add(`keyboard_arrow_${sideButton}`);
    side.classList.add('material-icons');
    side.innerHTML = `keyboard_arrow_${sideButton}`;
    side.onclick = Lightbox.createSwitchButtons[position];

    return side;
  },
  createSwitchButtons: {
    prevButton() {
      const slideShowBanner = document.querySelector('.slideShow img');

      const images = Array.from(ImagesPreview.previews);

      let indexImage = null;

      images.forEach((image, index) => {
        if (slideShowBanner.outerHTML.includes(image.src)) {
          indexImage = index;
        };
      });

      if (indexImage === 0) {
        indexImage = images.length;
      }

      slideShowBanner.src = images[indexImage - 1].src;
    },
    nextButton() {
      const slideShowBanner = document.querySelector('.slideShow img');

      const images = Array.from(ImagesPreview.previews);

      let indexImage = null;

      images.forEach((image, index) => {
        if (slideShowBanner.outerHTML.includes(image.src)) {
          indexImage = index;
        };
      });

      if (indexImage === images.length - 1) {
        indexImage = -1;
      }

      slideShowBanner.src = images[indexImage + 1].src;
    },
  },
  createSlideshow() {
    const images = document.querySelectorAll('.small-banner-view img');

    Lightbox.previews = images;

    const slideShow = document.createElement('div');
    slideShow.classList.add('slideShow');

    const image = new Image();
    image.src = Lightbox.banner.src;
    image.alt = Lightbox.banner.alt;
    slideShow.appendChild(image);

    return slideShow;
  },
  createCloseButton() {
    const button = document.createElement('i');

    button.classList.add('closeModal');
    button.classList.add('material-icons');
    button.onclick = Lightbox.closeModal;
    button.innerHTML = "close";

    return button;
  },
  closeModal() {
    Lightbox.lightbox.classList.remove('activated_modal');
    Lightbox.lightbox.innerHTML = "";
  },
}