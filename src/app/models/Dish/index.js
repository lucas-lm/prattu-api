const { Model } = require('sequelize')
const schema = require('./schema')

class Dish extends Model {
  static init(sequelize) {
    super.init(schema, { sequelize })
    return this
  }
}

Dish.associate = function (models) {
  this.belongsTo(models.Kitchen, { foreignKey: 'kitchen_id', as: 'kitchen' })
  this.hasMany(models.DishPack, { foreignKey: 'dish_id', as: 'packs' })
  this.hasMany(models.DishReview, { foreignKey: 'dish_id', as: 'reviews' })
}

module.exports = Dish
