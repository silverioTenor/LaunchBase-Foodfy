const Chef = require('../models/Chef');

const GetFilesService = require('../services/GetFiles.service');

module.exports = {
  async getAllChefs(base_url, params) {
    try {
      const chefDB = new Chef();
      let chefs = [];

      if (params?.filter) {
        chefs = await chefDB.search(params);
      } else {
        chefs = await chefDB.find();
      }

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
      const chef = await chefDB.findChefWithRecipes(id);

      chef.total_recipes = Number(chef.total_recipes);

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