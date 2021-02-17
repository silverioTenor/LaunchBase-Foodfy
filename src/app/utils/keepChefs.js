const Chef = require('../models/Chef');

const GetFilesService = require('../services/GetFiles.service');

module.exports = {
  async getChefList(base_url) {
    try {
      const chefDB = new Chef();
      const chefs = await chefDB.find();

      const chefsWithImagesPromise = chefs.map(async chef => {
        const values = {
          id: chef.id,
          column: 'chef_id'
        };

        const getFiles = new GetFilesService();
        const { image } = await getFiles.execute(values);

        const newChef = {
          ...chef,
          image: `${base_url}${image}`
        };

        return newChef;
      });

      const chefsWithImages = await Promise.all(chefsWithImagesPromise);

      return chefsWithImages;
    } catch (err) {
      console.log(err);

      throw new Error(err);
    }
  },
  async getChefShow(base_url, id) {
    try {
      const chefDB = new Chef();
      const chef = await chefDB.findByID(id);

      const values = {
        id: chef.id,
        column: 'chef_id'
      };

      const getFiles = new GetFilesService();
      const { image } = await getFiles.execute(values);

      const newChef = {
        ...chef,
        image: `${base_url}${image}`
      };

      return newChef;
    } catch (err) {
      console.log(err);

      throw new Error(err);
    }
  },
}