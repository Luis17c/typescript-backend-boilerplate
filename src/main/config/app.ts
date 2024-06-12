import 'reflect-metadata'
import express, { json } from 'express'

import cors from 'cors'
import { setupRoutes } from '../routes'

const app = express()

app.use(cors())
app.use(json())

setupRoutes(app)

export { app }