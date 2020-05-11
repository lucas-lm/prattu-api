const express = require('express')
const kitchens = express.Router()
const allow = require('../middlewares/authorization')
const upload = require('../middlewares/upload')

const KitchenController = require('../controllers/KitchenController')

const isOwner = () => false

kitchens.get('/', KitchenController.index)
kitchens.get('/:kitchenId', KitchenController.show)
kitchens.post(
  '/',
  allow('authenticated'),
  upload.single('avatar'),
  KitchenController.create
)
kitchens.put('/', allow('authenticated'), isOwner, KitchenController.update)
kitchens.delete('/', allow('authenticated'), isOwner, KitchenController.delete)

module.exports = kitchens
