const { DataTypes } = require('sequelize')

module.exports = {
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  stars: {
    type: Sequelize.INTEGER,
  },
}
