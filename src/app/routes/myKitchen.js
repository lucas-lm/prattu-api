const express = require('express')
const myKitchen = express.Router()
const allow = require('../middlewares/authorization')

const MyKitchenController = require('../controllers/MyKitchenController')

myKitchen.get('/', allow('kitchen'), MyKitchenController.show)
myKitchen.put('/', allow('kitchen'), MyKitchenController.update)
myKitchen.delete('/', allow('kitchen'), MyKitchenController.delete)

module.exports = myKitchen
