import { ForbiddenError, ServerError, UnauthorizedError, NotFoundError } from '@/application/errors'
import { IUser } from '@/domain/models'

export type HttpRequest = {
    user: IUser
}

export type HttpResponse<T = any> = {
    statusCode: number
    data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
    statusCode: 200,
    data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
    statusCode: 400,
    data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
    statusCode: 401,
    data: new UnauthorizedError()
})

export const forbidden = (): HttpResponse<Error> => ({
    statusCode: 403,
    data: new ForbiddenError()
})

export const notFound = (entityName: string): HttpResponse<Error> => ({
    statusCode: 404,
    data: new NotFoundError(entityName)
})

export const serverError = (error: Error): HttpResponse<Error> => {
    console.log(error)
    return {
        statusCode: 500,
        data: new ServerError(error)
    }
}