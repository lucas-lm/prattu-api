const { User, Dish } = require('../models')

module.exports = {
  async create(req, res) {
    const { sub: customerId } = req.auth
    const { comment } = req.body
    const { dishId } = req.params
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
      const dish = await Dish.findByPk(dishId, {
        include: {
          association: 'reviews',
        },
      })
      return res.json(dish)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
  },
}
