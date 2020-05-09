const express = require('express')
const orders = express.Router()
const allow = require('../middlewares/authorization')

const OrderController = require('../controllers/OrderController')

orders.get('/', allow(), OrderController.index)
orders.get('/:orderId', allow(), OrderController.show)
orders.post('/', allow(), OrderController.create)

module.exports = orders
