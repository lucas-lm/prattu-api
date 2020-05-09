const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const truncate = require('../utils/truncate')
const app = require('../../app')

const request = supertest(app)
const { SECRET } = process.env

describe('Register and authentication', () => {
  beforeAll(truncate)
  const newUser = { email: 'meu@mail.com', password: '@1000conto' }

  describe('User register', () => {
    it('should register a new user with email and password', async () => {
      const response = await request.post('/users').send(newUser)
      const { status } = response
      expect(status).toBe(201)
    })

    it('should not register a new user with email already registered before', async () => {
      const response = await request.post('/users').send(newUser)
      const { status, body } = response
      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
    })
  })

  describe('Get token', () => {
    it('should be able to get an valid auth token with valid credentials', async () => {
      const response = await request.post('/tokens').send(newUser)
      const {
        status,
        body: { token, error },
      } = response
      const payload = jwt.verify(token, SECRET)
      expect(error).toBeFalsy()
      expect(status).toBe(200)
      expect(payload).toHaveProperty('sub')
      expect(payload).toHaveProperty('iat')
      expect(payload).toHaveProperty('exp')
    })

    it('should be able to get a refresh token', async () => {
      const {
        body: { token: oldToken },
      } = await request.post('/tokens').send(newUser)
      const response = await request
        .put('/tokens')
        .set({ Authorization: `Bearer ${oldToken}` })
      const {
        status,
        body: { token: newToken, error },
      } = response
      const payload = jwt.verify(newToken, SECRET)
      expect(error).toBeFalsy()
      expect(status).toBe(200)
      expect(payload).toHaveProperty('sub')
      expect(payload).toHaveProperty('iat')
      expect(payload).toHaveProperty('exp')
    })
  })
})
