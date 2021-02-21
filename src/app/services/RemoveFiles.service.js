const path = require('path');
const fs = require('fs/promises');

class RemoveFilesService {
  async execute({ removedPhotos, oldImages }) {
    try {
      removedPhotos = removedPhotos.split(',');
      const lastIndex = removedPhotos.length - 1;

      removedPhotos.splice(lastIndex, 1);

      const restImagesPromise = removedPhotos.map(async photoIndex => {
        photoIndex = Number(photoIndex);

        const fullPath = path.join('public', oldImages[photoIndex].path);

        if (photoIndex === oldImages[photoIndex].id) {
          await fs.unlink(fullPath);
          oldImages.splice(photoIndex, 1);
        }

        if (removedPhotos.length - 1 === photoIndex) {
          const restImages = oldImages.map(image => {
            image.path = `public${image.path}`;

            return image.path;
          });

          return restImages;
        }
      });

      const restImages = await Promise.all(restImagesPromise);

      return restImages[0];
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = RemoveFilesService;