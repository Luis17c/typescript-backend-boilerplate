import { HttpResponse } from '../helpers'

export interface BaseMiddleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}