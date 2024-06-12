import { MinStringError, MaxStringError } from "../errors";
import { Validator } from "./validator";

export class MinString implements Validator {
    constructor (
      readonly value: string,
      readonly min: number,
      readonly fieldName?: string
    ) {}
  
    validate (): Error | undefined {
      if (this.value === null || this.value.length < this.min) {
        return new MinStringError(this.fieldName, this.min)
      }
    }
}

export class MaxString implements Validator {
    constructor (
      readonly value: string,
      readonly max: number,
      readonly fieldName?: string
    ) {}
  
    validate (): Error | undefined {
      if (this.value === null || this.value.length > this.max) {
        return new MaxStringError(this.fieldName, this.max)
      }
    }
}