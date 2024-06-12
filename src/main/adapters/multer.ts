import { ServerError } from '@/application/errors'
import { RequestHandler } from 'express'
import multer, { StorageEngine } from 'multer'
import path from 'path'
import crypto from 'crypto'
import { env } from '../config/env'

const storage = {
  disk: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', 'tmp'),
    filename (request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

export const adaptMulter: RequestHandler = (req, res, next) => {
  const upload = multer({ storage: (storage[env.storageDriver as 'disk'] as StorageEngine) }).single('photo')
  upload(req, res, error => {
    if (error !== undefined) {
      return res.status(500).json({ error: new ServerError(error).message })
    }
    
    if (req.file !== undefined) {
      req.locals = { ...req.locals, file: { buffer: req.file.buffer, mimeType: req.file.mimetype, fileName: req.file.filename, filePath: req.file.path } }
    }
    next()
  })
}