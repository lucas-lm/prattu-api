const express = require('express')
const users = express.Router()
const allow = require('../middlewares/authorization')

const UserController = require('../controllers/UserController')

users.post('/', UserController.create)
users.get('/', UserController.index)
users.get('/:userId', UserController.show)
users.put('/', allow('authenticated'), UserController.update)
users.delete('/', allow('authenticated'), UserController.delete)

module.exports = users
