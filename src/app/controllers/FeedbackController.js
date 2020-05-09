const { User, Feedback } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const { comment } = req.body
      const feedback = await Feedback.create({ comment })
      if (req.auth) {
        const { sub: id } = req.auth
        const user = await User.findByPk(id)
        await user.addFeedbacks(feedback)
      }
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      return res.sendStatus(400)
    }
  },

  async index(req, res) {
    try {
      const feedbacks = await Feedback.findAll()
      return res.json(feedbacks)
    } catch (error) {
      return res.status(400).json({ error })
    }
  },
}
