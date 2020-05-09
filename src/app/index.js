const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const router = require('./routes')
const authentication = require('./middlewares/authentication')
require('../database')

const app = express()

app.use(express.static('tmp')) // files

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(authentication)
app.use(router)

module.exports = app
