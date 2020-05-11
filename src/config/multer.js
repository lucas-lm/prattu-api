const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const { AWS_S3_BUCKET, NODE_ENV } = process.env

const getFileName = (req, file, cb) => {
  crypto.randomBytes(16, (error, hash) => {
    if (error) cb(error)
    file.key = `${Date.now()}-${hash.toString('hex')}-${file.originalname}`
    cb(null, file.key)
  })
}

const storageForEnv = {
  development: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    },
    filename: getFileName,
  }),
  production: multerS3({
    s3: new aws.S3(),
    bucket: AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: getFileName,
  }),
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageForEnv[NODE_ENV],
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('invalid file type'))
    }
  },
}
