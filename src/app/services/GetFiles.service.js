const FilesManager = require('../models/FilesManager');

class GetFilesService {
  async execute(values, base_url) {
    try {
      const filesManagerDB = new FilesManager();
      const { fm_id, path } = await filesManagerDB.find(values);

      const paths = path.map((image, index) => {
        const pathImage = image.replace('public', '');

        return {
          id: index,
          path: `${base_url}${pathImage}`
        };
      });

      return {
        fm_id,
        images: paths,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = GetFilesService;