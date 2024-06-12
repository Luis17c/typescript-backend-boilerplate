import { Authentication } from "@/application/middlewares";
import { makeToken } from "@/main/factories/infra/gateways";
import { makeUserRepository } from "@/main/factories/infra/repos";

export const makeAuthentication = (): Authentication => {
    return new Authentication(makeToken(), makeUserRepository())
}