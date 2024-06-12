import { IUserRepository } from "@/domain/repos";
import { HttpResponse, forbidden, ok } from "../helpers";
import { BaseMiddleware } from "./BaseMiddleware";
import { IToken } from "@/domain/gateways";

interface httpRequest {
    authorization?: string
}

export class Authentication implements BaseMiddleware {
    constructor (
        private readonly token: IToken,
        private readonly userRepository: IUserRepository
    ) {}
    async handle (httpRequest: httpRequest): Promise<HttpResponse> {
        const token = httpRequest.authorization?.split(' ')?.[1]
        if (!token) {
            return forbidden()
        }
        const userId = this.token.validate(token)?.userId
        if(!userId) {
            return forbidden()
        }
        const user = await this.userRepository.getById(userId)
        return ok({ user })
    }
}