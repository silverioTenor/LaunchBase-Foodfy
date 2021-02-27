const CreateUsersFaker = require('./CreateUsers.faker');
const CreateChefsFaker = require('./CreateChefs.faker');
const CreateRecipesFaker = require('./CreateRecipes.faker');

class Seed {
  static async execute() {
    try {
      const createUser = new CreateUsersFaker();
      const createChefs = new CreateChefsFaker();
      const createRecipes = new CreateRecipesFaker();

      const usersIDs = await createUser.execute();
      const chefsIDs = await createChefs.execute();

      for (const i in usersIDs) {
        await createRecipes.execute({
          user_id: usersIDs[i],
          chef_id: chefsIDs[i],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

Seed.execute();