const { Order, DishPack, Dish, Kitchen, User } = require('../models')

module.exports = {
  async create(req, res) {
    const { sub: customerId } = req.auth // order é feita para a kitchen com dishes por um customer
    const { packages, kitchenId } = req.body
    try {
      const kitchen = await Kitchen.findByPk(kitchenId)

      if (!kitchen) return res.status(404).json({ error: 'kitchen not found' })

      for (const pack of packages) {
        if (await kitchen.hasDish(pack.dish)) continue
        return res
          .status(400)
          .json({ error: 'dish does not belongs to kitchen' })
      }

      const user = await User.findByPk(customerId)
      const order = await user.createOrder({
        status: 'waiting',
        kitchen_id: kitchen.id,
      })

      for (const package of packages) {
        const dish = await Dish.findByPk(package.dish)
        const pack = await dish.createPack({
          quantity: package.quantity,
          order_id: order.id,
        })
      }
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
  },

  async index(req, res) {
    try {
      const orders = await Order.findAll()
      return res.json(orders)
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
}
