const { Model } = require('sequelize')
const schema = require('./schema')

class DishReview extends Model {
  static init(sequelize) {
    super.init(schema, { sequelize })
    return this
  }
}

DishReview.associate = function (models) {
  this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  this.belongsTo(models.Dish, { foreignKey: 'dish_id', as: 'dish' })
}

module.exports = DishReview
