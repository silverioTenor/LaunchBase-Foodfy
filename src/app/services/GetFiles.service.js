const FilesManager = require('../models/FilesManager');

class GetFilesService {
  async execute(values) {
    try {
      const filesManagerDB = new FilesManager();
      const { fm_id, path } = await filesManagerDB.find(values);

      const image = path[0].replace('public', '')

      return {
        fm_id,
        image,
      };
    } catch (err) {
      console.log(err);

      throw new Error(err);
    }
  }
}

module.exports = GetFilesService;