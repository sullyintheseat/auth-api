const Ingredient = require('../schemas/recipes/Ingredient.schema');

const IndexController = {
  test: async (req, res) => {
    try {
      res.status(200).send('bam');
    } catch (err) {
      res.status(500).send('Unknown Server Response');
    }
  },

  addIngredient: async (req, res) => {
    let ingredient = req.body;
    console.log(ingredient);
    try {
      let result = await Ingredient.createIngredient(ingredient);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Response');
    }
  }
}

module.exports.Controller = IndexController;
module.exports.controller = (app) => {
  app.get('/v1/test', IndexController.test);
  
  app.post('/v1/ingredients', IndexController.addIngredient);
}
