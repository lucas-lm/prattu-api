const { DataTypes } = require('sequelize')

module.exports = {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
