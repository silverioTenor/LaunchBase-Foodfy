const path = require('path');
const fs = require('fs');

class RemoveFilesService {
  async execute({ removedPhotos, oldImages }) {
    try {
      removedPhotos = removedPhotos.split(',');
      const lastIndex = removedPhotos.length - 1;
      removedPhotos.splice(lastIndex, 1);

      removedPhotos = removedPhotos.map(photo => Number(photo));

      removedPhotos.forEach(position => {
        const fullPath = path.join('public', oldImages[position].path);

        delete oldImages[position];
        fs.unlinkSync(fullPath);
      });

      const restImages = oldImages.map(image => path.join('public', image.path));

      return restImages;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = RemoveFilesService;