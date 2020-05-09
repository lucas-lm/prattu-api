const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    req.auth = false
    return next()
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, SECRET)
    const isExpired = payload.exp ? payload.exp < Date.now() / 1000 : false
    if (isExpired) throw new Error('token expired')
    req.auth = payload
    return next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
