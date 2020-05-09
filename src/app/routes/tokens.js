const express = require('express')
const tokens = express.Router()
const allow = require('../middlewares/authorization')

const TokenController = require('../controllers/TokenController')

tokens.post('/', TokenController.create)
tokens.put('/', allow(), TokenController.update)

module.exports = tokens
