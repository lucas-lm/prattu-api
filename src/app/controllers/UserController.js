const { User, Role } = require('../models')

const notImplemented = (req, res) => res.sendStatus(501)

module.exports = {
  async create(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.create({ email, password })
      const [role] = await Role.findOrCreate({ where: { name: 'user' } })
      await user.addRole(role)
      const token = await user.generateToken()
      return res.status(201).json({ token })
    } catch (error) {
      return res.status(400).json({ error })
    }
  },

  index: notImplemented,
  show: notImplemented,
  update: notImplemented,
  delete: notImplemented,
}
