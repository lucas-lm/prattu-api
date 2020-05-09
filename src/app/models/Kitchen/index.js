const { Model } = require('sequelize')
const schema = require('./schema')

class Kitchen extends Model {
  static init(sequelize) {
    super.init(schema, { sequelize })
    return this
  }
}

Kitchen.associate = function (models) {
  this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
  this.hasMany(models.Dish, { foreignKey: 'kitchen_id', as: 'dish' })
  this.hasMany(models.Order, { foreignKey: 'kitchen_id', as: 'orders' })
}

module.exports = Kitchen
