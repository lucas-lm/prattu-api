const { Model } = require('sequelize')
const jwt = require('jsonwebtoken')
const schema = require('./schema')
const hooks = require('./hooks')

const { SECRET, JWT_LIFESPAN } = process.env

class User extends Model {
  static init(sequelize) {
    super.init(schema, { hooks, sequelize })
    return this
  }
}

User.associate = function (models) {
  this.belongsToMany(models.Role, {
    foreignKey: 'user_id',
    through: 'user_roles',
    as: 'roles',
    hooks: true,
  })
  this.hasOne(models.Kitchen, { foreignKey: 'user_id', as: 'kitchen' })
  this.hasMany(models.Feedback, { foreignKey: 'user_id', as: 'feedbacks' })
  this.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' })
  this.hasMany(models.DishReview, { foreignKey: 'user_id', as: 'dishReviews' })
}

User.prototype.generateToken = async function () {
  const rolesObject = await this.getRoles()
  const roles = rolesObject.map((role) => role.name)
  const { id } = this
  const token = jwt.sign({ sub: id, roles }, SECRET, {
    expiresIn: JWT_LIFESPAN,
  })
  return token
}

module.exports = User
