const { DataTypes } = require('sequelize')

module.exports = {
  legal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.TEXT,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  location: DataTypes.ARRAY(DataTypes.STRING),
}
