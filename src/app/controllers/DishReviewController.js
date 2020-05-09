const { User, Dish } = require('../models')

module.exports = {
  async create(req, res) {
    const { sub: customerId } = req.auth
    const { comment, dishId } = req.body
    try {
      const user = await User.findByPk(customerId)
      await user.createDishReview({ comment, dish_id: dishId })
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      return res.sendStatus(400)
    }
  },

  async index(req, res) {
    const { dishId } = req.params
    try {
      const dish = await Dish.findByPk(dishId)
      const reviews = await dish.getReviews()
      return res.json(reviews)
    } catch (error) {
      return res.status(400).json({ error })
    }
  },
}
