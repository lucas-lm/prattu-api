const express = require('express')
const feedbacks = express.Router()

const FeedbackController = require('../controllers/FeedbackController')

feedbacks.post('/', FeedbackController.create)
feedbacks.get('/', FeedbackController.index)

module.exports = feedbacks
