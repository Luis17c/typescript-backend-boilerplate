import { Validator, AllowedMimeTypes, Extension, MaxFileSize, Required, RequiredBuffer, RequiredString, Type, Email } from '@/application/validation'
import { MaxString, MinString } from './minString'


interface startBuilder extends typesBuilder {
  required: () => typesBuilder
}

interface typesBuilder {
  string: () => stringBuilder
  number: () => finalBuilder
  image: ({ allowed, maxSizeInMb }: { allowed: Extension[], maxSizeInMb: number }) => finalBuilder
}

interface stringBuilder extends finalBuilder {
  min: (min: number) => stringBuilder
  max: (max: number) => stringBuilder
  email: () => stringBuilder
}

interface finalBuilder {
  build: () => Validator[]
}

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName?: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: any, fieldName?: string }): startBuilder {
    return new ValidationBuilder(value, fieldName) as any as startBuilder
  }

  string (): stringBuilder {
    this.validators.push(new Type(this.value, 'string', this.fieldName))
    return this
  }

  min (min: number): stringBuilder {
    this.validators.push(new MinString(this.value, min, this.fieldName))
    return this
  }

  max (max: number): stringBuilder {
    this.validators.push(new MaxString(this.value, max, this.fieldName))
    return this
  }

  email (): stringBuilder {
    this.validators.push(new Email(this.value, this.fieldName))
    return this
  }

  number (): finalBuilder {
    this.validators.push(new Type(this.value, 'number', this.fieldName))
    return this
  }
 
  image ({ allowed, maxSizeInMb }: { allowed: Extension[], maxSizeInMb: number }): finalBuilder {
    if (this.value?.mimeType !== undefined) {
      this.validators.push(new AllowedMimeTypes(allowed, this.value.mimeType))
    }
    if (this.value?.buffer !== undefined) {
      this.validators.push(new MaxFileSize(maxSizeInMb, this.value.buffer))
    }
    return this
  }

  required (): finalBuilder {
    if (this.value instanceof Buffer) {
      this.validators.push(new RequiredBuffer(this.value, this.fieldName))
    } else if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.fieldName))
    } else {
      this.validators.push(new Required(this.value, this.fieldName))
    }
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}