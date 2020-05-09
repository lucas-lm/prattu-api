const { Model } = require('sequelize')
const schema = require('./schema')

class Feedback extends Model {
  static init(sequelize) {
    super.init(schema, { sequelize })
    return this
  }
}

Feedback.associate = function (models) {
  this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
}

module.exports = Feedback
