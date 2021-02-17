const Chef = require('../models/Chef');

const GetFilesService = require('../services/GetFiles.service');

const BaseController = {
  async chefList(base_url) {
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
  }
}

module.exports = BaseController;