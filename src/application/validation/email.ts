import { EmailError } from "../errors";
import { Validator } from "./validator";

export class Email implements Validator {
    constructor (
      readonly value: string,
      readonly fieldName?: string
    ) {}
  
    validate (): Error | undefined {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            return new EmailError(this.fieldName);
        }
    }
}