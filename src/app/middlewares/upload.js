const path = require('path');
const multer = require('multer');

const storagePath = path.resolve(__dirname, '..', '..', '..', 'public', 'img', 'storage');

const upload = multer({
  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, storagePath);
    },
    filename: (request, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  }),

  fileFilter: (request, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
      .find(acceptedFormat => acceptedFormat === file.mimetype);

    return (isAccepted) ? cb(null, true) : cb(null, false);
  }
});

module.exports = {
  directory: storagePath,
  upload
};