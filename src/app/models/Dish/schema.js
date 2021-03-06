const { DataTypes } = require('sequelize')

module.exports = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
}
