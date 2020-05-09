const { Dish, Kitchen, User } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async create(req, res) {
    const { sub: id } = req.auth
    let photo = null
    const { name, price, description = null } = req.body
    try {
      if (req.file) {
        const { filename } = req.file
        photo = `/uploads/${filename}`
      }
      const user = await User.findByPk(id)
      const kitchen = await user.getKitchen()
      await kitchen.createDish({ name, price, description, photo })
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
  },

  async index(req, res) {
    try {
      let dishes = null
      const { name } = req.query
      if (!name) {
        dishes = await Dish.findAll()
      } else {
        dishes = await Dish.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        })
      }
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

  async update(req, res) {
    const { sub: userId } = req.auth
    const { dishId } = req.params
    const { filename } = req.file
    const photo = `/uploads/${filename}`
    const { description, name, price } = req.body
    try {
      await Dish.update(
        { photo, description, name, price },
        { where: { id: dishId } }
      )
      return res.sendStatus(204)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  },

  async delete(req, res) {
    const { sub: userId } = req.auth
    const { dishId } = req.params
    try {
      const del = await Dish.destroy({ where: { id: dishId } })
      return res.status(204).json({ del })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  },
}
