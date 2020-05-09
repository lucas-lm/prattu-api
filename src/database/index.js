const Sequelize = require('sequelize')
const db = require('../config/database')
const models = require('../app/models')

class Database {
  constructor() {
    this.init()
    this.connection
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.')
      })
      .catch((error) => {
        console.error('Unable to connect to the database:', error)
      })
  }

  init() {
    const { NODE_ENV } = process.env
    const define = { timestamps: true, underscored: true }
    const { url, ...rest } = db[NODE_ENV]
    const dbConfig = url ? [url] : []
    dbConfig.push({ ...rest, define })
    console.log(dbConfig)
    this.connection = new Sequelize(...dbConfig)

    Object.keys(models)
      .map((key) => models[key])
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

module.exports = new Database()
