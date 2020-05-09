const { DataTypes } = require('sequelize')

module.exports = {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}
