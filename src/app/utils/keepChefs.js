const Chef = require('../models/Chef');

const GetFilesService = require('../services/GetFiles.service');

module.exports = {
  async getManyChefs(base_url) {
    try {
      const chefDB = new Chef();
      const chefs = await chefDB.find();

      const chefsWithImagesPromise = chefs.map(async chef => {
        const values = {
          id: chef.id,
          column: 'chef_id'
        };

        const getFiles = new GetFilesService();
        const { images } = await getFiles.execute(values, base_url);

        const newChef = {
          ...chef,
          image: images[0].path
        };

        return newChef;
      });

      const chefsWithImages = await Promise.all(chefsWithImagesPromise);

      return chefsWithImages;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getOneChef(base_url, id) {
    try {
      const chefDB = new Chef();
      const chef = await chefDB.findByID(id);

      const values = {
        id: chef.id,
        column: 'chef_id'
      };

      const getFiles = new GetFilesService();
      const { fm_id, images } = await getFiles.execute(values, base_url);

      const newChef = {
        ...chef,
        image: images[0],
        fm_id,
      };

      return newChef;
    } catch (err) {
      throw new Error(err);
    }
  },
}