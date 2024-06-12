import { BaseMiddleware } from '@/application/middlewares'
import { NextFunction, Request, RequestHandler, Response } from 'express'

type Adapter = (middleware: BaseMiddleware) => RequestHandler

export const adaptExpressMiddleware: Adapter = middleware => async (req: Request, res: Response, next: NextFunction) => {
  const { statusCode, data } = await middleware.handle({ ...req.headers })
  if (statusCode == 200) {
    const validEntries = Object.entries(data).filter(([, value]) => value)
    req.locals = { ...req.locals, ...Object.fromEntries(validEntries) }
    next()
  } else {
    res.status(statusCode).json({ error: data.message })
  }
}