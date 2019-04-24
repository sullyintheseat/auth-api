const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = Schema({
  name: {
    type: String,
    default: null,
    unique: true
  },
  ingredientType: {
    type: String,
    default: null
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'ingredients' 
});
 
class Ingredient {
  static async createIngredient (data) {
    try {
      let result = await this.create(data);
      return result;
    } catch (error) {
      return error;
    }
  }
}

IngredientSchema.loadClass(Ingredient);
module.exports = mongoose.model('Ingredient', IngredientSchema);