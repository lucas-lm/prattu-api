const { Model } = require('sequelize')
const schema = require('./schema')

class DishPack extends Model {
  static init(sequelize) {
    super.init(schema, { sequelize })
    return this
  }
}

DishPack.associate = function (models) {
  this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' })
  this.belongsTo(models.Dish, { foreignKey: 'dish_id', as: 'dish' })
}

module.exports = DishPack
