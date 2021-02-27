const faker = require('faker');

const Chef = require('../app/models/Chef');

const CreateFilesService = require('../app/services/CreateFiles.service');
const CopyAndSaveFilesFaker = require('./CopyAndSaveFiles.faker');

class CreateChefsFaker {
  chefs = [];

  async execute() {
    try {
      while (this.chefs.length < 5) {
        this.chefs.push({
          name: faker.name.firstName(),
        });
      }

      const chefDB = new Chef();
      const copyAndSaveFiles = new CopyAndSaveFilesFaker();
      const createFiles = new CreateFilesService();

      const chefsIDsPromise = this.chefs.map(async chef => {
        const chef_id = await chefDB.save(chef);

        const path = await copyAndSaveFiles.execute(['chef_default.jpg']);

        await createFiles.execute({ chef_id }, path);

        return chef_id;
      });

      const chefsIDs = await Promise.all(chefsIDsPromise);

      return chefsIDs;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = CreateChefsFaker;