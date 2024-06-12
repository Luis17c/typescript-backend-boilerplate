import { IToken } from "@/domain/gateways";
import { Token } from "@/infra/gateways/jwt";

export const makeToken = (): IToken => {
    return new Token()
}