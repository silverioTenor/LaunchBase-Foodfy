const FilesManager = require('../models/FilesManager');
const File = require('../models/File');

class CreateFilesService {
  async execute(fields, path) {
    try {
      const filesManagerDB = new FilesManager();
      const fmID = await filesManagerDB.save(fields);

      const filesDB = new File();
      await filesDB.save([path, fmID]);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = CreateFilesService;