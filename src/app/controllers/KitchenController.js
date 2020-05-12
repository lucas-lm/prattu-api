const { Kitchen, Role, User } = require('../models')

const notImplemented = (req, res) => res.sendStatus(501)

module.exports = {
  async create(req, res) {
    const { sub: id, roles } = req.auth
    if (roles.includes('kitchen'))
      return res.status(403).json({ error: 'already has kitchen' })

    const { location: avatar } = req.file
    const { name, legal_id, location } = req.body
    try {
      const [role] = await Role.findOrCreate({ where: { name: 'kitchen' } })
      const user = await User.findByPk(id)
      console.log(name, legal_id, location, avatar)
      const point = { type: 'Point', coordinates: JSON.parse(location) }
      await user.createKitchen({ name, legal_id, avatar, location: point })
      await user.addRole(role)
      const newToken = await user.generateToken()
      return res.status(201).json({ token: newToken })
    } catch (error) {
      return res.status(400).json({ error })
    }
  },

  async index(req, res) {
    const kitchens = await Kitchen.findAll()
    return res.json(kitchens)
  },

  async show(req, res) {
    const { kitchenId } = req.params
    const kitchen = await Kitchen.findByPk(kitchenId)
    return res.json(kitchen)
  },

  async update(req, res) {
    const { kitchenId } = req.params
    await Kitchen.update(req.body, { where: { id: kitchenId } })
    return res.sendStatus(204)
  },

  async delete(req, res) {
    const { kitchenId } = req.params
    await Kitchen.destroy({ where: { id: kitchenId } })
    return res.sendStatus(204)
  },
}
