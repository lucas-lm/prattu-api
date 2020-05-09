const { Model } = require('sequelize')
const schema = require('./schema')

class Role extends Model {
  static init(sequelize) {
    super.init(schema, { sequelize })
    return this
  }
}

Role.associate = function (models) {
  this.belongsToMany(models.User, {
    foreignKey: 'role_id',
    through: 'user_roles',
    as: 'users',
  })
}

module.exports = Role
