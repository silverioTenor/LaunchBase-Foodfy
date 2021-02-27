const fs = require('fs');
const path = require('path');

class CopyAndSaveFilesFaker {
  async execute(files) {
    try {
      const finalFilesPromise = files.map(async file => {
        const newFile = `${Date.now().toString()}-${file}`;

        const initialPath = path.join('tmp', file);
        const finalPath = path.join('public/img/storage', newFile);

        const createStream = fs.createReadStream(initialPath);
        const copyStream = fs.createWriteStream(finalPath);

        createStream.pipe(copyStream);

        return finalPath;
      });

      const finalFiles = await Promise.all(finalFilesPromise);

      return finalFiles;
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = CopyAndSaveFilesFaker;