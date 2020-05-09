const express = require('express')
const dishes = express.Router()
const allow = require('../middlewares/authorization')
const upload = require('../middlewares/upload')

const DishController = require('../controllers/DishController')
const DishReviewController = require('../controllers/DishReviewController')

dishes.get('/', DishController.index)
dishes.get('/:dishId', DishController.show)
dishes.post(
  '/',
  allow('kitchen'),
  upload.single('photo'),
  DishController.create
)
dishes.put('/:dishId', allow('authenticated'), DishController.update)
dishes.delete('/:dishId', allow('authenticated'), DishController.delete)

// reviews
dishes.get('/:dishId/reviews', DishReviewController.index)
dishes.post('/:dishId/reviews', DishReviewController.create)

module.exports = dishes
