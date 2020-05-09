const { DataTypes } = require('sequelize')

module.exports = {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}
