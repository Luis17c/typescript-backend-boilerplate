import { TypeError } from "../errors";
import { Validator } from "./validator";

// Definindo os tipos válidos de JavaScript como um union type
type JavaScriptTypes = "string" | "number" | "boolean" | "undefined" | "object" | "array";

export class Type implements Validator {
  constructor(
    readonly value: any,
    readonly type: JavaScriptTypes, // Usando o union type definido
    readonly fieldName?: string
  ) {}

  validate(): Error | undefined {
    if (this.type === "array") {
      if (!Array.isArray(this.value)) {
        return new TypeError(this.fieldName, this.type);
      }
    } else if (typeof this.value !== this.type) {
      // Considera "number" caso o valor seja uma string representando um número
      if (this.type === "number" && !isNaN(Number(this.value))) {
        return;
      }
      return new TypeError(this.fieldName, this.type);
    }
  }
}