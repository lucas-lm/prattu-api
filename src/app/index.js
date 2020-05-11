const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const router = require('./routes')
const authentication = require('./middlewares/authentication')
const path = require('path')
require('../database')

const app = express()

app.use(
  '/public',
  express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(authentication)
app.use(router)

module.exports = app
