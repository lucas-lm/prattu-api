const express = require('express')
const router = express.Router()

// Routes
const users = require('./users')
const tokens = require('./tokens')
const kitchens = require('./kitchens')
const dishes = require('./dishes')
const orders = require('./orders')
const feedbacks = require('./feedbacks')

router.get('/', (req, res) => res.sendStatus(501))
router.use('/users', users)
router.use('/tokens', tokens)
router.use('/kitchens', kitchens)
router.use('/dishes', dishes)
router.use('/orders', orders)
router.use('/feedbacks', feedbacks)
// router.use('/reviews', reviews)

// router.post('/tests', upload.single('avatar'), tests)

module.exports = router
