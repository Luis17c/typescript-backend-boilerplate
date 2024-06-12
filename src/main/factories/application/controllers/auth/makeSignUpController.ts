import { SignUpController } from "@/application/controllers/user";
import { makeCrypto, makeToken } from "@/main/factories/infra/gateways";
import { makeUserRepository } from "@/main/factories/infra/repos";

export const makeSignUpController = (): SignUpController => {
    return new SignUpController(makeUserRepository(), makeCrypto(), makeToken())
}