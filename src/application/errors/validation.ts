export class RequiredFieldError extends Error {
    constructor (fieldName?: string) {
      super(`The field '${fieldName}' is required`)
      this.name = 'ServerError'
    }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported file. Allowed extensions: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (maxSizeInMb: number) {
    super(`File upload limit is ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}

export class MinStringError extends Error {
  constructor (fieldName?: string, minSize?: number) {
    super(`The field '${fieldName}' must have at least ${minSize} characters.`)
    this.name = 'MinStringError'
  }
}

export class MaxStringError extends Error {
  constructor (fieldName?: string, maxSize?: number) {
    super(`The field '${fieldName}' must have at most ${maxSize} characters.`)
    this.name = 'MaxStringError'
  }
}

export class TypeError extends Error {
  constructor (fieldName?: string, type?: string) {
    super(`The field '${fieldName}' must be ${type}.`)
    this.name = 'TypeError'
  }
}

export class EmailError extends Error {
  constructor (fieldName?: string) {
    super(`The field '${fieldName}' must be a valid email address.`)
    this.name = 'EmailError'
  }
}