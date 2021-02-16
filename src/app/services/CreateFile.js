const FilesManager = require('../models/FilesManager');
const File = require('../models/File');

class CreateFileService {
  async execute(fields, path) {
    try {
      const filesManagerDB = new FilesManager();
      const fmID = await filesManagerDB.save(fields);

      const filesDB = new File();
      await filesDB.save([path, fmID]);
    } catch (err) {
      console.log(err);

      throw new Error(err);
    }
  }
}

module.exports = CreateFileService;