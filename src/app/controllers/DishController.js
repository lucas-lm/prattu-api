const { Dish, Kitchen, User } = require('../models')

const notImplemented = (req, res) => res.sendStatus(501)

module.exports = {
  async create(req, res) {
    const { sub: id } = req.auth
    const { name, price, description = null } = req.body
    try {
      const user = await User.findByPk(id)
      const kitchen = await user.getKitchen()
      await kitchen.createDish({ name, price, description })
      return res.sendStatus(201)
    } catch (error) {
      return res.status(400).json({ error })
    }
  },

  async index(req, res) {
    try {
      const dishes = await Dish.findAll()
      return res.json(dishes)
    } catch (error) {
      return res.status(400).json({ error })
    }
  },

  async show(req, res) {
    try {
      const { dishId } = req.params
      const dish = await Dish.findByPk(dishId)
      return res.json(dish)
    } catch (error) {
      return res.status(400).json({ error })
    }
  },

  update: notImplemented,
  delete: notImplemented,
}
