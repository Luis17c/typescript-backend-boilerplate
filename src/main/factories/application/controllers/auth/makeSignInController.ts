import { SignInController } from "@/application/controllers/user/SignInController";
import { makeCrypto, makeToken } from "@/main/factories/infra/gateways";
import { makeUserRepository } from "@/main/factories/infra/repos";

export const makeSignInController = (): SignInController => {
    return new SignInController(makeUserRepository(), makeCrypto(), makeToken())
}