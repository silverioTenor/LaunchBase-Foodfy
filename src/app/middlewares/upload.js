const path = require('path');
const multer = require('multer');

const storagePath = path.resolve(__dirname, '..', '..', '..', 'public', 'img', 'storage');

module.exports = {
  directory: storagePath,
  storage: multer.diskStorage({
    distination(request, file, cb) {
      cb(null, storagePath);
    },
    filename(request, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  }),

  fileFilter: (request, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
      .find(acceptedFormat => acceptedFormat === file.mimetype);

    return (isAccepted) ? cb(null, true) : cb(null, false);
  }
};