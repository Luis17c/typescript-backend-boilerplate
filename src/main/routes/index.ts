import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  readdirSync(join(__dirname))
    .filter(file => !file.endsWith('.map') && !file.includes('index'))
    .map(async file => {
      (await import(`./${file}`)).default(router)
    })
  app.use('/api', router)
}