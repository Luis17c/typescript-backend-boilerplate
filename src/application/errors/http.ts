export class AuthenticationError extends Error {
    constructor () {
        super('Authentication failed')
        this.name = 'AuthenticationError'
    }
}

export class ForbiddenError extends Error {
    constructor () {
        super('Access Denied')
        this.name = 'ForbiddenError'
    }
}

export class NotFoundError extends Error {
    constructor (entityName: string) {
      super(`The entity '${entityName}' was not found`)
      this.name = 'NotFoundError'
    }
}

export class ServerError extends Error {
    constructor (error?: Error) {
      super('Server Failed. Try again soon')
      this.name = 'ServerError'
      this.stack = error?.stack
    }
}

export class UnauthorizedError extends Error {
    constructor () {
      super('Unauthorized')
      this.name = 'UnauthorizedError'
    }
}