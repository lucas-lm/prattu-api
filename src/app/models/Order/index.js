const { Model } = require('sequelize')
const schema = require('./schema')

class Order extends Model {
  static init(sequelize) {
    super.init(schema, { sequelize })
    return this
  }
}

Order.associate = function (models) {
  this.belongsTo(models.User, { foreignKey: 'user_id', as: 'customer' })
  this.belongsTo(models.Kitchen, { foreignKey: 'kitchen_id', as: 'kitchen' })
  this.hasMany(models.DishPack, { foreignKey: 'order_id', as: 'packs' })
}

module.exports = Order
