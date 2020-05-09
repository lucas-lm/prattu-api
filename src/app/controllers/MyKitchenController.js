const { Kitchen, Role, User } = require('../models')

const notImplemented = (req, res) => res.sendStatus(501)

module.exports = {
  async show(req, res) {
    const { sub: userId } = req.auth
    const user = await User.findByPk(userId)
    const kitchen = await user.getKitchen({
      include: { association: 'dishes' },
    })
    console.log(kitchen.toJSON())
    return res.json(kitchen)
  },

  update: notImplemented,
  delete: notImplemented,
}
