const { resolve } = require('path')

const { DATABASE_URL = null } = process.env

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: resolve(__dirname, '..', 'database', 'db.sqlite'),
  },
  production: {
    dialect: 'postgres',
    url: DATABASE_URL,
  },
  test: {
    dialect: 'sqlite',
    storage: resolve(__dirname, '..', '__tests__', 'db.test.sqlite'),
  },
}
