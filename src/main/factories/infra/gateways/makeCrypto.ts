import { ICrypto } from "@/domain/gateways"
import { Crypto } from "@/infra/gateways/bcrypt"

export const makeCrypto = (): ICrypto => {
    return new Crypto()
}