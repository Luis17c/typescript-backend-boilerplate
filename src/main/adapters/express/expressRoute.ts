import { BaseController } from '@/application/controllers'
import { Request, RequestHandler, Response } from 'express'
import mime from 'mime'

type Adapter = (controller: BaseController) => RequestHandler
export const adaptExpressRoute: Adapter = controller => async (req: Request, res: Response) => {
  const { statusCode, data } = await controller.handle({ ...req.body, ...req.locals, ...req.params, ...req.query  })
  const json = statusCode == 200 ? data : { error: data.message }
  res.status(statusCode).json(json)
}

export const adaptExpressFile: Adapter = controller => async (req: Request, res: Response) => {
  const { statusCode, data } = await controller.handle({ ...req.body, ...req.locals, ...req.params, ...req.query  })
  const json = statusCode == 200 ? data : { error: data.message }
  return data?.fileStream.pipe(res)
}