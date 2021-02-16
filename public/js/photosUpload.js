const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photo-preview'),
  files: [],
  handleFileInput(event, uploadLimit) {
    const { files: fileList } = event.target;

    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event, uploadLimit)) return

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const divContainer = PhotosUpload.divConstructor(image);
        // PhotosUpload.preview.innerHTML = "";
        PhotosUpload.preview.appendChild(divContainer);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  hasLimit(event, uploadLimit) {
    const { input, preview } = PhotosUpload;
    const { files: fileList } = input;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);

      event.preventDefault();
      return true;
    }

    const photosDiv = [];

    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == "photo") {
        photosDiv.push(item);
      }
    });

    const totalPhotos = fileList.length + photosDiv.length;

    if (totalPhotos > uploadLimit) {
      alert("Limite máximo atingido!");
      event.preventDefault();

      return true;
    }

    return false;
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

    return dataTransfer.files;
  },
  divConstructor(image) {
    const divContainer = document.createElement('div');

    divContainer.classList.add('photo');
    divContainer.onclick = PhotosUpload.removePhoto;
    divContainer.appendChild(image);
    divContainer.appendChild(PhotosUpload.createRemoveButton());

    return divContainer;
  },
  createRemoveButton() {
    const button = document.createElement('i');

    button.classList.add('material-icons');
    button.innerHTML = "close";

    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoDiv.remove();
  },
  countRemovedPhotos(event) {
    const photoContainer = event.target.parentNode;
    const removedPhoto = document.querySelector('input[name="removedPhotos"]');

    if (removedPhoto) removedPhoto.value += `${photoContainer.id},`;
  }
}